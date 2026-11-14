// ====================================================================
// GST Billing Platform - Supabase Backend Connector & Cloud Sync Engine
// Project ID: bxcsrfuxrjepjtctefoq
// ====================================================================

const DEFAULT_SUPABASE_URL = 'https://bxcsrfuxrjepjtctefoq.supabase.co';

let supabaseClient = null;
let isCloudConnected = false;
let isSyncInProgress = false;

// 1. Initialize Supabase Client
function initSupabaseBackend() {
  const savedUrl = localStorage.getItem('gst_supabase_url') || DEFAULT_SUPABASE_URL;
  const savedKey = localStorage.getItem('gst_supabase_anon_key') || '';

  if (savedUrl && savedKey && window.supabase && window.supabase.createClient) {
    try {
      supabaseClient = window.supabase.createClient(savedUrl, savedKey);
      testSupabaseConnection(false);
      setupSupabaseRealtime();
    } catch (err) {
      console.warn('Supabase initialization warning:', err);
      updateBackendStatusUI(false, 'Initialization error');
    }
  } else {
    updateBackendStatusUI(false, savedKey ? 'Library loading...' : 'Key needed');
  }
}

// 2. Test Connection
async function testSupabaseConnection(showNotification = true) {
  if (!supabaseClient) {
    updateBackendStatusUI(false, 'Not connected');
    if (showNotification && typeof triggerToast === 'function') {
      triggerToast('Please provide your Supabase Anon API key first.');
    }
    return false;
  }

  try {
    updateBackendStatusUI(false, 'Testing connection...');
    const { data, error } = await supabaseClient.from('invoices').select('id').limit(1);

    if (error && error.code !== 'PGRST116') {
      // If error is about table not existing, schema needs to be run
      if (error.message && error.message.includes('relation') && error.message.includes('does not exist')) {
        updateBackendStatusUI(false, 'Schema missing');
        if (showNotification && typeof triggerToast === 'function') {
          triggerToast('Connected to Supabase, but tables are missing. Please run the SQL schema in Supabase SQL Editor.');
        }
        return false;
      }
      throw error;
    }

    isCloudConnected = true;
    updateBackendStatusUI(true, 'Connected');
    if (showNotification && typeof triggerToast === 'function') {
      triggerToast('Connected to Supabase Cloud Database successfully!');
    }
    return true;
  } catch (err) {
    isCloudConnected = false;
    updateBackendStatusUI(false, 'Connection failed');
    console.error('Supabase connection error:', err);
    if (showNotification && typeof triggerToast === 'function') {
      triggerToast('Failed to connect to Supabase: ' + (err.message || 'Check API key'));
    }
    return false;
  }
}

// 3. Save Supabase Credentials
async function saveBackendCredentials(url, anonKey) {
  const cleanUrl = (url || DEFAULT_SUPABASE_URL).trim();
  const cleanKey = (anonKey || '').trim();

  localStorage.setItem('gst_supabase_url', cleanUrl);
  localStorage.setItem('gst_supabase_anon_key', cleanKey);

  if (!cleanKey) {
    supabaseClient = null;
    isCloudConnected = false;
    updateBackendStatusUI(false, 'Disconnected');
    if (typeof triggerToast === 'function') triggerToast('Supabase credentials cleared.');
    return;
  }

  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(cleanUrl, cleanKey);
    const connected = await testSupabaseConnection(true);
    if (connected) {
      setupSupabaseRealtime();
    }
  }
}

// 4. Update UI Status Elements
function updateBackendStatusUI(connected, message) {
  const dot = document.getElementById('backend-status-dot');
  const text = document.getElementById('backend-status-text');
  const pill = document.getElementById('backend-header-pill');
  const banner = document.getElementById('backend-modal-status-banner');

  if (dot) {
    dot.className = `w-2 h-2 rounded-full ${connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`;
  }
  if (text) {
    text.textContent = connected ? 'Cloud Synced' : (message || 'Local Only');
  }
  if (pill) {
    pill.title = connected ? 'Connected to Supabase: bxcsrfuxrjepjtctefoq' : 'Backend: ' + message;
  }
  if (banner) {
    if (connected) {
      banner.className = 'p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs';
      banner.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span class="font-bold">Connected to Supabase Cloud</span>
          <span class="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-full font-mono">bxcsrfuxrjepjtctefoq</span>
        </div>
        <span class="text-[11px] font-semibold text-emerald-700">Realtime Active</span>
      `;
    } else {
      banner.className = 'p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs';
      banner.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          <span class="font-bold">Offline / Local Storage</span>
          <span class="text-[11px] text-amber-700 font-medium">(${message || 'Enter API Key to connect'})</span>
        </div>
        <span class="text-[11px] font-semibold text-amber-800">Local Cache Ready</span>
      `;
    }
  }
}

// 5. Push All Local Data to Supabase Cloud
async function syncLocalToSupabase() {
  if (!supabaseClient || !isCloudConnected) {
    const ok = await testSupabaseConnection(true);
    if (!ok) return;
  }

  if (isSyncInProgress) return;
  isSyncInProgress = true;
  if (typeof triggerToast === 'function') triggerToast('Syncing all local data to Supabase cloud...');

  try {
    const rawData = localStorage.getItem('gst_billing_data_v2');
    if (!rawData) {
      if (typeof triggerToast === 'function') triggerToast('No local data to sync.');
      isSyncInProgress = false;
      return;
    }

    const db = JSON.parse(rawData);

    // Sync Seller Profile
    if (db.seller) {
      await supabaseClient.from('seller_profile').upsert({
        id: 'default',
        data: db.seller,
        updated_at: new Date().toISOString()
      });
    }

    // Sync Customers
    if (Array.isArray(db.customers) && db.customers.length > 0) {
      const rows = db.customers.map(c => ({
        id: c.id,
        name: c.name,
        gstin: c.gstin,
        state: c.state,
        category: c.category,
        data: c,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('customers').upsert(rows);
    }

    // Sync Catalog Items
    if (Array.isArray(db.catalog) && db.catalog.length > 0) {
      const rows = db.catalog.map(i => ({
        id: i.id,
        name: i.name,
        hsn: i.hsn,
        default_rate: i.defaultRate,
        default_gst_rate: i.defaultGstRate,
        data: i,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('catalog_items').upsert(rows);
    }

    // Sync Invoices
    if (Array.isArray(db.invoices) && db.invoices.length > 0) {
      const rows = db.invoices.map(inv => ({
        id: inv.id,
        invoice_no: inv.invoiceNo,
        customer_id: inv.customerId,
        customer_name: inv.customerName,
        invoice_date: inv.invoiceDate,
        due_date: inv.dueDate,
        grand_total: inv.grandTotal,
        status: inv.status,
        data: inv,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('invoices').upsert(rows);
    }

    // Sync Quotations
    if (Array.isArray(db.quotations) && db.quotations.length > 0) {
      const rows = db.quotations.map(q => ({
        id: q.id,
        quote_no: q.quoteNo,
        customer_name: q.customerName,
        date: q.date,
        grand_total: q.grandTotal,
        status: q.status,
        data: q,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('quotations').upsert(rows);
    }

    // Sync Payment Receipts
    if (Array.isArray(db.paymentReceipts) && db.paymentReceipts.length > 0) {
      const rows = db.paymentReceipts.map(pr => ({
        id: pr.id,
        receipt_no: pr.receiptNo,
        customer_name: pr.customerName,
        date: pr.date,
        amount: pr.amount,
        payment_mode: pr.paymentMode,
        data: pr,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('payment_receipts').upsert(rows);
    }

    // Sync Refund Vouchers
    if (Array.isArray(db.refundVouchers) && db.refundVouchers.length > 0) {
      const rows = db.refundVouchers.map(rv => ({
        id: rv.id,
        voucher_no: rv.voucherNo,
        party_name: rv.partyName,
        date: rv.date,
        amount: rv.amount,
        paid_from: rv.paidFrom,
        data: rv,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('refund_vouchers').upsert(rows);
    }

    // Sync TDS Vouchers
    if (Array.isArray(db.tdsVouchers) && db.tdsVouchers.length > 0) {
      const rows = db.tdsVouchers.map(tv => ({
        id: tv.id,
        voucher_no: tv.voucherNo,
        party_name: tv.partyName,
        date: tv.date,
        amount: tv.amount,
        status: tv.status,
        data: tv,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('tds_vouchers').upsert(rows);
    }

    // Sync Proforma Invoices
    if (Array.isArray(db.proformaInvoices) && db.proformaInvoices.length > 0) {
      const rows = db.proformaInvoices.map(pi => ({
        id: pi.id,
        proforma_no: pi.proformaNo,
        buyer_name: pi.buyerName,
        date: pi.date,
        grand_total: pi.grandTotal,
        status: pi.status,
        data: pi,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('proforma_invoices').upsert(rows);
    }

    // Sync Delivery Challans
    if (Array.isArray(db.deliveryChallans) && db.deliveryChallans.length > 0) {
      const rows = db.deliveryChallans.map(dc => ({
        id: dc.id,
        challan_no: dc.challanNo,
        buyer_name: dc.buyerName,
        date: dc.date,
        grand_total: dc.grandTotal,
        status: dc.status,
        data: dc,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('delivery_challans').upsert(rows);
    }

    // Sync e-Waybills
    if (Array.isArray(db.ewaybills) && db.ewaybills.length > 0) {
      const rows = db.ewaybills.map(ew => ({
        id: ew.id,
        ewaybill_no: ew.ewaybillNo,
        doc_type: ew.docType,
        doc_no: ew.docNo,
        buyer_name: ew.buyerName,
        amount: ew.amount,
        valid_until: ew.validUntil,
        status: ew.status,
        data: ew,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('ewaybills').upsert(rows);
    }

    // Sync Bank Accounts
    if (Array.isArray(db.bankAccounts) && db.bankAccounts.length > 0) {
      const rows = db.bankAccounts.map(ba => ({
        id: ba.id,
        account_type: ba.accountType,
        account_name: ba.accountName,
        account_number: ba.accountNumber,
        ifsc: ba.ifsc,
        balance: ba.balance,
        is_default: !!ba.isDefault,
        data: ba,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('bank_accounts').upsert(rows);
    }

    if (typeof triggerToast === 'function') {
      triggerToast('All data successfully uploaded & synchronized with Supabase cloud!');
    }
  } catch (err) {
    console.error('Error during local to Supabase sync:', err);
    if (typeof triggerToast === 'function') {
      triggerToast('Sync error: ' + (err.message || 'Please check schema'));
    }
  } finally {
    isSyncInProgress = false;
  }
}

// 6. Pull All Cloud Data from Supabase into Local Store
async function pullAllFromSupabase() {
  if (!supabaseClient || !isCloudConnected) {
    const ok = await testSupabaseConnection(true);
    if (!ok) return;
  }

  if (typeof triggerToast === 'function') triggerToast('Fetching live data from Supabase cloud...');

  try {
    const [
      invRes, custRes, catRes, bankRes, dcRes, piRes, prRes, rvRes, tvRes, ewRes
    ] = await Promise.all([
      supabaseClient.from('invoices').select('data'),
      supabaseClient.from('customers').select('data'),
      supabaseClient.from('catalog_items').select('data'),
      supabaseClient.from('bank_accounts').select('data'),
      supabaseClient.from('delivery_challans').select('data'),
      supabaseClient.from('proforma_invoices').select('data'),
      supabaseClient.from('payment_receipts').select('data'),
      supabaseClient.from('refund_vouchers').select('data'),
      supabaseClient.from('tds_vouchers').select('data'),
      supabaseClient.from('ewaybills').select('data')
    ]);

    const rawData = localStorage.getItem('gst_billing_data_v2');
    const db = rawData ? JSON.parse(rawData) : {};

    if (invRes.data && invRes.data.length > 0) db.invoices = invRes.data.map(r => r.data);
    if (custRes.data && custRes.data.length > 0) db.customers = custRes.data.map(r => r.data);
    if (catRes.data && catRes.data.length > 0) db.catalog = catRes.data.map(r => r.data);
    if (bankRes.data && bankRes.data.length > 0) db.bankAccounts = bankRes.data.map(r => r.data);
    if (dcRes.data && dcRes.data.length > 0) db.deliveryChallans = dcRes.data.map(r => r.data);
    if (piRes.data && piRes.data.length > 0) db.proformaInvoices = piRes.data.map(r => r.data);
    if (prRes.data && prRes.data.length > 0) db.paymentReceipts = prRes.data.map(r => r.data);
    if (rvRes.data && rvRes.data.length > 0) db.refundVouchers = rvRes.data.map(r => r.data);
    if (tvRes.data && tvRes.data.length > 0) db.tdsVouchers = tvRes.data.map(r => r.data);
    if (ewRes.data && ewRes.data.length > 0) db.ewaybills = ewRes.data.map(r => r.data);

    localStorage.setItem('gst_billing_data_v2', JSON.stringify(db));
    if (typeof loadFromStorage === 'function') loadFromStorage();

    // Re-render current view if on dashboard or invoice list
    if (typeof renderCurrentView === 'function') renderCurrentView();
    if (typeof triggerToast === 'function') triggerToast('Local data updated with live Supabase database!');
  } catch (err) {
    console.error('Error pulling from Supabase:', err);
    if (typeof triggerToast === 'function') triggerToast('Pull error: ' + (err.message || 'Network error'));
  }
}

// 7. Realtime Subscription Setup
function setupSupabaseRealtime() {
  if (!supabaseClient) return;

  try {
    const channel = supabaseClient
      .channel('gst-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, payload => {
        console.log('Realtime DB Change detected:', payload);
        // Refresh local cache and UI smoothly
        pullAllFromSupabase();
      })
      .subscribe();
  } catch (err) {
    console.warn('Realtime subscription error:', err);
  }
}

// 8. Modal Management UI
function openBackendModal() {
  const modal = document.getElementById('backend-modal');
  if (!modal) return;

  const urlInput = document.getElementById('backend-url-input');
  const keyInput = document.getElementById('backend-key-input');

  if (urlInput) urlInput.value = localStorage.getItem('gst_supabase_url') || DEFAULT_SUPABASE_URL;
  if (keyInput) keyInput.value = localStorage.getItem('gst_supabase_anon_key') || '';

  updateBackendStatusUI(isCloudConnected, isCloudConnected ? 'Connected' : 'Configure key');
  modal.classList.remove('hidden');
}

function closeBackendModal() {
  const modal = document.getElementById('backend-modal');
  if (modal) modal.classList.add('hidden');
}

async function handleBackendSave() {
  const urlInput = document.getElementById('backend-url-input');
  const keyInput = document.getElementById('backend-key-input');

  const url = urlInput ? urlInput.value : '';
  const key = keyInput ? keyInput.value : '';

  await saveBackendCredentials(url, key);
}

function toggleKeyVisibility() {
  const input = document.getElementById('backend-key-input');
  const icon = document.getElementById('backend-key-toggle-icon');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    if (icon) icon.textContent = 'visibility';
  }
}

async function copySupabaseSchema() {
  try {
    const res = await fetch('supabase_schema.sql');
    const sql = await res.text();
    await navigator.clipboard.writeText(sql);
    if (typeof triggerToast === 'function') triggerToast('PostgreSQL SQL Schema copied to clipboard! Paste into Supabase SQL Editor.');
  } catch (err) {
    console.error('Copy schema error:', err);
    const a = document.createElement('a');
    a.href = 'supabase_schema.sql';
    a.download = 'supabase_schema.sql';
    a.click();
    if (typeof triggerToast === 'function') triggerToast('Downloaded supabase_schema.sql file.');
  }
}

// Attach to window
window.initSupabaseBackend = initSupabaseBackend;
window.testSupabaseConnection = testSupabaseConnection;
window.saveBackendCredentials = saveBackendCredentials;
window.syncLocalToSupabase = syncLocalToSupabase;
window.pullAllFromSupabase = pullAllFromSupabase;
window.openBackendModal = openBackendModal;
window.closeBackendModal = closeBackendModal;
window.handleBackendSave = handleBackendSave;
window.toggleKeyVisibility = toggleKeyVisibility;
window.copySupabaseSchema = copySupabaseSchema;
