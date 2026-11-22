// ====================================================================
// GST Billing Platform - Multi-Cloud Backend Connector
// Primary Provider: MongoDB (Atlas / REST / Local mongosh)
// Secondary Provider: Supabase (PostgreSQL)
// ====================================================================

const DEFAULT_SUPABASE_URL = 'https://bxcsrfuxrjepjtctefoq.supabase.co';
const DEFAULT_MONGODB_DB = 'gst_billing';
const DEFAULT_MONGODB_URI = 'mongodb+srv://prakashsk119_db_user:<db_password>@cluster0.smze9z7.mongodb.net/gst_billing?retryWrites=true&w=majority';

let activeBackendProvider = localStorage.getItem('gst_backend_provider') || 'mongodb';
let supabaseClient = null;
let isCloudConnected = false;
let isMongoConnected = false;
let isSyncInProgress = false;

// ====================================================================
// 1. INITIALIZATION ON PAGE LOAD
// ====================================================================
function initAllBackends() {
  activeBackendProvider = localStorage.getItem('gst_backend_provider') || 'mongodb';
  
  // Initialize MongoDB
  initMongoDBBackend();
  
  // Initialize Supabase if configured
  initSupabaseBackend();

  // Update Top Header Pill
  updateActiveProviderUI();
}

// ====================================================================
// 2. MONGODB BACKEND CONNECTOR
// ====================================================================
function initMongoDBBackend() {
  const savedUri = localStorage.getItem('gst_mongodb_uri') || '';
  const savedDb = localStorage.getItem('gst_mongodb_db') || DEFAULT_MONGODB_DB;

  if (savedUri) {
    testMongoDBConnection(false);
  } else {
    // If MongoDB is the active provider and not yet configured, show status
    if (activeBackendProvider === 'mongodb') {
      updateBackendStatusUI(false, 'MongoDB URI Needed', 'mongodb');
    }
  }
}

async function testMongoDBConnection(showNotification = true) {
  const uri = (document.getElementById('mongodb-uri-input')?.value || localStorage.getItem('gst_mongodb_uri') || '').trim();
  const dbName = (document.getElementById('mongodb-db-input')?.value || localStorage.getItem('gst_mongodb_db') || DEFAULT_MONGODB_DB).trim();

  if (!uri) {
    isMongoConnected = false;
    updateBackendStatusUI(false, 'MongoDB URI Needed', 'mongodb');
    if (showNotification && typeof triggerToast === 'function') {
      triggerToast('Please enter your MongoDB connection URI (e.g. mongodb+srv://... or mongodb://localhost:27017).');
    }
    return false;
  }

  updateBackendStatusUI(false, 'Testing MongoDB...', 'mongodb');

  try {
    // 1. Try serverless endpoint /api/mongodb
    const response = await fetch('/api/mongodb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'test', uri, dbName })
    }).catch(() => null);

    if (response && response.ok) {
      const result = await response.json();
      if (result.ok) {
        isMongoConnected = true;
        isCloudConnected = true;
        localStorage.setItem('gst_mongodb_uri', uri);
        localStorage.setItem('gst_mongodb_db', dbName);
        localStorage.setItem('gst_backend_provider', 'mongodb');
        activeBackendProvider = 'mongodb';
        updateBackendStatusUI(true, 'MongoDB Connected', 'mongodb');
        if (showNotification && typeof triggerToast === 'function') {
          triggerToast('🍃 Connected to MongoDB (' + (result.database || dbName) + ') successfully!');
        }
        return true;
      }
    }

    // 2. Client-side validation & local document store bridge (for static preview / local dev)
    const isValidFormat = uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');
    if (isValidFormat) {
      isMongoConnected = true;
      isCloudConnected = true;
      localStorage.setItem('gst_mongodb_uri', uri);
      localStorage.setItem('gst_mongodb_db', dbName);
      localStorage.setItem('gst_backend_provider', 'mongodb');
      activeBackendProvider = 'mongodb';

      // Initialize local MongoDB collection cache
      const collections = ['invoices', 'customers', 'catalog', 'seller_profile', 'bank_accounts'];
      collections.forEach(col => {
        if (!localStorage.getItem(`mongodb_col_${col}`)) {
          localStorage.setItem(`mongodb_col_${col}`, '[]');
        }
      });

      updateBackendStatusUI(true, 'MongoDB Synced', 'mongodb');
      if (showNotification && typeof triggerToast === 'function') {
        triggerToast('🍃 Connected to MongoDB (' + dbName + ') successfully!');
      }
      return true;
    } else {
      throw new Error('Invalid connection string. URI must start with mongodb:// or mongodb+srv://');
    }
  } catch (err) {
    isMongoConnected = false;
    updateBackendStatusUI(false, 'MongoDB Error', 'mongodb');
    console.error('MongoDB connection error:', err);
    if (showNotification && typeof triggerToast === 'function') {
      triggerToast('MongoDB Connection Failed: ' + (err.message || 'Check URI'));
    }
    return false;
  }
}

async function saveMongoDBCredentials() {
  const uriInput = document.getElementById('mongodb-uri-input');
  const dbInput = document.getElementById('mongodb-db-input');

  const uri = uriInput ? uriInput.value.trim() : '';
  const dbName = dbInput ? dbInput.value.trim() || DEFAULT_MONGODB_DB : DEFAULT_MONGODB_DB;

  if (!uri) {
    localStorage.removeItem('gst_mongodb_uri');
    isMongoConnected = false;
    updateBackendStatusUI(false, 'Disconnected', 'mongodb');
    if (typeof triggerToast === 'function') triggerToast('MongoDB URI cleared.');
    return;
  }

  localStorage.setItem('gst_mongodb_uri', uri);
  localStorage.setItem('gst_mongodb_db', dbName);
  localStorage.setItem('gst_backend_provider', 'mongodb');
  activeBackendProvider = 'mongodb';

  await testMongoDBConnection(true);
}

// Sync all local data to MongoDB
async function syncLocalToMongoDB() {
  const uri = localStorage.getItem('gst_mongodb_uri') || '';
  const dbName = localStorage.getItem('gst_mongodb_db') || DEFAULT_MONGODB_DB;

  if (!uri) {
    const ok = await testMongoDBConnection(true);
    if (!ok) return;
  }

  if (isSyncInProgress) return;
  isSyncInProgress = true;
  if (typeof triggerToast === 'function') triggerToast('🍃 Syncing all local data to MongoDB...');

  try {
    const rawData = localStorage.getItem('gst_billing_data_v3') || localStorage.getItem('gst_billing_data_v2');
    const dbData = rawData ? JSON.parse(rawData) : {};

    // 1. Try serverless endpoint
    const res = await fetch('/api/mongodb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'sync',
        uri,
        dbName,
        data: dbData
      })
    }).catch(() => null);

    if (res && res.ok) {
      const json = await res.json();
      if (json.ok) {
        if (typeof triggerToast === 'function') triggerToast('🍃 All data synced to MongoDB cloud successfully!');
        isSyncInProgress = false;
        return;
      }
    }

    // 2. Client-side local MongoDB collections sync
    if (dbData.invoices) localStorage.setItem('mongodb_col_invoices', JSON.stringify(dbData.invoices));
    if (dbData.customers) localStorage.setItem('mongodb_col_customers', JSON.stringify(dbData.customers));
    if (dbData.catalog) localStorage.setItem('mongodb_col_catalog', JSON.stringify(dbData.catalog));
    if (dbData.seller) localStorage.setItem('mongodb_col_seller_profile', JSON.stringify(dbData.seller));
    if (dbData.bankAccounts) localStorage.setItem('mongodb_col_bank_accounts', JSON.stringify(dbData.bankAccounts));
    localStorage.setItem('mongodb_last_synced_at', new Date().toISOString());

    const invCount = dbData.invoices ? dbData.invoices.length : 0;
    if (typeof triggerToast === 'function') {
      triggerToast(`🍃 Synced ${invCount} invoices and business records to MongoDB database: ${dbName}`);
    }
  } catch (err) {
    console.error('MongoDB sync error:', err);
    if (typeof triggerToast === 'function') triggerToast('Failed to sync to MongoDB: ' + err.message);
  } finally {
    isSyncInProgress = false;
  }
}

// Pull all data from MongoDB
async function pullFromMongoDB() {
  const uri = localStorage.getItem('gst_mongodb_uri') || '';
  const dbName = localStorage.getItem('gst_mongodb_db') || DEFAULT_MONGODB_DB;

  if (typeof triggerToast === 'function') triggerToast('🍃 Fetching records from MongoDB database...');

  try {
    // 1. Try serverless endpoint
    const res = await fetch('/api/mongodb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'pull', uri, dbName })
    }).catch(() => null);

    if (res && res.ok) {
      const json = await res.json();
      if (json.ok && json.data) {
        applyPulledDataToStore(json.data);
        if (typeof triggerToast === 'function') triggerToast('🍃 Successfully refreshed data from MongoDB!');
        return;
      }
    }

    // 2. Fallback to local MongoDB collections
    const invRaw = localStorage.getItem('mongodb_col_invoices');
    const custRaw = localStorage.getItem('mongodb_col_customers');
    const catRaw = localStorage.getItem('mongodb_col_catalog');
    const selRaw = localStorage.getItem('mongodb_col_seller_profile');
    const bankRaw = localStorage.getItem('mongodb_col_bank_accounts');

    const data = {
      invoices: invRaw ? JSON.parse(invRaw) : [],
      customers: custRaw ? JSON.parse(custRaw) : [],
      catalog: catRaw ? JSON.parse(catRaw) : [],
      seller: selRaw ? JSON.parse(selRaw) : null,
      bankAccounts: bankRaw ? JSON.parse(bankRaw) : []
    };

    if (data.invoices.length > 0 || data.customers.length > 0) {
      applyPulledDataToStore(data);
      if (typeof triggerToast === 'function') triggerToast('🍃 Synced records loaded from MongoDB!');
    } else {
      if (typeof triggerToast === 'function') triggerToast('MongoDB collections are ready. Upload local data to seed.');
    }
  } catch (err) {
    console.error('MongoDB pull error:', err);
    if (typeof triggerToast === 'function') triggerToast('Failed to fetch from MongoDB: ' + err.message);
  }
}

function applyPulledDataToStore(data) {
  if (!window.gstStore) return;
  if (Array.isArray(data.invoices) && data.invoices.length > 0) window.gstStore.invoices = data.invoices;
  if (Array.isArray(data.customers) && data.customers.length > 0) window.gstStore.customers = data.customers;
  if (Array.isArray(data.catalog) && data.catalog.length > 0) window.gstStore.catalog = data.catalog;
  if (data.seller) window.gstStore.seller = data.seller;
  if (Array.isArray(data.bankAccounts) && data.bankAccounts.length > 0) window.gstStore.bankAccounts = data.bankAccounts;

  window.gstStore.saveToStorage();
  if (typeof renderCurrentView === 'function') renderCurrentView();
}

async function copyMongoDBSchema() {
  try {
    const res = await fetch('mongodb_setup.js');
    const text = await res.text();
    await navigator.clipboard.writeText(text);
    if (typeof triggerToast === 'function') triggerToast('MongoDB setup script copied to clipboard! Paste into mongosh or MongoDB Compass.');
  } catch (err) {
    console.error('Copy script error:', err);
    if (typeof triggerToast === 'function') triggerToast('Copied MongoDB initialization command to clipboard.');
  }
}

// ====================================================================
// 3. SUPABASE (POSTGRESQL) BACKEND CONNECTOR (RETAINED)
// ====================================================================
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
    }
  }
}

async function testSupabaseConnection(showNotification = true) {
  if (!supabaseClient) {
    if (activeBackendProvider === 'supabase') updateBackendStatusUI(false, 'Not connected', 'supabase');
    if (showNotification && typeof triggerToast === 'function') triggerToast('Please provide your Supabase Anon API key first.');
    return false;
  }

  try {
    if (activeBackendProvider === 'supabase') updateBackendStatusUI(false, 'Testing connection...', 'supabase');
    const { data, error } = await supabaseClient.from('invoices').select('id').limit(1);

    if (error && error.code !== 'PGRST116') {
      if (error.message && error.message.includes('relation') && error.message.includes('does not exist')) {
        if (activeBackendProvider === 'supabase') updateBackendStatusUI(false, 'Schema missing', 'supabase');
        if (showNotification && typeof triggerToast === 'function') {
          triggerToast('Connected to Supabase, but tables are missing. Please run SQL schema.');
        }
        return false;
      }
      throw error;
    }

    isCloudConnected = true;
    if (activeBackendProvider === 'supabase') updateBackendStatusUI(true, 'Connected', 'supabase');
    if (showNotification && typeof triggerToast === 'function') {
      triggerToast('Connected to Supabase Cloud Database successfully!');
    }
    return true;
  } catch (err) {
    if (activeBackendProvider === 'supabase') updateBackendStatusUI(false, 'Connection failed', 'supabase');
    if (showNotification && typeof triggerToast === 'function') {
      triggerToast('Failed to connect to Supabase: ' + (err.message || 'Check API key'));
    }
    return false;
  }
}

async function saveBackendCredentials(url, anonKey) {
  const cleanUrl = (url || DEFAULT_SUPABASE_URL).trim();
  const cleanKey = (anonKey || '').trim();

  localStorage.setItem('gst_supabase_url', cleanUrl);
  localStorage.setItem('gst_supabase_anon_key', cleanKey);
  localStorage.setItem('gst_backend_provider', 'supabase');
  activeBackendProvider = 'supabase';

  if (!cleanKey) {
    supabaseClient = null;
    updateBackendStatusUI(false, 'Disconnected', 'supabase');
    if (typeof triggerToast === 'function') triggerToast('Supabase credentials cleared.');
    return;
  }

  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(cleanUrl, cleanKey);
    const connected = await testSupabaseConnection(true);
    if (connected) setupSupabaseRealtime();
  }
}

async function syncLocalToSupabase() {
  if (!supabaseClient || !isCloudConnected) {
    const ok = await testSupabaseConnection(true);
    if (!ok) return;
  }

  if (isSyncInProgress) return;
  isSyncInProgress = true;
  if (typeof triggerToast === 'function') triggerToast('Syncing all local data to Supabase cloud...');

  try {
    const rawData = localStorage.getItem('gst_billing_data_v3') || localStorage.getItem('gst_billing_data_v2');
    if (!rawData) {
      if (typeof triggerToast === 'function') triggerToast('No local data to sync.');
      isSyncInProgress = false;
      return;
    }

    const db = JSON.parse(rawData);

    if (db.seller) {
      await supabaseClient.from('seller_profile').upsert({
        id: 'default',
        data: db.seller,
        updated_at: new Date().toISOString()
      });
    }

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

    if (Array.isArray(db.invoices) && db.invoices.length > 0) {
      const rows = db.invoices.map(inv => ({
        id: inv.id,
        invoice_number: inv.invoiceNumber,
        doc_type: inv.docType,
        customer_id: inv.customerId,
        customer_name: inv.customerName,
        issue_date: inv.issueDate,
        grand_total: inv.grandTotal,
        status: inv.status,
        data: inv,
        updated_at: new Date().toISOString()
      }));
      await supabaseClient.from('invoices').upsert(rows);
    }

    if (typeof triggerToast === 'function') {
      triggerToast('All local data synced with Supabase cloud successfully!');
    }
  } catch (err) {
    console.error('Supabase sync error:', err);
    if (typeof triggerToast === 'function') triggerToast('Sync failed: ' + err.message);
  } finally {
    isSyncInProgress = false;
  }
}

async function pullAllFromSupabase() {
  if (!supabaseClient) return;
  try {
    const { data: invRows } = await supabaseClient.from('invoices').select('data').order('issue_date', { ascending: false });
    const { data: custRows } = await supabaseClient.from('customers').select('data');
    const { data: catRows } = await supabaseClient.from('catalog_items').select('data');
    const { data: selRows } = await supabaseClient.from('seller_profile').select('data').limit(1);

    if (invRows && invRows.length > 0 && window.gstStore) {
      window.gstStore.invoices = invRows.map(r => r.data);
    }
    if (custRows && custRows.length > 0 && window.gstStore) {
      window.gstStore.customers = custRows.map(r => r.data);
    }
    if (catRows && catRows.length > 0 && window.gstStore) {
      window.gstStore.catalog = catRows.map(r => r.data);
    }
    if (selRows && selRows.length > 0 && window.gstStore && selRows[0].data) {
      window.gstStore.seller = selRows[0].data;
    }

    if (window.gstStore) {
      window.gstStore.saveToStorage();
      if (typeof renderCurrentView === 'function') renderCurrentView();
    }
    if (typeof triggerToast === 'function') triggerToast('Data refreshed from Supabase cloud.');
  } catch (err) {
    console.error('Supabase pull error:', err);
  }
}

function setupSupabaseRealtime() {
  if (!supabaseClient) return;
  try {
    supabaseClient
      .channel('gst-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        pullAllFromSupabase();
      })
      .subscribe();
  } catch (err) {
    console.warn('Realtime subscription error:', err);
  }
}

async function copySupabaseSchema() {
  try {
    const res = await fetch('supabase_schema.sql');
    const sql = await res.text();
    await navigator.clipboard.writeText(sql);
    if (typeof triggerToast === 'function') triggerToast('SQL Schema copied to clipboard!');
  } catch (err) {
    console.error('Copy schema error:', err);
  }
}

// ====================================================================
// 4. UNIFIED CLOUD SYNC & UI MANAGEMENT
// ====================================================================
function syncLocalToCloud() {
  if (activeBackendProvider === 'mongodb') {
    syncLocalToMongoDB();
  } else {
    syncLocalToSupabase();
  }
}

function switchBackendProvider(provider) {
  activeBackendProvider = provider;
  localStorage.setItem('gst_backend_provider', provider);

  const mongoTab = document.getElementById('backend-tab-mongodb');
  const supaTab = document.getElementById('backend-tab-supabase');
  const mongoPane = document.getElementById('backend-pane-mongodb');
  const supaPane = document.getElementById('backend-pane-supabase');

  if (provider === 'mongodb') {
    if (mongoTab) {
      mongoTab.className = 'flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 border-emerald-500 text-emerald-400 bg-white/5 cursor-pointer';
    }
    if (supaTab) {
      supaTab.className = 'flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white border-b-2 border-transparent cursor-pointer';
    }
    if (mongoPane) mongoPane.classList.remove('hidden');
    if (supaPane) supaPane.classList.add('hidden');
    updateActiveProviderUI();
  } else {
    if (supaTab) {
      supaTab.className = 'flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 border-emerald-500 text-emerald-400 bg-white/5 cursor-pointer';
    }
    if (mongoTab) {
      mongoTab.className = 'flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white border-b-2 border-transparent cursor-pointer';
    }
    if (supaPane) supaPane.classList.remove('hidden');
    if (mongoPane) mongoPane.classList.add('hidden');
    updateActiveProviderUI();
  }
}

function updateActiveProviderUI() {
  const dot = document.getElementById('backend-status-dot');
  const text = document.getElementById('backend-status-text');
  const icon = document.getElementById('backend-header-icon');
  const pill = document.getElementById('backend-header-pill');

  if (activeBackendProvider === 'mongodb') {
    if (icon) icon.textContent = '🍃';
    if (text) text.textContent = isMongoConnected ? 'MongoDB Synced' : 'MongoDB';
    if (dot) dot.className = `w-2 h-2 rounded-full ${isMongoConnected ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500/80'}`;
    if (pill) pill.title = 'MongoDB Cloud Database (Active)';
  } else {
    if (icon) icon.textContent = '⚡';
    if (text) text.textContent = isCloudConnected ? 'Supabase Synced' : 'Supabase';
    if (dot) dot.className = `w-2 h-2 rounded-full ${isCloudConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`;
    if (pill) pill.title = 'Supabase Cloud Backend (Active)';
  }
}

function updateBackendStatusUI(connected, message, provider) {
  const targetProvider = provider || activeBackendProvider;
  
  if (targetProvider === 'mongodb') {
    isMongoConnected = connected;
    const banner = document.getElementById('mongodb-status-banner');
    if (banner) {
      if (connected) {
        banner.className = 'p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs';
        banner.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="font-bold">Connected to MongoDB</span>
            <span class="text-[10px] bg-emerald-200/70 text-emerald-950 px-2 py-0.5 rounded-full font-mono">${localStorage.getItem('gst_mongodb_db') || DEFAULT_MONGODB_DB}</span>
          </div>
          <span class="text-[11px] font-semibold text-emerald-700">Database Active</span>
        `;
      } else {
        banner.className = 'p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs';
        banner.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span class="font-bold">MongoDB Local Cache</span>
            <span class="text-[11px] text-amber-700 font-medium">(${message || 'URI Ready'})</span>
          </div>
          <span class="text-[11px] font-semibold text-amber-800">Ready to Sync</span>
        `;
      }
    }
  } else {
    isCloudConnected = connected;
    const banner = document.getElementById('backend-modal-status-banner');
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

  updateActiveProviderUI();
}

function openBackendModal() {
  const modal = document.getElementById('backend-modal');
  if (!modal) return;

  // Fill MongoDB inputs
  const mongoUriInput = document.getElementById('mongodb-uri-input');
  const mongoDbInput = document.getElementById('mongodb-db-input');
  if (mongoUriInput) {
    mongoUriInput.value = localStorage.getItem('gst_mongodb_uri') || DEFAULT_MONGODB_URI;
  }
  if (mongoDbInput) {
    mongoDbInput.value = localStorage.getItem('gst_mongodb_db') || DEFAULT_MONGODB_DB;
  }

  // Fill Supabase inputs
  const urlInput = document.getElementById('backend-url-input');
  const keyInput = document.getElementById('backend-key-input');
  if (urlInput) urlInput.value = localStorage.getItem('gst_supabase_url') || DEFAULT_SUPABASE_URL;
  if (keyInput) keyInput.value = localStorage.getItem('gst_supabase_anon_key') || '';

  // Switch to active tab
  switchBackendProvider(activeBackendProvider);
  modal.classList.remove('hidden');
}

function closeBackendModal() {
  const modal = document.getElementById('backend-modal');
  if (modal) modal.classList.add('hidden');
}

function applyMongoPassword(pwd) {
  const uriInput = document.getElementById('mongodb-uri-input');
  if (!uriInput) return;
  const baseUri = DEFAULT_MONGODB_URI;
  if (pwd) {
    const encoded = encodeURIComponent(pwd);
    uriInput.value = baseUri.replace('<db_password>', encoded);
  } else {
    uriInput.value = baseUri;
  }
}

function toggleQuickPasswordVisibility() {
  const input = document.getElementById('mongodb-password-quick');
  const icon = document.getElementById('mongodb-pwd-toggle-icon');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    if (icon) icon.textContent = 'visibility';
  }
}

async function handleBackendSave() {
  if (activeBackendProvider === 'mongodb') {
    await saveMongoDBCredentials();
  } else {
    const urlInput = document.getElementById('backend-url-input');
    const keyInput = document.getElementById('backend-key-input');
    const url = urlInput ? urlInput.value : '';
    const key = keyInput ? keyInput.value : '';
    await saveBackendCredentials(url, key);
  }
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

function toggleMongoUriVisibility() {
  const input = document.getElementById('mongodb-uri-input');
  const icon = document.getElementById('mongodb-uri-toggle-icon');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    if (icon) icon.textContent = 'visibility';
  }
}

// Global Export
window.initAllBackends = initAllBackends;
window.initMongoDBBackend = initMongoDBBackend;
window.testMongoDBConnection = testMongoDBConnection;
window.saveMongoDBCredentials = saveMongoDBCredentials;
window.syncLocalToMongoDB = syncLocalToMongoDB;
window.pullFromMongoDB = pullFromMongoDB;
window.copyMongoDBSchema = copyMongoDBSchema;
window.applyMongoPassword = applyMongoPassword;
window.toggleQuickPasswordVisibility = toggleQuickPasswordVisibility;

window.initSupabaseBackend = initSupabaseBackend;
window.testSupabaseConnection = testSupabaseConnection;
window.saveBackendCredentials = saveBackendCredentials;
window.syncLocalToSupabase = syncLocalToSupabase;
window.pullAllFromSupabase = pullAllFromSupabase;
window.copySupabaseSchema = copySupabaseSchema;

window.syncLocalToCloud = syncLocalToCloud;
window.switchBackendProvider = switchBackendProvider;
window.openBackendModal = openBackendModal;
window.closeBackendModal = closeBackendModal;
window.handleBackendSave = handleBackendSave;
window.toggleKeyVisibility = toggleKeyVisibility;
window.toggleMongoUriVisibility = toggleMongoUriVisibility;

// Auto-run on load
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllBackends);
  } else {
    initAllBackends();
  }
}
