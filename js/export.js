// GST Billing Platform - Export & Share Utilities

function downloadFile(content, fileName, mimeType = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate GSTR-1 CSV matching Government Portal Schema (Table 4A B2B)
function exportGSTR1CSV() {
  const invoices = window.gstStore.invoices.filter(i => i.status !== 'DRAFT');
  
  // Header row for GSTR-1 Table 4A (B2B Invoices)
  const headers = [
    'GSTIN/UIN of Recipient',
    'Receiver Name',
    'Invoice Number',
    'Invoice Date',
    'Invoice Value (INR)',
    'Place Of Supply',
    'Reverse Charge',
    'Applicable % of Tax Rate',
    'Invoice Type',
    'E-Commerce GSTIN',
    'Rate (%)',
    'Taxable Value (INR)',
    'Cess Amount',
    'IRN',
    'Status'
  ];

  const rows = [headers.join(',')];

  invoices.forEach(inv => {
    inv.items.forEach(item => {
      const row = [
        `"${inv.customerGstin || ''}"`,
        `"${(inv.customerName || '').replace(/"/g, '""')}"`,
        `"${inv.invoiceNumber}"`,
        `"${inv.issueDate}"`,
        inv.grandTotal.toFixed(2),
        `"${inv.placeOfSupply || '27 - Maharashtra'}"`,
        `"${inv.reverseCharge || 'N'}"`,
        '""',
        `"Regular B2B"`,
        '""',
        item.gstRate || 18,
        (item.taxableAmount || 0).toFixed(2),
        '0.00',
        `"${inv.irn || ''}"`,
        `"${inv.status}"`
      ];
      rows.push(row.join(','));
    });
  });

  const csvContent = rows.join('\r\n');
  downloadFile(csvContent, `GSTR1_B2B_Returns_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
  window.triggerToast('GSTR-1 B2B Returns CSV exported successfully!');
}

// Generate Detailed Invoices Master CSV
function exportDetailedInvoicesCSV() {
  const invoices = window.gstStore.invoices;
  const headers = [
    'Invoice No',
    'Issue Date',
    'Due Date',
    'Customer Name',
    'Customer GSTIN',
    'Place of Supply',
    'Taxable Subtotal',
    'CGST Total',
    'SGST Total',
    'IGST Total',
    'Round Off',
    'Grand Total',
    'Paid Amount',
    'Due Amount',
    'Status',
    'IRN Hash'
  ];

  const rows = [headers.join(',')];
  invoices.forEach(inv => {
    const row = [
      `"${inv.invoiceNumber}"`,
      `"${inv.issueDate}"`,
      `"${inv.dueDate}"`,
      `"${(inv.customerName || '').replace(/"/g, '""')}"`,
      `"${inv.customerGstin || ''}"`,
      `"${inv.placeOfSupply || ''}"`,
      (inv.taxableSubtotal || 0).toFixed(2),
      (inv.cgstTotal || 0).toFixed(2),
      (inv.sgstTotal || 0).toFixed(2),
      (inv.igstTotal || 0).toFixed(2),
      (inv.roundOff || 0).toFixed(2),
      (inv.grandTotal || 0).toFixed(2),
      (inv.paidAmount || 0).toFixed(2),
      (inv.dueAmount || 0).toFixed(2),
      `"${inv.status}"`,
      `"${inv.irn || ''}"`
    ];
    rows.push(row.join(','));
  });

  const csvContent = rows.join('\r\n');
  downloadFile(csvContent, `GST_Invoices_Master_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
  window.triggerToast('All Invoices master exported to CSV!');
}

// WhatsApp Share Formatter
function generateWhatsAppMessage(invoice, includeLink = true) {
  if (!invoice) return '';
  const seller = window.gstStore.seller;
  const paymentStatus = invoice.status === 'PAID' ? '✅ PAID' : (invoice.status === 'OVERDUE' ? '⚠️ OVERDUE' : '⏳ PENDING PAYMENT');
  
  const origin = window.location.origin || '';
  const pathname = window.location.pathname || '';
  const downloadLink = `${origin}${pathname}?invoice=${invoice.id || invoice.invoiceNumber}&download=true`;
  const linkSection = includeLink 
    ? `\n📥 *Click to Download Invoice Bill (PDF):*\n${downloadLink}\n` 
    : `\n📎 *Attached Bill Document:* ${invoice.invoiceNumber}.pdf\n`;

  return `*TAX INVOICE - ${seller.companyName}*\n\n` +
    `Dear *${invoice.customerName}*,\n` +
    `Greetings! Please find below your Tax Invoice summary:\n\n` +
    `📄 *Invoice No:* ${invoice.invoiceNumber}\n` +
    `📅 *Date:* ${invoice.issueDate}\n` +
    `💰 *Grand Total:* ${window.formatINR(invoice.grandTotal)}\n` +
    `📌 *Status:* ${paymentStatus}\n` +
    `🔐 *IRN:* ${invoice.irn ? invoice.irn.substring(0, 16) + '...' : 'Verified'}\n` +
    linkSection + `\n` +
    `🏦 *Bank Account:* ${seller.bankName}\n` +
    `A/C: ${seller.accountNumber} | IFSC: ${seller.ifsc}\n\n` +
    `Thank you for your business!\n` +
    `For any queries, contact: ${seller.phone}`;
}

window.exportGSTR1CSV = exportGSTR1CSV;
window.exportDetailedInvoicesCSV = exportDetailedInvoicesCSV;
window.generateWhatsAppMessage = generateWhatsAppMessage;
