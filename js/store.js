// GST Billing Platform - Store & Data Management
const GST_STORE_KEY = 'gst_billing_data_v3';

const defaultSeller = {
  companyName: 'SASMITH TRADERS',
  tradeName: 'SASMITH TRADERS',
  gstin: '33BZRPS8264H1ZN',
  pan: 'BZRPS8264H',
  state: 'Tamil Nadu',
  stateCode: '33',
  address: '6/199 H KOVAI MAIN ROAD KG PALAYAM, Coimbatore, Tamil Nadu, 641697',
  phone: '9976644440',
  email: 'sathishnivi8866@gmail.com',
  bankName: 'HDFC Bank',
  branch: 'ANNUR',
  accountNumber: '50200062410936',
  ifsc: 'HDFC0008753',
  authorizedSignatory: 'Authorised Signatory',
  fy: 'FY 2026-27'
};

const defaultCustomers = [
  {
    id: 'cust-kanthasamy',
    name: 'Mr. Kanthasamy',
    gstin: 'URP',
    state: 'Tamil Nadu',
    stateCode: '33',
    address: 'Onnakarasampalayam, Annur., Coimbatore, Tamil Nadu, 641697',
    dispatchAddress: 'Onnakarasampalayam, Annur., Coimbatore, Tamil Nadu, 641697',
    category: 'Unregistered Person (URP)',
    contactPerson: 'Mr. Kanthasamy',
    email: 'kanthasamy@example.com',
    phone: '9842371148'
  },
  {
    id: 'cust-1',
    name: 'Reliance Retail Limited',
    gstin: '27AABCR1234F1ZX',
    state: 'Maharashtra',
    stateCode: '27',
    address: '3rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao, Mumbai, MH - 400002',
    dispatchAddress: 'Central Logistics Center, Warehouse Unit #4B, Kalyan-Bhiwandi Junction, Thane, MH - 421302',
    category: 'Regular Taxpayer',
    contactPerson: 'Suresh Patil',
    email: 'accounts@relianceretail.com',
    phone: '+91 98200 11223'
  },
  {
    id: 'cust-2',
    name: 'Mahindra Logistics Ltd',
    gstin: '27AABCM6543D1ZT',
    state: 'Maharashtra',
    stateCode: '27',
    address: 'Logistics Park, Phase 2, Viman Nagar, Pune, MH - 411014',
    dispatchAddress: 'Mahindra Distribution Center, Chakan Industrial Area Phase 2, Pune, MH - 410501',
    category: 'Regular Taxpayer',
    contactPerson: 'Rajesh Sharma',
    email: 'billing@mahindralogistics.com',
    phone: '+91 98901 23456'
  },
  {
    id: 'cust-3',
    name: 'Tata Consultancy Services Ltd',
    gstin: '27AAACT2727Q1ZW',
    state: 'Maharashtra',
    stateCode: '27',
    address: 'TCS House, Raveline Street, Fort, Mumbai, MH - 400001',
    dispatchAddress: 'Yantra Park, Pokhran Road No. 2, Subhash Nagar, Thane West, MH - 400601',
    category: 'Regular Taxpayer',
    contactPerson: 'Anita Deshmukh',
    email: 'finance.ap@tcs.com',
    phone: '+91 98211 44556'
  },
  {
    id: 'cust-4',
    name: 'Infosys Technologies Limited',
    gstin: '29AAACI4740D1ZT',
    state: 'Karnataka',
    stateCode: '29',
    address: 'Electronics City, Hosur Road, Bengaluru, Karnataka - 560100',
    dispatchAddress: 'Infosys Campus, Hebbal Electronic Zone, Bengaluru, KA - 560045',
    category: 'Regular Taxpayer (Inter-State)',
    contactPerson: 'Vinod Nair',
    email: 'procurement@infosys.com',
    phone: '+91 98450 78901'
  },
  {
    id: 'cust-5',
    name: 'Bharti Airtel Limited',
    gstin: '07AAACB2894G1ZN',
    state: 'Delhi',
    stateCode: '07',
    address: 'Airtel Center, Plot No 16, Udyog Vihar Phase IV, New Delhi - 110001',
    dispatchAddress: 'Airtel Logistics Hub, Okhla Industrial Area Phase 1, New Delhi - 110020',
    category: 'Regular Taxpayer (Inter-State)',
    contactPerson: 'Megha Gupta',
    email: 'vendor.payments@airtel.com',
    phone: '+91 98110 33445'
  }
];

const defaultCatalog = [
  { id: 'prod-waste-fiber', name: 'WASTE FIBER', hsn: '5305', isService: false, unit: 'BAG', defaultRate: 245.00, defaultGstRate: 0, desc: 'WASTE FIBER • HSN/SAC: 5305 • Unit: BAG' },
  { id: 'prod-1', name: 'Enterprise Cloud Server Hosting', hsn: '998315', isService: true, unit: 'Unit', defaultRate: 45000, defaultGstRate: 18, desc: 'Annual SLA License, Dedicated CPU & Cloud Storage' },
  { id: 'prod-2', name: 'GST Automated e-Invoicing API Gateway', hsn: '998313', isService: true, unit: 'Packs', defaultRate: 10000, defaultGstRate: 18, desc: 'Integration Pack (10k docs) with real-time IRN generation' },
  { id: 'prod-3', name: 'Compliance Onboarding & Training Session', hsn: '998319', isService: true, unit: 'Session', defaultRate: 6339, defaultGstRate: 18, desc: 'Certified CA Consultation & Staff Onboarding' },
  { id: 'prod-4', name: 'Industrial ERP Consultation', hsn: '998313', isService: true, unit: 'Session', defaultRate: 45000, defaultGstRate: 18, desc: 'System workflow blueprint & audit' },
  { id: 'prod-5', name: 'Hardware Setup & Installation', hsn: '8471', isService: false, unit: 'Unit', defaultRate: 12500, defaultGstRate: 18, desc: 'Onsite edge server config & peripherals' },
  { id: 'prod-6', name: 'Network Firewall Appliance (10Gbps)', hsn: '8517', isService: false, unit: 'Unit', defaultRate: 32000, defaultGstRate: 18, desc: 'Hardware security appliance with 3-yr license' },
  { id: 'prod-7', name: 'Annual Software Maintenance Contract', hsn: '9987', isService: true, unit: 'Year', defaultRate: 24000, defaultGstRate: 18, desc: '24/7 Priority Support & Version Updates' }
];

const defaultQuotations = [
  {
    id: 'QT-2026-041',
    quotationNumber: 'QT-2026-041',
    date: '2026-11-10',
    validUntil: '2026-11-25',
    customerId: 'cust-3',
    customerName: 'Tata Consultancy Services Ltd',
    customerGstin: '27AAACT2727Q1ZW',
    customerAddress: 'TCS House, Raveline Street, Fort, Mumbai, MH - 400001',
    stateCode: '27',
    placeOfSupply: '27 - Maharashtra',
    status: 'PENDING',
    items: [
      {
        id: 'q-item-1',
        name: 'Enterprise Cloud Server Hosting',
        description: 'Annual SLA License, Dedicated CPU & Cloud Storage',
        hsn: '998315',
        quantity: 2,
        unit: 'Unit',
        rate: 45000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 90000,
        gstRate: 18,
        total: 106200
      },
      {
        id: 'q-item-2',
        name: 'GST Automated e-Invoicing API Gateway',
        description: 'Integration Pack (10k docs) with real-time IRN generation',
        hsn: '998313',
        quantity: 2,
        unit: 'Packs',
        rate: 10000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 20000,
        gstRate: 18,
        total: 23600
      }
    ],
    taxableSubtotal: 110000,
    cgstTotal: 9900,
    sgstTotal: 9900,
    igstTotal: 0,
    grandTotal: 129800,
    terms: '1. Quotation valid for 15 days from issue date.\n2. Payment: 50% advance, balance on delivery.'
  },
  {
    id: 'QT-2026-040',
    quotationNumber: 'QT-2026-040',
    date: '2026-11-06',
    validUntil: '2026-11-20',
    customerId: 'cust-4',
    customerName: 'Infosys Technologies Limited',
    customerGstin: '29AAACI4740D1ZT',
    customerAddress: 'Electronics City, Hosur Road, Bengaluru, Karnataka - 560100',
    stateCode: '29',
    placeOfSupply: '29 - Karnataka',
    status: 'ACCEPTED',
    items: [
      {
        id: 'q-item-1',
        name: 'Network Firewall Appliance (10Gbps)',
        description: 'Hardware security appliance with 3-yr license',
        hsn: '8517',
        quantity: 3,
        unit: 'Unit',
        rate: 32000,
        taxType: 'Exclusive',
        discountPercent: 5,
        taxableAmount: 91200,
        gstRate: 18,
        total: 107616
      },
      {
        id: 'q-item-2',
        name: 'Industrial ERP Consultation',
        description: 'System workflow blueprint & audit',
        hsn: '998313',
        quantity: 2,
        unit: 'Session',
        rate: 45000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 90000,
        gstRate: 18,
        total: 106200
      }
    ],
    taxableSubtotal: 181200,
    cgstTotal: 0,
    sgstTotal: 0,
    igstTotal: 32616,
    grandTotal: 213816,
    terms: '1. Standard SLA applies.\n2. Support included for 12 months.'
  },
  {
    id: 'QT-2026-039',
    quotationNumber: 'QT-2026-039',
    date: '2026-10-29',
    validUntil: '2026-11-15',
    customerId: 'cust-2',
    customerName: 'Mahindra Logistics Ltd',
    customerGstin: '27AABCM6543D1ZT',
    customerAddress: 'Logistics Park, Phase 2, Viman Nagar, Pune, MH - 411014',
    stateCode: '27',
    placeOfSupply: '27 - Maharashtra',
    status: 'CANCELLED',
    items: [
      {
        id: 'q-item-1',
        name: 'Annual Software Maintenance Contract',
        description: '24/7 Priority Support & Version Updates',
        hsn: '9987',
        quantity: 1,
        unit: 'Year',
        rate: 24000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 24000,
        gstRate: 18,
        total: 28320
      }
    ],
    taxableSubtotal: 24000,
    cgstTotal: 2160,
    sgstTotal: 2160,
    igstTotal: 0,
    grandTotal: 28320,
    terms: '1. Annual contract subject to SLA terms.'
  }
];

const defaultPurchases = [
  { id: 'pur-1', vendor: 'Amazon Web Services India', gstin: '27AABCA1429G1Z2', billNo: 'AWS-2026-901', date: '2026-11-01', amount: 350000, itc: 63000, status: 'Claimed' },
  { id: 'pur-2', vendor: 'Dell Global B.V. India', gstin: '29AABCD9810K1Z5', billNo: 'DELL-IN-891', date: '2026-10-25', amount: 480000, itc: 86400, status: 'Claimed' },
  { id: 'pur-3', vendor: 'Airtel Broadband Fiber', gstin: '27AAACB2894G1ZN', billNo: 'AIR-OCT-49', date: '2026-10-20', amount: 90000, itc: 16200, status: 'Claimed' },
  { id: 'pur-4', vendor: 'Cisco Systems India', gstin: '27AAACC2019F1Z0', billNo: 'CSCO-8942', date: '2026-10-15', amount: 200000, itc: 36000, status: 'Claimed' }
];

const defaultInvoices = [
  {
    id: 'SSS-INV-26-27-345',
    invoiceNumber: 'SSS/INV/26-27/345',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-11-11',
    issueTime: '11:00 AM',
    dueDate: '2026-11-26',
    customerId: 'cust-kanthasamy',
    customerName: 'Mr. Kanthasamy',
    customerGstin: 'URP',
    customerPhone: '9842371148',
    customerAddress: 'Onnakarasampalayam, Annur., Coimbatore, Tamil Nadu, 641697',
    dispatchAddress: 'Onnakarasampalayam, Annur., Coimbatore, Tamil Nadu, 641697',
    placeOfSupply: '33 - Tamil Nadu',
    stateCode: '33',
    reverseCharge: 'NO',
    vehicleNumber: 'TN66K4834',
    transportMode: 'Road',
    salesPerson: 'selvam',
    isEInvoiced: false,
    status: 'UNPAID',
    items: [
      {
        id: 'item-sss-1',
        srNo: 1,
        name: 'WASTE FIBER',
        description: 'HSN/SAC: 5305',
        hsn: '5305',
        quantity: 67,
        unit: 'BAG',
        rate: 245.00,
        discountPercent: 0,
        taxableAmount: 16415.00,
        gstRate: 0,
        cgstRate: 0,
        sgstRate: 0,
        igstRate: 0,
        cgstAmount: 0.00,
        sgstAmount: 0.00,
        igstAmount: 0.00,
        total: 16415.00
      }
    ],
    taxableSubtotal: 16415.00,
    cgstTotal: 0.00,
    sgstTotal: 0.00,
    igstTotal: 0.00,
    roundOff: 0.00,
    grandTotal: 16415.00,
    amountInWords: 'Sixteen Thousand Four Hundred Fifteen Rupees Only',
    paidAmount: 0.00,
    dueAmount: 16415.00,
    settlementDetails: null,
    terms: '1. This is an electronically generated document.\n2. All disputes are subject to Coimbatore jurisdiction.'
  },
  {
    id: 'INV-2026-089',
    invoiceNumber: 'INV-2026-089',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-11-12',
    issueTime: '02:15 PM',
    dueDate: '2026-11-27',
    customerId: 'cust-1',
    customerName: 'Reliance Retail Limited',
    customerGstin: '27AABCR1234F1ZX',
    customerAddress: '3rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao, Mumbai, MH - 400002',
    dispatchAddress: 'Central Logistics Center (Bhiwandi), Warehouse Unit #4B, Kalyan-Bhiwandi Junction, Thane, MH - 421302',
    placeOfSupply: '27 - Maharashtra',
    stateCode: '27',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '8a93e507b9a47d2f91bc9a3e2189d9e4a3b1d7f8c0e2a39d8e7c1f8a9235c0d24e',
    status: 'PAID',
    items: [
      {
        id: 'item-1',
        name: 'Enterprise Cloud Server Hosting',
        description: 'HSN/SAC: 998315 • Annual SLA License',
        hsn: '998315',
        quantity: 1,
        unit: 'Unit',
        rate: 45000,
        discountPercent: 0,
        taxableAmount: 45000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 4050,
        sgstAmount: 4050,
        igstAmount: 0,
        total: 53100
      },
      {
        id: 'item-2',
        name: 'GST Automated e-Invoicing API Gateway',
        description: 'HSN/SAC: 998313 • Integration Pack (10k docs)',
        hsn: '998313',
        quantity: 2,
        unit: 'Packs',
        rate: 10000,
        discountPercent: 0,
        taxableAmount: 20000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 1800,
        sgstAmount: 1800,
        igstAmount: 0,
        total: 23600
      },
      {
        id: 'item-3',
        name: 'Compliance Onboarding & Training Session',
        description: 'HSN/SAC: 998319 • Certified CA Consultation',
        hsn: '998319',
        quantity: 1,
        unit: 'Session',
        rate: 6339,
        discountPercent: 0,
        taxableAmount: 6339,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 570.51,
        sgstAmount: 570.51,
        igstAmount: 0,
        total: 7480.02
      }
    ],
    taxableSubtotal: 71339.00,
    cgstTotal: 6420.51,
    sgstTotal: 6420.51,
    igstTotal: 0,
    roundOff: 0.98,
    grandTotal: 84200.00,
    amountInWords: 'Eighty Four Thousand Two Hundred Rupees Only',
    paidAmount: 84200.00,
    dueAmount: 0,
    settlementDetails: {
      isSettled: true,
      settlementDate: '12 Nov 2026, 04:32 PM',
      paymentMode: 'Direct NEFT / RTGS',
      referenceNumber: 'HDFC-N84910294',
      voucherNumber: 'VCH-2026-904',
      isAutoReconciled: true
    },
    terms: '1. Payment due within 15 days of invoice date.\n2. Interest @ 18% p.a. applicable on overdue balance after 30 days.'
  },
  {
    id: 'INV-2026-090',
    invoiceNumber: 'INV-2026-090',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-11-08',
    issueTime: '11:42 AM',
    dueDate: '2026-11-10',
    customerId: 'cust-1',
    customerName: 'Reliance Retail Limited',
    customerGstin: '27AABCR1234F1ZX',
    customerAddress: '3rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao, Mumbai, MH - 400002',
    dispatchAddress: 'Central Logistics Center (Bhiwandi), Thane, MH - 421302',
    placeOfSupply: '27 - Maharashtra',
    stateCode: '27',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '8a7c2957b9a47d2f91bc9a3e2189d9e4a3b1d7f8c0e2a39d8e7c1f8a92353f1',
    status: 'OVERDUE',
    items: [
      {
        id: 'item-1',
        name: 'Enterprise Cloud Server Hosting',
        description: 'HSN 998315 • 2x Cluster nodes',
        hsn: '998315',
        quantity: 2,
        unit: 'Unit',
        rate: 45000,
        discountPercent: 0,
        taxableAmount: 90000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 8100,
        sgstAmount: 8100,
        igstAmount: 0,
        total: 106200
      },
      {
        id: 'item-2',
        name: 'Network Firewall Appliance (10Gbps)',
        description: 'HSN 8517 • Edge Gateway',
        hsn: '8517',
        quantity: 1,
        unit: 'Unit',
        rate: 31016.95,
        discountPercent: 0,
        taxableAmount: 31016.95,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 2791.53,
        sgstAmount: 2791.53,
        igstAmount: 0,
        total: 36600
      }
    ],
    taxableSubtotal: 121016.95,
    cgstTotal: 10891.53,
    sgstTotal: 10891.53,
    igstTotal: 0,
    roundOff: -0.01,
    grandTotal: 142800.00,
    amountInWords: 'One Lakh Forty Two Thousand Eight Hundred Rupees Only',
    paidAmount: 0,
    dueAmount: 142800.00,
    settlementDetails: null,
    terms: '1. Payment due within 15 days of invoice date.'
  },
  {
    id: 'INV-2026-088',
    invoiceNumber: 'INV-2026-088',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-11-04',
    issueTime: '10:15 AM',
    dueDate: '2026-11-19',
    customerId: 'cust-2',
    customerName: 'Mahindra Logistics Ltd',
    customerGstin: '27AABCM6543D1ZT',
    customerAddress: 'Logistics Park, Phase 2, Viman Nagar, Pune, MH - 411014',
    dispatchAddress: 'Mahindra Logistics Park, Phase 2, Pune, MH - 411014',
    placeOfSupply: '27 - Maharashtra',
    stateCode: '27',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '9b84e608a1c58d3f02cd1a4e3290e0f5b4c2e8f9d1f3b40e9f8d2a0346d135f2',
    status: 'PAID',
    items: [
      {
        id: 'item-1',
        name: 'Industrial ERP Consultation',
        description: 'HSN 998313 • System workflow blueprint & audit',
        hsn: '998313',
        quantity: 1,
        unit: 'Session',
        rate: 45000,
        discountPercent: 0,
        taxableAmount: 45000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 4050,
        sgstAmount: 4050,
        igstAmount: 0,
        total: 53100
      },
      {
        id: 'item-2',
        name: 'Hardware Setup & Installation',
        description: 'HSN 8471 • Onsite edge server config (5% Trade Discount)',
        hsn: '8471',
        quantity: 2,
        unit: 'Unit',
        rate: 12500,
        discountPercent: 5,
        taxableAmount: 22500,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 2025,
        sgstAmount: 2025,
        igstAmount: 0,
        total: 26550
      }
    ],
    taxableSubtotal: 67500.00,
    cgstTotal: 6075.00,
    sgstTotal: 6075.00,
    igstTotal: 0,
    roundOff: 0.00,
    grandTotal: 79650.00,
    amountInWords: 'Seventy Nine Thousand Six Hundred Fifty Rupees Only',
    paidAmount: 79650.00,
    dueAmount: 0,
    settlementDetails: {
      isSettled: true,
      settlementDate: '07 Nov 2026, 11:15 AM',
      paymentMode: 'IMPS Direct Transfer',
      referenceNumber: 'MAHIN-9082103',
      voucherNumber: 'VCH-2026-891',
      isAutoReconciled: true
    },
    terms: '1. Payment due within 15 days of invoice date.'
  },
  {
    id: 'INV-2026-087',
    invoiceNumber: 'INV-2026-087',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-11-02',
    issueTime: '03:30 PM',
    dueDate: '2026-11-17',
    customerId: 'cust-3',
    customerName: 'Tata Consultancy Services Ltd',
    customerGstin: '27AAACT2727Q1ZW',
    customerAddress: 'TCS House, Raveline Street, Fort, Mumbai, MH - 400001',
    dispatchAddress: 'Yantra Park, Thane West, MH - 400601',
    placeOfSupply: '27 - Maharashtra',
    stateCode: '27',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '7c83f509b2d69e4f13de2b5f4301f1a6c5d3f9a0e2a4c51f0a9e3b1457e246a3',
    status: 'PAID',
    items: [
      {
        id: 'item-1',
        name: 'Enterprise Cloud Server Hosting',
        description: 'HSN 998315 • 4x High Capacity Dedicated Servers',
        hsn: '998315',
        quantity: 4,
        unit: 'Unit',
        rate: 45000,
        discountPercent: 0,
        taxableAmount: 180000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 16200,
        sgstAmount: 16200,
        igstAmount: 0,
        total: 212400
      },
      {
        id: 'item-2',
        name: 'GST Automated e-Invoicing API Gateway',
        description: 'HSN 998313 • Enterprise Tier 50k calls',
        hsn: '998313',
        quantity: 2,
        unit: 'Packs',
        rate: 10000,
        discountPercent: 0,
        taxableAmount: 20000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 1800,
        sgstAmount: 1800,
        igstAmount: 0,
        total: 23600
      }
    ],
    taxableSubtotal: 200000.00,
    cgstTotal: 18000.00,
    sgstTotal: 18000.00,
    igstTotal: 0,
    roundOff: 0.00,
    grandTotal: 236000.00,
    amountInWords: 'Two Lakh Thirty Six Thousand Rupees Only',
    paidAmount: 236000.00,
    dueAmount: 0,
    settlementDetails: {
      isSettled: true,
      settlementDate: '03 Nov 2026, 05:40 PM',
      paymentMode: 'Corporate RTGS',
      referenceNumber: 'TCS-FIN-982110',
      voucherNumber: 'VCH-2026-879',
      isAutoReconciled: true
    },
    terms: '1. Standard 15-day Net payment.'
  },
  {
    id: 'INV-2026-086',
    invoiceNumber: 'INV-2026-086',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-10-28',
    issueTime: '01:20 PM',
    dueDate: '2026-11-20',
    customerId: 'cust-4',
    customerName: 'Infosys Technologies Limited',
    customerGstin: '29AAACI4740D1ZT',
    customerAddress: 'Electronics City, Hosur Road, Bengaluru, Karnataka - 560100',
    dispatchAddress: 'Infosys Campus, Hebbal Electronic Zone, Bengaluru, KA - 560045',
    placeOfSupply: '29 - Karnataka',
    stateCode: '29',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '5a62d408a1c58e3f02de1b4e3201e1f5b4d3e8a9d1b3c40f9e8d2a1346e235d1',
    status: 'PARTIALLY_PAID',
    items: [
      {
        id: 'item-1',
        name: 'Enterprise Cloud Server Hosting',
        description: 'HSN 998315 • Annual SLA License (Karnataka Data Center)',
        hsn: '998315',
        quantity: 2,
        unit: 'Unit',
        rate: 50000,
        discountPercent: 0,
        taxableAmount: 100000,
        gstRate: 18,
        cgstRate: 0,
        sgstRate: 0,
        igstRate: 18,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 18000,
        total: 118000
      }
    ],
    taxableSubtotal: 100000.00,
    cgstTotal: 0,
    sgstTotal: 0,
    igstTotal: 18000.00,
    roundOff: 0.00,
    grandTotal: 118000.00,
    amountInWords: 'One Lakh Eighteen Thousand Rupees Only',
    paidAmount: 50000.00,
    dueAmount: 68000.00,
    settlementDetails: {
      isSettled: false,
      settlementDate: '01 Nov 2026, 02:10 PM',
      paymentMode: 'Part Payment NEFT',
      referenceNumber: 'INFY-P892019',
      voucherNumber: 'VCH-2026-860',
      isAutoReconciled: true
    },
    terms: '1. Balance ₹68,000 due on or before 20 Nov 2026.'
  },
  {
    id: 'INV-2026-085',
    invoiceNumber: 'INV-2026-085',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-10-22',
    issueTime: '11:10 AM',
    dueDate: '2026-11-06',
    customerId: 'cust-5',
    customerName: 'Bharti Airtel Limited',
    customerGstin: '07AAACB2894G1ZN',
    customerAddress: 'Airtel Center, Plot No 16, Udyog Vihar Phase IV, New Delhi - 110001',
    dispatchAddress: 'Airtel Logistics Hub, Okhla Phase 1, New Delhi - 110020',
    placeOfSupply: '07 - Delhi',
    stateCode: '07',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '3e41b207a9c47e2f91bc9a3e2189d9e4a3b1d7f8c0e2a39d8e7c1f8a9235a821',
    status: 'PAID',
    items: [
      {
        id: 'item-1',
        name: 'Network Firewall Appliance (10Gbps)',
        description: 'HSN 8517 • Hardware security appliance',
        hsn: '8517',
        quantity: 2,
        unit: 'Unit',
        rate: 32000,
        discountPercent: 0,
        taxableAmount: 64000,
        gstRate: 18,
        cgstRate: 0,
        sgstRate: 0,
        igstRate: 18,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 11520,
        total: 75520
      },
      {
        id: 'item-2',
        name: 'Hardware Setup & Installation',
        description: 'HSN 8471 • Onsite edge setup',
        hsn: '8471',
        quantity: 1,
        unit: 'Unit',
        rate: 16000,
        discountPercent: 0,
        taxableAmount: 16000,
        gstRate: 18,
        cgstRate: 0,
        sgstRate: 0,
        igstRate: 18,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 2880,
        total: 18880
      }
    ],
    taxableSubtotal: 80000.00,
    cgstTotal: 0,
    sgstTotal: 0,
    igstTotal: 14400.00,
    roundOff: 0.00,
    grandTotal: 94400.00,
    amountInWords: 'Ninety Four Thousand Four Hundred Rupees Only',
    paidAmount: 94400.00,
    dueAmount: 0,
    settlementDetails: {
      isSettled: true,
      settlementDate: '26 Oct 2026, 03:00 PM',
      paymentMode: 'Corporate RTGS',
      referenceNumber: 'AIRTEL-CORP-9102',
      voucherNumber: 'VCH-2026-851',
      isAutoReconciled: true
    },
    terms: '1. Standard 15-day Net payment.'
  },
  {
    id: 'INV-2026-084',
    invoiceNumber: 'INV-2026-084',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-10-18',
    issueTime: '04:45 PM',
    dueDate: '2026-11-18',
    customerId: 'cust-2',
    customerName: 'Mahindra Logistics Ltd',
    customerGstin: '27AABCM6543D1ZT',
    customerAddress: 'Logistics Park, Phase 2, Viman Nagar, Pune, MH - 411014',
    dispatchAddress: 'Mahindra Logistics Park, Phase 2, Pune, MH - 411014',
    placeOfSupply: '27 - Maharashtra',
    stateCode: '27',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '2a31c106a8b36d1e80ab892d1078c8d392a0c6e7b9d1b28c7d6b0e7981249710',
    status: 'UNPAID',
    items: [
      {
        id: 'item-1',
        name: 'Annual Software Maintenance Contract',
        description: 'HSN 9987 • AMC SLA 2026-27',
        hsn: '9987',
        quantity: 1,
        unit: 'Year',
        rate: 30000,
        discountPercent: 0,
        taxableAmount: 30000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 2700,
        sgstAmount: 2700,
        igstAmount: 0,
        total: 35400
      }
    ],
    taxableSubtotal: 30000.00,
    cgstTotal: 2700.00,
    sgstTotal: 2700.00,
    igstTotal: 0,
    roundOff: 0.00,
    grandTotal: 35400.00,
    amountInWords: 'Thirty Five Thousand Four Hundred Rupees Only',
    paidAmount: 0,
    dueAmount: 35400.00,
    settlementDetails: null,
    terms: '1. Payment due within 30 days.'
  },
  {
    id: 'INV-2026-083',
    invoiceNumber: 'INV-2026-083',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-09-24',
    issueTime: '02:00 PM',
    dueDate: '2026-10-09',
    customerId: 'cust-1',
    customerName: 'Reliance Retail Limited',
    customerGstin: '27AABCR1234F1ZX',
    customerAddress: '3rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao, Mumbai, MH - 400002',
    dispatchAddress: 'Central Logistics Center (Bhiwandi), Thane, MH - 421302',
    placeOfSupply: '27 - Maharashtra',
    stateCode: '27',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '1e22a005a7b25c0d70ba781c0967b7c281f9b5d6a8c0a17b6c5a9d6870138609',
    status: 'PAID',
    items: [
      {
        id: 'item-1',
        name: 'Enterprise Cloud Server Hosting',
        description: 'HSN 998315 • Q2 Server Cluster SLA',
        hsn: '998315',
        quantity: 4,
        unit: 'Unit',
        rate: 45000,
        discountPercent: 0,
        taxableAmount: 180000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 16200,
        sgstAmount: 16200,
        igstAmount: 0,
        total: 212400
      }
    ],
    taxableSubtotal: 180000.00,
    cgstTotal: 16200.00,
    sgstTotal: 16200.00,
    igstTotal: 0,
    roundOff: 0.00,
    grandTotal: 212400.00,
    amountInWords: 'Two Lakh Twelve Thousand Four Hundred Rupees Only',
    paidAmount: 212400.00,
    dueAmount: 0,
    settlementDetails: {
      isSettled: true,
      settlementDate: '28 Sep 2026, 10:20 AM',
      paymentMode: 'Direct NEFT',
      referenceNumber: 'REL-SEPT-99120',
      voucherNumber: 'VCH-2026-831',
      isAutoReconciled: true
    },
    terms: '1. Standard terms.'
  },
  {
    id: 'INV-2026-082',
    invoiceNumber: 'INV-2026-082',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-08-16',
    issueTime: '11:00 AM',
    dueDate: '2026-08-31',
    customerId: 'cust-3',
    customerName: 'Tata Consultancy Services Ltd',
    customerGstin: '27AAACT2727Q1ZW',
    customerAddress: 'TCS House, Raveline Street, Fort, Mumbai, MH - 400001',
    dispatchAddress: 'Yantra Park, Thane West, MH - 400601',
    placeOfSupply: '27 - Maharashtra',
    stateCode: '27',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '0f11a994a6b14b9c69a9670b9856a6b170e8a4c597b9a06a5b4f8c5769027598',
    status: 'PAID',
    items: [
      {
        id: 'item-1',
        name: 'Enterprise Cloud Server Hosting',
        description: 'HSN 998315 • Q1 Cluster Renewal',
        hsn: '998315',
        quantity: 3,
        unit: 'Unit',
        rate: 45000,
        discountPercent: 0,
        taxableAmount: 135000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 12150,
        sgstAmount: 12150,
        igstAmount: 0,
        total: 159300
      }
    ],
    taxableSubtotal: 135000.00,
    cgstTotal: 12150.00,
    sgstTotal: 12150.00,
    igstTotal: 0,
    roundOff: 0.00,
    grandTotal: 159300.00,
    amountInWords: 'One Lakh Fifty Nine Thousand Three Hundred Rupees Only',
    paidAmount: 159300.00,
    dueAmount: 0,
    settlementDetails: {
      isSettled: true,
      settlementDate: '20 Aug 2026, 02:40 PM',
      paymentMode: 'RTGS Transfer',
      referenceNumber: 'TCS-AUG-8812',
      voucherNumber: 'VCH-2026-821',
      isAutoReconciled: true
    },
    terms: '1. Standard terms.'
  },
  {
    id: 'INV-2026-081',
    invoiceNumber: 'INV-2026-081',
    docType: 'TAX INVOICE',
    docCategory: 'ORIGINAL FOR RECIPIENT',
    issueDate: '2026-07-12',
    issueTime: '10:00 AM',
    dueDate: '2026-07-27',
    customerId: 'cust-2',
    customerName: 'Mahindra Logistics Ltd',
    customerGstin: '27AABCM6543D1ZT',
    customerAddress: 'Logistics Park, Phase 2, Viman Nagar, Pune, MH - 411014',
    dispatchAddress: 'Mahindra Logistics Park, Phase 2, Pune, MH - 411014',
    placeOfSupply: '27 - Maharashtra',
    stateCode: '27',
    reverseCharge: 'No',
    isEInvoiced: true,
    irn: '9e00a883a5a03a8b58a8569a8745a5a069d7a3b486a89f5a4a3e7b4658916487',
    status: 'PAID',
    items: [
      {
        id: 'item-1',
        name: 'Industrial ERP Consultation',
        description: 'HSN 998313 • Phase 1 ERP Architecture Blueprint',
        hsn: '998313',
        quantity: 2,
        unit: 'Session',
        rate: 45000,
        discountPercent: 0,
        taxableAmount: 90000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 8100,
        sgstAmount: 8100,
        igstAmount: 0,
        total: 106200
      }
    ],
    taxableSubtotal: 90000.00,
    cgstTotal: 8100.00,
    sgstTotal: 8100.00,
    igstTotal: 0,
    roundOff: 0.00,
    grandTotal: 106200.00,
    amountInWords: 'One Lakh Six Thousand Two Hundred Rupees Only',
    paidAmount: 106200.00,
    dueAmount: 0,
    settlementDetails: {
      isSettled: true,
      settlementDate: '15 Jul 2026, 11:30 AM',
      paymentMode: 'Direct NEFT',
      referenceNumber: 'MAHIN-JUL-771',
      voucherNumber: 'VCH-2026-810',
      isAutoReconciled: true
    },
    terms: '1. Standard terms.'
  }
];

const defaultPaymentReceipts = [
  {
    id: 'REC-2026-001',
    receiptNumber: 'REC-2026-001',
    date: '2026-11-12',
    customerId: 'cust-1',
    customerName: 'Reliance Retail Limited',
    amount: 118000.00,
    paymentMode: 'Net Banking',
    accountName: 'HDFC Corporate Current A/c - 502000124509',
    referenceNumber: 'HDFC-N84910294',
    status: 'Settled',
    settledInvoices: [
      { invoiceId: 'INV-2026-087', allocatedAmount: 118000.00 }
    ],
    isAdvance: false,
    hasTds: false,
    tdsAmount: 0,
    notes: 'Received via corporate NEFT against Invoice INV-2026-087'
  },
  {
    id: 'REC-2026-002',
    receiptNumber: 'REC-2026-002',
    date: '2026-11-07',
    customerId: 'cust-2',
    customerName: 'Mahindra Logistics Limited',
    amount: 47200.00,
    paymentMode: 'UPI',
    accountName: 'ICICI Corporate Current A/c - 001105008912',
    referenceNumber: 'UPI-MAHIN-9082103',
    status: 'Settled',
    settledInvoices: [
      { invoiceId: 'INV-2026-089', allocatedAmount: 47200.00 }
    ],
    isAdvance: false,
    hasTds: false,
    tdsAmount: 0,
    notes: 'Direct QR UPI merchant receipt'
  },
  {
    id: 'REC-2026-003',
    receiptNumber: 'REC-2026-003',
    date: '2026-11-03',
    customerId: 'cust-3',
    customerName: 'Tata Consultancy Services Ltd',
    amount: 236000.00,
    paymentMode: 'Net Banking',
    accountName: 'HDFC Corporate Current A/c - 502000124509',
    referenceNumber: 'TCS-FIN-982110',
    status: 'Settled',
    settledInvoices: [
      { invoiceId: 'INV-2026-088', allocatedAmount: 236000.00 }
    ],
    isAdvance: false,
    hasTds: false,
    tdsAmount: 0,
    notes: 'Corporate RTGS credit for SLA Cloud services'
  },
  {
    id: 'REC-2026-004',
    receiptNumber: 'REC-2026-004',
    date: '2026-11-01',
    customerId: 'cust-4',
    customerName: 'Infosys Technologies Limited',
    amount: 50000.00,
    paymentMode: 'Cheque',
    accountName: 'State Bank of India - 30894561023',
    referenceNumber: 'CHQ-881290',
    status: 'Partially Settled',
    settledInvoices: [
      { invoiceId: 'INV-2026-086', allocatedAmount: 50000.00 }
    ],
    isAdvance: false,
    hasTds: false,
    tdsAmount: 0,
    notes: 'Cheque #881290 drawn on SBI cleared'
  },
  {
    id: 'REC-2026-005',
    receiptNumber: 'REC-2026-005',
    date: '2026-10-26',
    customerId: 'cust-5',
    customerName: 'Bharti Airtel Limited',
    amount: 25000.00,
    paymentMode: 'Cash',
    accountName: 'Cash Account',
    referenceNumber: 'CSH-VCH-1029',
    status: 'Advance',
    settledInvoices: [],
    isAdvance: true,
    hasTds: false,
    tdsAmount: 0,
    notes: 'Advance deposit held for upcoming project'
  }
];

const defaultRefundVouchers = [
  {
    id: 'RV-2026-001',
    voucherNumber: 'RV-2026-001',
    date: '2026-11-05',
    customerId: 'cust-5',
    customerName: 'Bharti Airtel Limited',
    amount: 10000.00,
    paidFrom: 'Cash Account',
    paymentMode: 'Cash',
    referenceNumber: 'REF-CSH-9812',
    notes: 'Refund of excess advance security deposit on hardware procurement.',
    status: 'Completed'
  }
];

const defaultTdsVouchers = [
  {
    id: 'TDS-2026-001',
    voucherNumber: 'TDS-2026-001',
    date: '2026-11-08',
    customerId: 'cust-3',
    customerName: 'Tata Consultancy Services Ltd',
    amount: 23600.00,
    tdsSection: '194J - Professional / Technical Services (10%)',
    tdsRate: 10,
    settledInvoices: [
      { invoiceId: 'INV-2026-088', allocatedTds: 23600.00 }
    ],
    notes: 'TDS certificate Form 16A reconciliation for Q3.',
    status: 'Recorded'
  },
  {
    id: 'TDS-2026-002',
    voucherNumber: 'TDS-2026-002',
    date: '2026-10-30',
    customerId: 'cust-4',
    customerName: 'Infosys Technologies Limited',
    amount: 5000.00,
    tdsSection: '194J - Professional / Technical Services (10%)',
    tdsRate: 10,
    settledInvoices: [
      { invoiceId: 'INV-2026-086', allocatedTds: 5000.00 }
    ],
    notes: '26AS credit match on milestone 1 billing.',
    status: 'Recorded'
  }
];

const defaultProformaInvoices = [
  {
    id: 'PI-2026-001',
    proformaNumber: 'PI-2026-001',
    proformaType: 'DOMESTIC',
    date: '2026-11-13',
    dueDate: '2026-11-28',
    customerId: 'cust-3',
    customerName: 'Tata Consultancy Services Ltd',
    customerGstin: '27AAACT2727Q1ZW',
    customerAddress: 'TCS House, Raveline Street, Fort, Mumbai, MH - 400001',
    stateCode: '27',
    placeOfSupply: '27 - Maharashtra',
    status: 'OPEN',
    items: [
      {
        id: 'pi-item-1',
        name: 'Enterprise Cloud Server Hosting',
        description: 'Annual SLA License, Dedicated CPU & Cloud Storage',
        hsn: '998315',
        quantity: 2,
        unit: 'Unit',
        rate: 45000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 90000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 8100,
        sgstAmount: 8100,
        igstAmount: 0,
        total: 106200
      }
    ],
    taxableSubtotal: 90000,
    cgstTotal: 8100,
    sgstTotal: 8100,
    igstTotal: 0,
    otherCharges: 0,
    invoiceDiscount: 0,
    roundOff: 0,
    grandTotal: 106200,
    amountInWords: 'One Lakh Six Thousand Two Hundred Rupees Only',
    transportation: {
      mode: 'Road',
      lrNumber: 'LR-99823',
      lrDate: '2026-11-13',
      vehicleNo: 'MH-04-AB-1234',
      approxDistance: 120,
      transporterName: 'V-Trans Logistics',
      placeOfSupply: '27 - Maharashtra',
      dateOfSupply: '2026-11-14',
      supplyType: 'B2B'
    },
    otherDetails: {
      poNumber: 'PO-TCS-2026-88',
      poDate: '2026-11-10',
      challanNumber: 'DC-8841',
      ewaybillNumber: '241088764210',
      salesPerson: 'Rahul Sharma',
      dueDate: '2026-11-28',
      reverseCharge: false,
      customFields: []
    },
    terms: '1. This is an electronically generated proforma invoice.<br> 2. All disputes are subject to seller city jurisdiction.',
    signatureStamp: {
      enabled: true
    }
  },
  {
    id: 'PI-2026-002',
    proformaNumber: 'PI-2026-002',
    proformaType: 'DOMESTIC',
    date: '2026-11-11',
    dueDate: '2026-11-26',
    customerId: 'cust-1',
    customerName: 'Reliance Industries Limited',
    customerGstin: '27AAACR7108C1ZP',
    customerAddress: 'Maker Chambers IV, 222 Nariman Point, Mumbai, MH - 400021',
    stateCode: '27',
    placeOfSupply: '27 - Maharashtra',
    status: 'OPEN',
    items: [
      {
        id: 'pi-item-1',
        name: 'GST Automated e-Invoicing API Gateway',
        description: 'Integration Pack (10k docs) with real-time IRN generation',
        hsn: '998313',
        quantity: 4,
        unit: 'Packs',
        rate: 10000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 40000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 3600,
        sgstAmount: 3600,
        igstAmount: 0,
        total: 47200
      },
      {
        id: 'pi-item-2',
        name: 'Compliance Onboarding & Training Session',
        description: 'Certified CA Consultation & Staff Onboarding',
        hsn: '998319',
        quantity: 1,
        unit: 'Session',
        rate: 5000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 5000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 450,
        sgstAmount: 450,
        igstAmount: 0,
        total: 5900
      }
    ],
    taxableSubtotal: 45000,
    cgstTotal: 4050,
    sgstTotal: 4050,
    igstTotal: 0,
    otherCharges: 0,
    invoiceDiscount: 0,
    roundOff: 0,
    grandTotal: 53100,
    amountInWords: 'Fifty Three Thousand One Hundred Rupees Only',
    transportation: {
      mode: 'Road',
      lrNumber: 'LR-99824',
      lrDate: '2026-11-11',
      vehicleNo: 'MH-01-XY-5678',
      approxDistance: 45,
      transporterName: 'Blue Dart Surface',
      placeOfSupply: '27 - Maharashtra',
      dateOfSupply: '2026-11-12',
      supplyType: 'B2B'
    },
    otherDetails: {
      poNumber: 'RIL-PO-2026-904',
      poDate: '2026-11-09',
      challanNumber: 'DC-8842',
      ewaybillNumber: '241088764211',
      salesPerson: 'Pooja Nair',
      dueDate: '2026-11-26',
      reverseCharge: false,
      customFields: []
    },
    terms: '1. This is an electronically generated proforma invoice.<br> 2. All disputes are subject to seller city jurisdiction.',
    signatureStamp: {
      enabled: true
    }
  }
];

const defaultDeliveryChallans = [
  {
    id: 'DC-2026-001',
    challanNumber: 'DC-2026-001',
    direction: 'OUTWARD',
    challanType: 'Job work',
    date: '2026-11-12',
    customerId: 'cust-2',
    customerName: 'Mahindra Logistics Ltd',
    customerGstin: '27AABCM6543D1ZT',
    customerAddress: 'Logistics Park, Phase 2, Viman Nagar, Pune, MH - 411014',
    stateCode: '27',
    placeOfSupply: '27 - Maharashtra',
    status: 'DELIVERED',
    items: [
      {
        id: 'dc-item-1',
        name: 'Network Firewall Appliance (10Gbps)',
        description: 'Hardware security gateway for Pune logistics branch',
        hsn: '8517',
        quantity: 2,
        unit: 'Unit',
        rate: 32000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 64000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 5760,
        sgstAmount: 5760,
        igstAmount: 0,
        total: 75520
      }
    ],
    taxableSubtotal: 64000,
    cgstTotal: 5760,
    sgstTotal: 5760,
    igstTotal: 0,
    otherCharges: 0,
    challanDiscount: 0,
    roundOff: 0,
    grandTotal: 75520,
    amountInWords: 'Seventy Five Thousand Five Hundred and Twenty Rupees Only',
    transportation: {
      mode: 'Road',
      lrNumber: 'LR-DC-1092',
      lrDate: '2026-11-12',
      vehicleNo: 'MH-12-PQ-8910',
      approxDistance: 140,
      transporterName: 'V-Trans Logistics',
      placeOfSupply: '27 - Maharashtra',
      dateOfSupply: '2026-11-12',
      supplyType: 'Job work'
    },
    otherDetails: {
      poNumber: 'PO-MAH-9921',
      poDate: '2026-11-10',
      challanRefNo: 'REF-DC-1092',
      ewaybillNumber: '241088764210',
      salesPerson: 'Rahul Sharma'
    },
    terms: '1. This is an electronically generated delivery challan under Rule 55 of CGST Rules.<br>2. All disputes are subject to buyer city jurisdiction.'
  },
  {
    id: 'DC-2026-002',
    challanNumber: 'DC-2026-002',
    direction: 'OUTWARD',
    challanType: 'Supply on Approval',
    date: '2026-11-10',
    customerId: 'cust-1',
    customerName: 'Reliance Industries Limited',
    customerGstin: '27AAACR7108C1ZP',
    customerAddress: 'Maker Chambers IV, 222 Nariman Point, Mumbai, MH - 400021',
    stateCode: '27',
    placeOfSupply: '27 - Maharashtra',
    status: 'UNDELIVERED',
    items: [
      {
        id: 'dc-item-1',
        name: 'Hardware Setup & Installation',
        description: 'Server config peripheral evaluation batch',
        hsn: '8471',
        quantity: 4,
        unit: 'Unit',
        rate: 12500,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 50000,
        gstRate: 18,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 4500,
        sgstAmount: 4500,
        igstAmount: 0,
        total: 59000
      }
    ],
    taxableSubtotal: 50000,
    cgstTotal: 4500,
    sgstTotal: 4500,
    igstTotal: 0,
    otherCharges: 0,
    challanDiscount: 0,
    roundOff: 0,
    grandTotal: 59000,
    amountInWords: 'Fifty Nine Thousand Rupees Only',
    transportation: {
      mode: 'Road',
      lrNumber: 'LR-DC-1093',
      lrDate: '2026-11-10',
      vehicleNo: 'MH-01-XY-5678',
      approxDistance: 35,
      transporterName: 'Blue Dart Surface',
      placeOfSupply: '27 - Maharashtra',
      dateOfSupply: '2026-11-10',
      supplyType: 'SKD/CKD/Lots'
    },
    otherDetails: {
      poNumber: 'PO-RIL-8841',
      poDate: '2026-11-09',
      challanRefNo: 'REF-DC-1093',
      ewaybillNumber: '241088764211',
      salesPerson: 'Pooja Nair'
    },
    terms: '1. Goods dispatched on approval/trial basis for 14 days.<br>2. Subject to final tax invoice conversion upon acceptance.'
  },
  {
    id: 'DC-2026-003',
    challanNumber: 'DC-2026-003',
    direction: 'INWARD',
    challanType: 'Others',
    date: '2026-11-05',
    customerId: 'cust-4',
    customerName: 'Infosys Technologies Limited',
    customerGstin: '29AAACI4740D1ZT',
    customerAddress: 'Electronics City, Hosur Road, Bengaluru, Karnataka - 560100',
    stateCode: '29',
    placeOfSupply: '29 - Karnataka',
    status: 'RETURNED',
    items: [
      {
        id: 'dc-item-1',
        name: 'Annual Software Maintenance Contract',
        description: 'Test lab hardware return under warranty',
        hsn: '9987',
        quantity: 1,
        unit: 'Unit',
        rate: 20000,
        taxType: 'Exclusive',
        discountPercent: 0,
        taxableAmount: 20000,
        gstRate: 18,
        cgstRate: 0,
        sgstRate: 0,
        igstRate: 18,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 3600,
        total: 23600
      }
    ],
    taxableSubtotal: 20000,
    cgstTotal: 0,
    sgstTotal: 0,
    igstTotal: 3600,
    otherCharges: 0,
    challanDiscount: 0,
    roundOff: 0,
    grandTotal: 23600,
    amountInWords: 'Twenty Three Thousand Six Hundred Rupees Only',
    transportation: {
      mode: 'Air',
      lrNumber: 'AWB-778210',
      lrDate: '2026-11-05',
      vehicleNo: 'AI-Air-Cargo',
      approxDistance: 980,
      transporterName: 'Air India Cargo',
      placeOfSupply: '29 - Karnataka',
      dateOfSupply: '2026-11-05',
      supplyType: 'Others'
    },
    otherDetails: {
      poNumber: 'RMA-INF-881',
      poDate: '2026-11-04',
      challanRefNo: 'REF-DC-1080',
      ewaybillNumber: '241088764205',
      salesPerson: 'Amit Verma'
    },
    terms: '1. Inward return of test hardware under warranty replacement.<br>2. Goods inspected and returned to store.'
  }
];

const defaultEwaybills = [
  {
    id: 'EWB-241088764209',
    ewbNumber: '241088764209',
    date: '2026-11-11 11:30 AM',
    docType: 'Tax Invoice',
    docNo: 'SSS/INV/26-27/345',
    fromGstin: '33BZRPS8264H1ZN',
    fromTradeName: 'SASMITH TRADERS (Coimbatore)',
    toGstin: 'URP',
    toTradeName: 'Mr. Kanthasamy',
    toPlace: 'Annur, Coimbatore, Tamil Nadu',
    distance: 25,
    vehicleNo: 'TN66K4834',
    mode: 'Road',
    validUntil: '2026-11-13 11:59 PM',
    status: 'ACTIVE',
    totalValue: 16415.00
  },
  {
    id: 'EWB-241088764210',
    ewbNumber: '241088764210',
    date: '2026-11-13 10:30 AM',
    docType: 'Tax Invoice',
    docNo: 'INV-2026-089',
    fromGstin: '33BZRPS8264H1ZN',
    fromTradeName: 'SASMITH TRADERS',
    toGstin: '27AABCR1234F1ZX',
    toTradeName: 'Reliance Retail Limited',
    toPlace: 'Mumbai, Maharashtra',
    distance: 120,
    vehicleNo: 'MH-04-AB-1234',
    mode: 'Road',
    validUntil: '2026-11-15 11:59 PM',
    status: 'ACTIVE',
    totalValue: 90860.00
  },
  {
    id: 'EWB-241088764211',
    ewbNumber: '241088764211',
    date: '2026-11-12 02:15 PM',
    docType: 'Delivery Challan',
    docNo: 'DC-2026-001',
    fromGstin: '27AAAAA0000A1Z5',
    fromTradeName: 'Apex Enterprise (Mumbai)',
    toGstin: '27AABCM6543D1ZT',
    toTradeName: 'Mahindra Logistics Ltd',
    toPlace: 'Pune, Maharashtra',
    distance: 140,
    vehicleNo: 'MH-12-PQ-8910',
    mode: 'Road',
    validUntil: '2026-11-14 11:59 PM',
    status: 'ACTIVE',
    totalValue: 75520.00
  }
];

const defaultBankAccounts = [
  {
    id: 'acc_hdfc_1',
    type: 'BANK',
    name: 'HDFC Bank',
    isDefault: true,
    subtitle: 'Current Account - ANNUR Branch',
    accountHolder: 'SASMITH TRADERS',
    accountNumber: '50200062410936',
    ifsc: 'HDFC0008753',
    branchName: 'ANNUR',
    openingBalance: 16415,
    openingBalanceDate: '2026-11-11',
    amountInBank: 16415,
    amountInGimbooks: 16415,
    uncategorizedCount: 0,
    iban: '',
    swift: ''
  },
  {
    id: 'acc_cash_1',
    type: 'CASH',
    name: 'Cash',
    isDefault: false,
    subtitle: 'Cash account',
    accountHolder: 'SASMITH TRADERS',
    accountNumber: '',
    ifsc: '',
    branchName: '',
    openingBalance: 0,
    openingBalanceDate: '2026-11-14',
    amountInBank: 0,
    amountInGimbooks: 0,
    uncategorizedCount: 0,
    iban: '',
    swift: ''
  }
];

class GSTStore {
  constructor() {
    this.seller = defaultSeller;
    this.customers = [...defaultCustomers];
    this.catalog = [...defaultCatalog];
    this.purchases = [...defaultPurchases];
    this.invoices = [...defaultInvoices];
    this.quotations = [...defaultQuotations];
    this.paymentReceipts = [...defaultPaymentReceipts];
    this.refundVouchers = [...defaultRefundVouchers];
    this.tdsVouchers = [...defaultTdsVouchers];
    this.proformaInvoices = [...defaultProformaInvoices];
    this.deliveryChallans = [...defaultDeliveryChallans];
    this.bankAccounts = [...defaultBankAccounts];
    this.bankingFilter = 'ALL';
    this.bankingSearch = '';
    this.bankingTimeRange = '30';
    this.bankingChartHidden = false;
    this.ewaybills = [...defaultEwaybills];
    this.ewaybillLoggedIn = false;
    this.activeFilter = 'ALL';
    this.quotationFilter = 'ALL';
    this.receiptFilter = 'ALL';
    this.deliveryChallanFilter = 'ALL';
    this.searchQuery = '';
    this.quotationSearch = '';
    this.receiptSearch = '';
    this.refundSearch = '';
    this.tdsSearch = '';
    this.proformaSearch = '';
    this.deliveryChallanSearch = '';
    this.sortBy = 'DATE_DESC';
    this.quotationSortBy = 'DATE_DESC';
    this.receiptSortBy = 'DATE_DESC';
    this.proformaSortBy = 'DATE_DESC';
    this.deliveryChallanSortBy = 'DATE_DESC';
    this.dateRangeFilter = 'ALL'; // ALL, TODAY, THIS_MONTH, LAST_MONTH, Q1, Q2, Q3, FY
    this.chartPeriod = 'monthly'; // monthly, quarterly
    this.selectedInvoices = new Set();
    this.activeInvoiceId = 'SSS-INV-26-27-345';
    this.activeQuotationId = 'QT-2026-041';
    this.activeReceiptId = 'REC-2026-001';
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(GST_STORE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.invoices && parsed.invoices.length > 0) {
          this.invoices = parsed.invoices;
        }
        if (parsed.quotations && parsed.quotations.length > 0) {
          this.quotations = parsed.quotations;
        }
        if (parsed.paymentReceipts && parsed.paymentReceipts.length > 0) {
          this.paymentReceipts = parsed.paymentReceipts;
        }
        if (parsed.refundVouchers && parsed.refundVouchers.length > 0) {
          this.refundVouchers = parsed.refundVouchers;
        }
        if (parsed.tdsVouchers && parsed.tdsVouchers.length > 0) {
          this.tdsVouchers = parsed.tdsVouchers;
        }
        if (parsed.proformaInvoices && parsed.proformaInvoices.length > 0) {
          this.proformaInvoices = parsed.proformaInvoices;
        }
        if (parsed.deliveryChallans && parsed.deliveryChallans.length > 0) {
          this.deliveryChallans = parsed.deliveryChallans;
        }
        if (parsed.ewaybills && parsed.ewaybills.length > 0) {
          this.ewaybills = parsed.ewaybills;
        }
        if (parsed.ewaybillLoggedIn !== undefined) {
          this.ewaybillLoggedIn = parsed.ewaybillLoggedIn;
        }
        if (parsed.customers && parsed.customers.length > 0) {
          this.customers = parsed.customers;
        }
        if (parsed.catalog && parsed.catalog.length > 0) {
          this.catalog = parsed.catalog;
        }
        if (parsed.purchases && parsed.purchases.length > 0) {
          this.purchases = parsed.purchases;
        }
        if (parsed.bankAccounts && parsed.bankAccounts.length > 0) {
          this.bankAccounts = parsed.bankAccounts;
        }
        if (parsed.seller) {
          if (parsed.seller.companyName === 'SASMITH TRADERS') {
            this.seller = parsed.seller;
          } else {
            this.seller = defaultSeller;
          }
        }
        // Ensure flagship defaults exist
        if (!this.invoices.some(inv => inv.id === 'SSS-INV-26-27-345')) {
          this.invoices.unshift(defaultInvoices[0]);
        }
        if (!this.customers.some(c => c.id === 'cust-kanthasamy')) {
          this.customers.unshift(defaultCustomers[0]);
        }
        if (!this.bankAccounts.some(b => b.accountNumber === '50200062410936')) {
          this.bankAccounts.unshift(defaultBankAccounts[0]);
        }
        if (!this.catalog.some(p => p.id === 'prod-waste-fiber')) {
          this.catalog.unshift(defaultCatalog[0]);
        }
      }
    } catch (e) {
      console.warn('Failed to load from localStorage:', e);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(
        GST_STORE_KEY,
        JSON.stringify({
          seller: this.seller,
          customers: this.customers,
          catalog: this.catalog,
          purchases: this.purchases,
          invoices: this.invoices,
          quotations: this.quotations,
          paymentReceipts: this.paymentReceipts,
          refundVouchers: this.refundVouchers,
          tdsVouchers: this.tdsVouchers,
          proformaInvoices: this.proformaInvoices,
          deliveryChallans: this.deliveryChallans,
          bankAccounts: this.bankAccounts,
          ewaybills: this.ewaybills,
          ewaybillLoggedIn: this.ewaybillLoggedIn
        })
      );

      // Debounced live cloud synchronization with MongoDB / Supabase
      if (typeof window !== 'undefined' && typeof window.syncLocalToCloud === 'function') {
        if (this._syncTimeout) clearTimeout(this._syncTimeout);
        this._syncTimeout = setTimeout(() => {
          window.syncLocalToCloud();
        }, 1200);
      } else if (typeof window !== 'undefined' && window.isCloudConnected && typeof window.syncLocalToSupabase === 'function') {
        if (this._syncTimeout) clearTimeout(this._syncTimeout);
        this._syncTimeout = setTimeout(() => {
          window.syncLocalToSupabase();
        }, 1200);
      }
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  resetToDefault() {
    this.seller = { ...defaultSeller };
    this.customers = [...defaultCustomers];
    this.catalog = [...defaultCatalog];
    this.purchases = [...defaultPurchases];
    this.invoices = [...defaultInvoices];
    this.quotations = [...defaultQuotations];
    this.paymentReceipts = [...defaultPaymentReceipts];
    this.refundVouchers = [...defaultRefundVouchers];
    this.tdsVouchers = [...defaultTdsVouchers];
    this.proformaInvoices = [...defaultProformaInvoices];
    this.deliveryChallans = [...defaultDeliveryChallans];
    this.bankAccounts = [...defaultBankAccounts];
    this.bankingFilter = 'ALL';
    this.bankingSearch = '';
    this.bankAccounts = [...defaultBankAccounts];
    this.bankingFilter = 'ALL';
    this.bankingSearch = '';
    this.bankingTimeRange = '30';
    this.bankingChartHidden = false;
    this.ewaybills = [...defaultEwaybills];
    this.ewaybillLoggedIn = false;
    this.selectedInvoices.clear();
    this.activeFilter = 'ALL';
    this.quotationFilter = 'ALL';
    this.receiptFilter = 'ALL';
    this.deliveryChallanFilter = 'ALL';
    this.searchQuery = '';
    this.quotationSearch = '';
    this.receiptSearch = '';
    this.refundSearch = '';
    this.tdsSearch = '';
    this.proformaSearch = '';
    this.deliveryChallanSearch = '';
    this.saveToStorage();
  }

  getFilteredInvoices() {
    return this.invoices.filter(inv => {
      // Status tab
      if (this.activeFilter === 'UNPAID') {
        if (inv.status !== 'UNPAID' && inv.status !== 'OVERDUE') return false;
      } else if (this.activeFilter === 'PAID') {
        if (inv.status !== 'PAID') return false;
      } else if (this.activeFilter === 'PARTIALLY_PAID') {
        if (inv.status !== 'PARTIALLY_PAID') return false;
      } else if (this.activeFilter === 'OVERDUE') {
        if (inv.status !== 'OVERDUE') return false;
      } else if (this.activeFilter === 'DRAFT') {
        if (inv.status !== 'DRAFT') return false;
      }

      // Date Range Filter
      if (this.dateRangeFilter !== 'ALL') {
        const invDate = new Date(inv.issueDate);
        const now = new Date();
        if (this.dateRangeFilter === 'THIS_MONTH') {
          if (invDate.getMonth() !== now.getMonth() || invDate.getFullYear() !== now.getFullYear()) return false;
        } else if (this.dateRangeFilter === 'Q3') {
          // Q3: Oct, Nov, Dec
          const m = invDate.getMonth();
          if (m !== 9 && m !== 10 && m !== 11) return false;
        } else if (this.dateRangeFilter === 'Q2') {
          // Q2: Jul, Aug, Sep
          const m = invDate.getMonth();
          if (m !== 6 && m !== 7 && m !== 8) return false;
        }
      }

      // Search query
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        const matchesInv = inv.invoiceNumber.toLowerCase().includes(q);
        const matchesCust = inv.customerName.toLowerCase().includes(q);
        const matchesGstin = (inv.customerGstin || '').toLowerCase().includes(q);
        const matchesIrn = (inv.irn || '').toLowerCase().includes(q);
        if (!matchesInv && !matchesCust && !matchesGstin && !matchesIrn) return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.sortBy === 'DATE_DESC') {
        return new Date(b.issueDate) - new Date(a.issueDate);
      } else if (this.sortBy === 'DATE_ASC') {
        return new Date(a.issueDate) - new Date(b.issueDate);
      } else if (this.sortBy === 'AMOUNT_DESC') {
        return b.grandTotal - a.grandTotal;
      } else if (this.sortBy === 'AMOUNT_ASC') {
        return a.grandTotal - b.grandTotal;
      } else if (this.sortBy === 'CUSTOMER_ASC') {
        return a.customerName.localeCompare(b.customerName);
      }
      return 0;
    });
  }

  getMetrics() {
    const totalCount = this.invoices.length;
    let totalSales = 0;
    let unpaidTotal = 0;
    let unpaidCount = 0;
    let paidTotal = 0;
    let paidCount = 0;
    let partialTotal = 0;
    let partialCount = 0;
    let overdueCount = 0;
    let totalGstCollected = 0;

    this.invoices.forEach(inv => {
      totalSales += inv.grandTotal;
      totalGstCollected += (inv.cgstTotal || 0) + (inv.sgstTotal || 0) + (inv.igstTotal || 0);

      if (inv.status === 'PAID') {
        paidTotal += inv.grandTotal;
        paidCount++;
      } else if (inv.status === 'PARTIALLY_PAID') {
        partialTotal += (inv.dueAmount || (inv.grandTotal - (inv.paidAmount || 0)));
        partialCount++;
      } else if (inv.status === 'UNPAID') {
        unpaidTotal += inv.grandTotal;
        unpaidCount++;
      } else if (inv.status === 'OVERDUE') {
        unpaidTotal += inv.grandTotal;
        unpaidCount++;
        overdueCount++;
      }
    });

    // Purchases & ITC Telemetry
    let totalPurchases = 0;
    let claimableItc = 0;
    this.purchases.forEach(p => {
      totalPurchases += p.amount;
      claimableItc += p.itc;
    });

    const netGstLiability = Math.max(0, totalGstCollected - claimableItc);

    return {
      totalCount,
      totalSales,
      unpaidTotal,
      unpaidCount,
      paidTotal,
      paidCount,
      partialTotal,
      partialCount,
      overdueCount,
      totalGstCollected,
      totalPurchases,
      claimableItc,
      netGstLiability
    };
  }

  // DYNAMIC CHART AGGREGATIONS (Directly computed from invoices database!)
  getMonthlyTurnover() {
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    const monthMap = { '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov' };
    const totals = { Jun: 920000, Jul: 106200, Aug: 159300, Sep: 212400, Oct: 247800, Nov: 0 };

    this.invoices.forEach(inv => {
      const parts = inv.issueDate.split('-');
      if (parts.length >= 2) {
        const mCode = parts[1];
        const mName = monthMap[mCode];
        if (mName) {
          if (mName === 'Nov') {
            totals.Nov += inv.grandTotal;
          }
        }
      }
    });

    const maxVal = Math.max(...Object.values(totals), 500000);
    return months.map(m => ({
      month: m,
      total: totals[m],
      formatted: (totals[m] / 100000).toFixed(1) + 'L',
      heightPercent: Math.min(100, Math.round((totals[m] / maxVal) * 90))
    }));
  }

  getQuarterlyTurnover() {
    let q1 = 1420000;
    let q2 = 850000;
    let q3 = 0;

    this.invoices.forEach(inv => {
      const parts = inv.issueDate.split('-');
      if (parts.length >= 2) {
        const m = parseInt(parts[1], 10);
        if (m >= 10 && m <= 12) q3 += inv.grandTotal;
      }
    });

    const maxVal = Math.max(q1, q2, q3);
    return [
      { label: 'Q1 (Apr-Jun)', total: q1, formatted: (q1 / 100000).toFixed(1) + 'L', heightPercent: Math.round((q1 / maxVal) * 90) },
      { label: 'Q2 (Jul-Sep)', total: q2, formatted: (q2 / 100000).toFixed(1) + 'L', heightPercent: Math.round((q2 / maxVal) * 90) },
      { label: 'Q3 (Oct-Dec)', total: q3, formatted: (q3 / 100000).toFixed(1) + 'L', heightPercent: Math.round((q3 / maxVal) * 90) }
    ];
  }

  getInvoiceById(id) {
    return this.invoices.find(inv => inv.id === id || inv.invoiceNumber === id) || this.invoices[0];
  }

  getNextInvoiceNumber() {
    const nums = this.invoices
      .map(inv => {
        const m = inv.invoiceNumber.match(/INV-2026-(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      })
      .filter(n => !isNaN(n));
    const maxNum = nums.length > 0 ? Math.max(...nums) : 90;
    return `INV-2026-${String(maxNum + 1).padStart(3, '0')}`;
  }

  generateIrnHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  }

  addInvoice(newInv) {
    if (!newInv.irn) {
      newInv.irn = this.generateIrnHash();
    }
    this.invoices.unshift(newInv);
    this.activeInvoiceId = newInv.id;
    this.saveToStorage();
    return newInv;
  }

  duplicateInvoice(id) {
    const original = this.getInvoiceById(id);
    if (!original) return null;
    const newNumber = this.getNextInvoiceNumber();
    const cloned = JSON.parse(JSON.stringify(original));
    cloned.id = newNumber;
    cloned.invoiceNumber = newNumber;
    cloned.issueDate = new Date().toISOString().split('T')[0];
    cloned.issueTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    cloned.status = 'DRAFT';
    cloned.paidAmount = 0;
    cloned.dueAmount = cloned.grandTotal;
    cloned.settlementDetails = null;
    cloned.irn = this.generateIrnHash();
    this.invoices.unshift(cloned);
    this.activeInvoiceId = cloned.id;
    this.saveToStorage();
    return cloned;
  }

  deleteInvoice(id) {
    this.invoices = this.invoices.filter(inv => inv.id !== id);
    if (this.selectedInvoices.has(id)) {
      this.selectedInvoices.delete(id);
    }
    if (this.activeInvoiceId === id) {
      this.activeInvoiceId = this.invoices[0] ? this.invoices[0].id : null;
    }
    this.saveToStorage();
  }

  // DYNAMIC RECORD PAYMENT (Partial or Full Payment)
  recordPayment(id, amount, paymentMode = 'Direct NEFT / Bank', refNumber = `REF-${Math.floor(100000 + Math.random() * 900000)}`) {
    const inv = this.getInvoiceById(id);
    if (!inv) return;
    
    const payVal = parseFloat(amount) || inv.dueAmount || inv.grandTotal;
    const currentPaid = inv.paidAmount || 0;
    const newPaid = Math.min(inv.grandTotal, currentPaid + payVal);
    const newDue = Math.max(0, inv.grandTotal - newPaid);

    inv.paidAmount = newPaid;
    inv.dueAmount = newDue;

    if (newDue <= 0) {
      inv.status = 'PAID';
    } else {
      inv.status = 'PARTIALLY_PAID';
    }

    inv.settlementDetails = {
      isSettled: newDue <= 0,
      settlementDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      paymentMode: paymentMode,
      referenceNumber: refNumber,
      voucherNumber: `VCH-2026-${Math.floor(800 + Math.random() * 200)}`,
      isAutoReconciled: true,
      lastPaymentAmount: payVal
    };

    this.saveToStorage();
    return inv;
  }

  markAsPaid(id, paymentMode = 'Direct NEFT / Bank', refNumber = `REF-${Math.floor(100000 + Math.random() * 900000)}`) {
    const inv = this.getInvoiceById(id);
    if (!inv) return;
    return this.recordPayment(id, inv.dueAmount || inv.grandTotal, paymentMode, refNumber);
  }

  // DYNAMIC CUSTOMER ADDITION
  addCustomer(customerData) {
    const id = `cust-${Date.now()}`;
    const newCust = {
      id: id,
      name: customerData.name,
      gstin: customerData.gstin.toUpperCase(),
      state: customerData.state || 'Maharashtra',
      stateCode: customerData.stateCode || customerData.gstin.substring(0, 2) || '27',
      address: customerData.address || '',
      dispatchAddress: customerData.dispatchAddress || customerData.address || '',
      category: customerData.category || 'Regular Taxpayer',
      contactPerson: customerData.contactPerson || '',
      email: customerData.email || '',
      phone: customerData.phone || ''
    };
    this.customers.push(newCust);
    this.saveToStorage();
    return newCust;
  }

  // ==========================================
  // QUOTATION MANAGEMENT METHODS
  // ==========================================
  getQuotationById(id) {
    return this.quotations.find(q => q.id === id || q.quotationNumber === id);
  }

  getQuotationMetrics() {
    let allCount = this.quotations.length;
    let allTotal = 0;
    let pendingCount = 0;
    let pendingTotal = 0;
    let acceptedCount = 0;
    let acceptedTotal = 0;
    let cancelledCount = 0;
    let cancelledTotal = 0;

    this.quotations.forEach(q => {
      const amt = Number(q.grandTotal) || 0;
      allTotal += amt;
      if (q.status === 'PENDING') {
        pendingCount++;
        pendingTotal += amt;
      } else if (q.status === 'ACCEPTED') {
        acceptedCount++;
        acceptedTotal += amt;
      } else if (q.status === 'CANCELLED') {
        cancelledCount++;
        cancelledTotal += amt;
      }
    });

    return {
      allCount,
      allTotal,
      pendingCount,
      pendingTotal,
      acceptedCount,
      acceptedTotal,
      cancelledCount,
      cancelledTotal
    };
  }

  getFilteredQuotations() {
    return this.quotations.filter(q => {
      // Filter by tab
      if (this.quotationFilter === 'PENDING' && q.status !== 'PENDING') return false;
      if (this.quotationFilter === 'ACCEPTED' && q.status !== 'ACCEPTED') return false;
      if (this.quotationFilter === 'CANCELLED' && q.status !== 'CANCELLED') return false;

      // Filter by search
      if (this.quotationSearch.trim()) {
        const query = this.quotationSearch.toLowerCase();
        const matchNum = q.quotationNumber.toLowerCase().includes(query);
        const matchCust = q.customerName.toLowerCase().includes(query);
        const matchGstin = (q.customerGstin || '').toLowerCase().includes(query);
        const matchItem = (q.items || []).some(it => (it.name || '').toLowerCase().includes(query));
        if (!matchNum && !matchCust && !matchGstin && !matchItem) return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.quotationSortBy === 'DATE_ASC') {
        return new Date(a.date) - new Date(b.date);
      } else if (this.quotationSortBy === 'AMOUNT_DESC') {
        return b.grandTotal - a.grandTotal;
      } else if (this.quotationSortBy === 'AMOUNT_ASC') {
        return a.grandTotal - b.grandTotal;
      }
      return new Date(b.date) - new Date(a.date);
    });
  }

  getNextQuotationNumber() {
    const nums = this.quotations
      .map(q => {
        const m = q.quotationNumber.match(/QT-2026-(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      })
      .filter(n => !isNaN(n));
    const maxNum = nums.length > 0 ? Math.max(...nums) : 41;
    return `QT-2026-${String(maxNum + 1).padStart(3, '0')}`;
  }

  addQuotation(quote) {
    this.quotations.unshift(quote);
    this.activeQuotationId = quote.id;
    this.saveToStorage();
    return quote;
  }

  deleteQuotation(id) {
    this.quotations = this.quotations.filter(q => q.id !== id);
    if (this.activeQuotationId === id) {
      this.activeQuotationId = this.quotations[0] ? this.quotations[0].id : null;
    }
    this.saveToStorage();
  }

  updateQuotationStatus(id, status) {
    const quote = this.getQuotationById(id);
    if (!quote) return;
    quote.status = status;
    this.saveToStorage();
    return quote;
  }

  convertQuotationToInvoice(quoteId) {
    const quote = this.getQuotationById(quoteId);
    if (!quote) return null;

    const newInvoiceNumber = this.getNextInvoiceNumber();
    const isIntraState = quote.stateCode === this.seller.stateCode;

    const invoice = {
      id: newInvoiceNumber,
      invoiceNumber: newInvoiceNumber,
      docType: 'TAX INVOICE',
      docCategory: 'ORIGINAL FOR RECIPIENT',
      issueDate: new Date().toISOString().split('T')[0],
      issueTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      dueDate: quote.validUntil || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      customerId: quote.customerId,
      customerName: quote.customerName,
      customerGstin: quote.customerGstin,
      customerAddress: quote.customerAddress,
      dispatchAddress: quote.customerAddress,
      placeOfSupply: quote.placeOfSupply || `${quote.stateCode} - State`,
      stateCode: quote.stateCode,
      reverseCharge: 'No',
      isEInvoiced: true,
      irn: this.generateIrnHash(),
      status: 'UNPAID',
      items: (quote.items || []).map((it, idx) => {
        const taxable = it.taxableAmount || (it.quantity * it.rate);
        const gst = it.gstRate !== undefined ? it.gstRate : 18;
        return {
          id: `item-${idx + 1}`,
          name: it.name,
          description: it.description || '',
          hsn: it.hsn || '998315',
          quantity: it.quantity || 1,
          unit: it.unit || 'Unit',
          rate: it.rate || 0,
          discountPercent: it.discountPercent || 0,
          taxableAmount: taxable,
          gstRate: gst,
          cgstRate: isIntraState ? gst / 2 : 0,
          sgstRate: isIntraState ? gst / 2 : 0,
          igstRate: isIntraState ? 0 : gst,
          cgstAmount: isIntraState ? taxable * (gst / 200) : 0,
          sgstAmount: isIntraState ? taxable * (gst / 200) : 0,
          igstAmount: isIntraState ? 0 : taxable * (gst / 100),
          total: it.total || (taxable + (taxable * (gst / 100)))
        };
      }),
      taxableSubtotal: quote.taxableSubtotal,
      cgstTotal: quote.cgstTotal,
      sgstTotal: quote.sgstTotal,
      igstTotal: quote.igstTotal,
      roundOff: 0,
      grandTotal: quote.grandTotal,
      amountInWords: numberToWordsINR(quote.grandTotal),
      paidAmount: 0,
      dueAmount: quote.grandTotal,
      settlementDetails: null,
      terms: quote.terms || '1. Payment due within 15 days of invoice date.'
    };

    quote.status = 'ACCEPTED';
    this.invoices.unshift(invoice);
    this.activeInvoiceId = invoice.id;
    this.saveToStorage();
    return invoice;
  }

  // PAYMENT RECEIPTS METHODS
  getPaymentReceiptById(id) {
    return this.paymentReceipts.find(r => r.id === id || r.receiptNumber === id);
  }

  getPaymentReceiptMetrics() {
    let allCount = this.paymentReceipts.length;
    let allTotal = 0;
    let cashCount = 0, cashTotal = 0;
    let chequeCount = 0, chequeTotal = 0;
    let netBankingCount = 0, netBankingTotal = 0;
    let upiCount = 0, upiTotal = 0;
    let totalUnused = 0;

    this.paymentReceipts.forEach(r => {
      const amt = parseFloat(r.amount) || 0;
      allTotal += amt;

      const mode = (r.paymentMode || '').trim().toLowerCase();
      if (mode === 'cash') {
        cashCount++;
        cashTotal += amt;
      } else if (mode === 'cheque') {
        chequeCount++;
        chequeTotal += amt;
      } else if (mode === 'net banking' || mode === 'netbanking' || mode === 'bank transfer' || mode === 'neft' || mode === 'rtgs') {
        netBankingCount++;
        netBankingTotal += amt;
      } else if (mode === 'upi') {
        upiCount++;
        upiTotal += amt;
      }

      if (r.isAdvance || r.status === 'Advance') {
        totalUnused += amt;
      } else if (r.settledInvoices && r.settledInvoices.length > 0) {
        const settledSum = r.settledInvoices.reduce((sum, s) => sum + (parseFloat(s.allocatedAmount) || 0), 0);
        if (amt > settledSum) {
          totalUnused += (amt - settledSum);
        }
      }
    });

    return {
      allCount,
      allTotal,
      cashCount,
      cashTotal,
      chequeCount,
      chequeTotal,
      netBankingCount,
      netBankingTotal,
      upiCount,
      upiTotal,
      totalUnused
    };
  }

  getFilteredPaymentReceipts() {
    return this.paymentReceipts.filter(r => {
      // Filter by mode
      if (this.receiptFilter && this.receiptFilter !== 'ALL') {
        const f = this.receiptFilter.toLowerCase();
        const m = (r.paymentMode || '').toLowerCase();
        if (f === 'cash' && m !== 'cash') return false;
        if (f === 'cheque' && m !== 'cheque') return false;
        if (f === 'net banking' && m !== 'net banking' && m !== 'netbanking' && m !== 'neft' && m !== 'rtgs') return false;
        if (f === 'upi' && m !== 'upi') return false;
      }

      // Filter by search query
      if (this.receiptSearch && this.receiptSearch.trim()) {
        const q = this.receiptSearch.toLowerCase().trim();
        const matchNum = (r.receiptNumber || '').toLowerCase().includes(q);
        const matchCust = (r.customerName || '').toLowerCase().includes(q);
        const matchRef = (r.referenceNumber || '').toLowerCase().includes(q);
        const matchAcc = (r.accountName || '').toLowerCase().includes(q);
        if (!matchNum && !matchCust && !matchRef && !matchAcc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.receiptSortBy === 'DATE_ASC') {
        return new Date(a.date) - new Date(b.date);
      } else if (this.receiptSortBy === 'AMOUNT_DESC') {
        return (b.amount || 0) - (a.amount || 0);
      } else if (this.receiptSortBy === 'AMOUNT_ASC') {
        return (a.amount || 0) - (b.amount || 0);
      }
      return new Date(b.date) - new Date(a.date);
    });
  }

  getNextPaymentReceiptNumber() {
    const nums = this.paymentReceipts
      .map(r => {
        const m = r.receiptNumber.match(/REC-2026-(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      })
      .filter(n => !isNaN(n));
    const maxNum = nums.length > 0 ? Math.max(...nums) : 5;
    return `REC-2026-${String(maxNum + 1).padStart(3, '0')}`;
  }

  addPaymentReceipt(receipt) {
    this.paymentReceipts.unshift(receipt);
    this.activeReceiptId = receipt.id;

    // Apply settlements to chosen invoices
    if (receipt.settledInvoices && Array.isArray(receipt.settledInvoices)) {
      receipt.settledInvoices.forEach(item => {
        if (item.invoiceId && item.allocatedAmount > 0) {
          this.recordPayment(item.invoiceId, item.allocatedAmount, receipt.paymentMode, receipt.receiptNumber);
        }
      });
    }

    this.saveToStorage();
    return receipt;
  }

  deletePaymentReceipt(id) {
    this.paymentReceipts = this.paymentReceipts.filter(r => r.id !== id);
    if (this.activeReceiptId === id) {
      this.activeReceiptId = this.paymentReceipts[0] ? this.paymentReceipts[0].id : null;
    }
    this.saveToStorage();
  }

  getUnpaidInvoicesForCustomer(customerId) {
    return this.invoices.filter(inv => {
      if (customerId && inv.customerId !== customerId) return false;
      return inv.status === 'UNPAID' || inv.status === 'PARTIALLY_PAID' || inv.status === 'OVERDUE';
    });
  }

  // REFUND VOUCHERS API
  getRefundVouchers() {
    return this.refundVouchers;
  }

  getRefundVoucherById(id) {
    return this.refundVouchers.find(v => v.id === id || v.voucherNumber === id);
  }

  getNextRefundVoucherNumber() {
    const nums = this.refundVouchers
      .map(v => {
        const m = v.voucherNumber.match(/RV-2026-(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      })
      .filter(n => !isNaN(n));
    const maxNum = nums.length > 0 ? Math.max(...nums) : 1;
    return `RV-2026-${String(maxNum + 1).padStart(3, '0')}`;
  }

  getCustomerUnusedAdvance(customerId) {
    if (!customerId) return 0;
    const receipts = this.paymentReceipts.filter(r => r.customerId === customerId);
    let totalAdvance = 0;
    receipts.forEach(r => {
      const amt = parseFloat(r.amount) || 0;
      if (r.isAdvance || r.status === 'Advance') {
        totalAdvance += amt;
      } else if (r.settledInvoices && r.settledInvoices.length > 0) {
        const settled = r.settledInvoices.reduce((s, it) => s + (parseFloat(it.allocatedAmount) || 0), 0);
        if (amt > settled) totalAdvance += (amt - settled);
      }
    });

    const refunds = this.refundVouchers.filter(rv => rv.customerId === customerId);
    const totalRefunded = refunds.reduce((s, rv) => s + (parseFloat(rv.amount) || 0), 0);
    return Math.max(0, totalAdvance - totalRefunded);
  }

  addRefundVoucher(voucher) {
    this.refundVouchers.unshift(voucher);
    this.saveToStorage();
    return voucher;
  }

  deleteRefundVoucher(id) {
    this.refundVouchers = this.refundVouchers.filter(v => v.id !== id);
    this.saveToStorage();
  }

  getFilteredRefundVouchers() {
    return this.refundVouchers.filter(v => {
      if (this.refundSearch && this.refundSearch.trim()) {
        const q = this.refundSearch.toLowerCase().trim();
        const matchNum = (v.voucherNumber || '').toLowerCase().includes(q);
        const matchCust = (v.customerName || '').toLowerCase().includes(q);
        const matchPaid = (v.paidFrom || '').toLowerCase().includes(q);
        if (!matchNum && !matchCust && !matchPaid) return false;
      }
      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // TDS VOUCHERS API
  getTdsVouchers() {
    return this.tdsVouchers;
  }

  getTdsVoucherById(id) {
    return this.tdsVouchers.find(v => v.id === id || v.voucherNumber === id);
  }

  getTdsMetrics() {
    const totalCount = this.tdsVouchers.length;
    const totalAmount = this.tdsVouchers.reduce((s, v) => s + (parseFloat(v.amount) || 0), 0);
    return { totalCount, totalAmount };
  }

  getNextTdsVoucherNumber() {
    const nums = this.tdsVouchers
      .map(v => {
        const m = v.voucherNumber.match(/TDS-2026-(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      })
      .filter(n => !isNaN(n));
    const maxNum = nums.length > 0 ? Math.max(...nums) : 2;
    return `TDS-2026-${String(maxNum + 1).padStart(3, '0')}`;
  }

  getFilteredTdsVouchers() {
    return this.tdsVouchers.filter(v => {
      if (this.tdsSearch && this.tdsSearch.trim()) {
        const q = this.tdsSearch.toLowerCase().trim();
        const matchNum = (v.voucherNumber || '').toLowerCase().includes(q);
        const matchCust = (v.customerName || '').toLowerCase().includes(q);
        const matchSec = (v.tdsSection || '').toLowerCase().includes(q);
        if (!matchNum && !matchCust && !matchSec) return false;
      }
      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  addTdsVoucher(voucher) {
    this.tdsVouchers.unshift(voucher);
    if (voucher.settledInvoices && Array.isArray(voucher.settledInvoices)) {
      voucher.settledInvoices.forEach(item => {
        if (item.invoiceId && item.allocatedTds > 0) {
          const inv = this.getInvoiceById(item.invoiceId);
          if (inv) {
            const currentPaid = inv.paidAmount || 0;
            const newPaid = Math.min(inv.grandTotal, currentPaid + item.allocatedTds);
            const newDue = Math.max(0, inv.grandTotal - newPaid);
            inv.paidAmount = newPaid;
            inv.dueAmount = newDue;
            if (newDue <= 0) inv.status = 'PAID';
            else inv.status = 'PARTIALLY_PAID';
          }
        }
      });
    }
    this.saveToStorage();
    return voucher;
  }

  deleteTdsVoucher(id) {
    this.tdsVouchers = this.tdsVouchers.filter(v => v.id !== id);
    this.saveToStorage();
  }

  // ==========================================
  // PROFORMA INVOICES API METHODS
  // ==========================================
  getProformaInvoices() {
    return this.proformaInvoices;
  }

  getProformaById(id) {
    return this.proformaInvoices.find(p => p.id === id || p.proformaNumber === id);
  }

  getProformaMetrics() {
    const totalCount = this.proformaInvoices.length;
    const totalSalesAmount = this.proformaInvoices.reduce((sum, p) => sum + (p.grandTotal || 0), 0);
    return { totalCount, totalSalesAmount };
  }

  getNextProformaNumber() {
    let max = 0;
    this.proformaInvoices.forEach(p => {
      const numStr = (p.proformaNumber || p.id || '').replace(/^PI-\d{4}-/, '');
      const n = parseInt(numStr, 10);
      if (!isNaN(n) && n > max) max = n;
    });
    const next = max + 1;
    return `PI-2026-${String(next).padStart(3, '0')}`;
  }

  getFilteredProformaInvoices() {
    return this.proformaInvoices.filter(p => {
      if (this.proformaSearch && this.proformaSearch.trim()) {
        const query = this.proformaSearch.toLowerCase().trim();
        const matchNum = (p.proformaNumber || p.id || '').toLowerCase().includes(query);
        const matchCust = (p.customerName || '').toLowerCase().includes(query);
        const matchGstin = (p.customerGstin || '').toLowerCase().includes(query);
        const matchItems = (p.items || []).some(it => (it.name || '').toLowerCase().includes(query));
        if (!matchNum && !matchCust && !matchGstin && !matchItems) return false;
      }
      return true;
    }).sort((a, b) => {
      if (this.proformaSortBy === 'DATE_ASC') return new Date(a.date) - new Date(b.date);
      if (this.proformaSortBy === 'AMOUNT_DESC') return (b.grandTotal || 0) - (a.grandTotal || 0);
      if (this.proformaSortBy === 'AMOUNT_ASC') return (a.grandTotal || 0) - (b.grandTotal || 0);
      return new Date(b.date) - new Date(a.date);
    });
  }

  addProformaInvoice(proforma) {
    this.proformaInvoices.unshift(proforma);
    this.saveToStorage();
    return proforma;
  }

  deleteProformaInvoice(id) {
    this.proformaInvoices = this.proformaInvoices.filter(p => p.id !== id);
    this.saveToStorage();
  }

  convertProformaToInvoice(proformaId) {
    const proforma = this.getProformaById(proformaId);
    if (!proforma) return null;

    const newInvoiceNumber = this.getNextInvoiceNumber();
    const isIntraState = proforma.stateCode === this.seller.stateCode;

    const invoice = {
      id: newInvoiceNumber,
      invoiceNumber: newInvoiceNumber,
      docType: 'TAX INVOICE',
      docCategory: 'ORIGINAL FOR RECIPIENT',
      issueDate: new Date().toISOString().split('T')[0],
      issueTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      dueDate: proforma.dueDate || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      customerId: proforma.customerId,
      customerName: proforma.customerName,
      customerGstin: proforma.customerGstin,
      customerAddress: proforma.customerAddress,
      dispatchAddress: proforma.customerAddress,
      placeOfSupply: proforma.placeOfSupply || `${proforma.stateCode} - State`,
      stateCode: proforma.stateCode,
      reverseCharge: proforma.otherDetails?.reverseCharge ? 'Yes' : 'No',
      isEInvoiced: true,
      irn: this.generateIrnHash(),
      status: 'UNPAID',
      items: (proforma.items || []).map((it, idx) => {
        const gstRate = it.gstRate || 18;
        const taxable = it.taxableAmount || (it.rate * it.quantity);
        const cgstRate = isIntraState ? gstRate / 2 : 0;
        const sgstRate = isIntraState ? gstRate / 2 : 0;
        const igstRate = isIntraState ? 0 : gstRate;
        const cgstAmount = isIntraState ? (taxable * cgstRate) / 100 : 0;
        const sgstAmount = isIntraState ? (taxable * sgstRate) / 100 : 0;
        const igstAmount = isIntraState ? 0 : (taxable * igstRate) / 100;
        return {
          id: `item-${idx + 1}`,
          name: it.name,
          description: it.description || it.name,
          hsn: it.hsn,
          quantity: it.quantity,
          unit: it.unit || 'Unit',
          rate: it.rate,
          taxType: it.taxType || 'Exclusive',
          discountPercent: it.discountPercent || 0,
          taxableAmount: taxable,
          gstRate,
          cgstRate,
          sgstRate,
          igstRate,
          cgstAmount,
          sgstAmount,
          igstAmount,
          total: taxable + cgstAmount + sgstAmount + igstAmount
        };
      }),
      taxableSubtotal: proforma.taxableSubtotal || 0,
      cgstTotal: isIntraState ? (proforma.cgstTotal || 0) : 0,
      sgstTotal: isIntraState ? (proforma.sgstTotal || 0) : 0,
      igstTotal: isIntraState ? 0 : (proforma.igstTotal || (proforma.cgstTotal + proforma.sgstTotal) || 0),
      roundOff: proforma.roundOff || 0,
      grandTotal: proforma.grandTotal || 0,
      amountInWords: proforma.amountInWords || numberToWordsINR(proforma.grandTotal || 0),
      paidAmount: 0,
      dueAmount: proforma.grandTotal || 0,
      settlementDetails: null,
      terms: proforma.terms || '1. Payment due within 15 days of invoice date.'
    };

    proforma.status = 'CONVERTED';
    this.invoices.unshift(invoice);
    this.activeInvoiceId = invoice.id;
    this.saveToStorage();
    return invoice;
  }

  // ==========================================
  // DELIVERY CHALLANS API METHODS
  // ==========================================
  getDeliveryChallans() {
    return this.deliveryChallans;
  }

  getDeliveryChallanById(id) {
    return this.deliveryChallans.find(c => c.id === id || c.challanNumber === id);
  }

  getDeliveryChallanMetrics() {
    let allCount = this.deliveryChallans.length;
    let allAmount = 0;
    let deliveredCount = 0;
    let deliveredAmount = 0;
    let undeliveredCount = 0;
    let undeliveredAmount = 0;
    let returnedCount = 0;
    let returnedAmount = 0;

    this.deliveryChallans.forEach(c => {
      const amt = Number(c.grandTotal || c.finalAmount || c.totalAmount || 0);
      allAmount += amt;
      if (c.status === 'DELIVERED') {
        deliveredCount++;
        deliveredAmount += amt;
      } else if (c.status === 'UNDELIVERED') {
        undeliveredCount++;
        undeliveredAmount += amt;
      } else if (c.status === 'RETURNED') {
        returnedCount++;
        returnedAmount += amt;
      }
    });

    return {
      all: { count: allCount, amount: allAmount },
      delivered: { count: deliveredCount, amount: deliveredAmount },
      undelivered: { count: undeliveredCount, amount: undeliveredAmount },
      returned: { count: returnedCount, amount: returnedAmount },
      allCount,
      allAmount,
      deliveredCount,
      deliveredAmount,
      undeliveredCount,
      undeliveredAmount,
      returnedCount,
      returnedAmount
    };
  }

  getNextDeliveryChallanNumber() {
    let max = 0;
    this.deliveryChallans.forEach(c => {
      const numStr = (c.challanNumber || c.id || '').replace(/^DC-\d{4}-/, '');
      const n = parseInt(numStr, 10);
      if (!isNaN(n) && n > max) max = n;
    });
    const next = max + 1;
    return `DC-2026-${String(next).padStart(3, '0')}`;
  }

  getFilteredDeliveryChallans() {
    return this.deliveryChallans.filter(c => {
      // Tab filter
      if (this.deliveryChallanFilter === 'DELIVERED' && c.status !== 'DELIVERED') return false;
      if (this.deliveryChallanFilter === 'UNDELIVERED' && c.status !== 'UNDELIVERED') return false;
      if (this.deliveryChallanFilter === 'RETURNED' && c.status !== 'RETURNED') return false;

      // Search filter
      if (this.deliveryChallanSearch && this.deliveryChallanSearch.trim()) {
        const query = this.deliveryChallanSearch.toLowerCase().trim();
        const matchNum = (c.challanNumber || c.id || '').toLowerCase().includes(query);
        const matchCust = (c.customerName || '').toLowerCase().includes(query);
        const matchGstin = (c.customerGstin || '').toLowerCase().includes(query);
        const matchType = (c.challanType || '').toLowerCase().includes(query);
        const matchItem = (c.items || []).some(it => (it.name || '').toLowerCase().includes(query));
        if (!matchNum && !matchCust && !matchGstin && !matchType && !matchItem) return false;
      }
      return true;
    }).sort((a, b) => {
      if (this.deliveryChallanSortBy === 'DATE_ASC') return new Date(a.date) - new Date(b.date);
      if (this.deliveryChallanSortBy === 'AMOUNT_DESC') return (b.grandTotal || 0) - (a.grandTotal || 0);
      if (this.deliveryChallanSortBy === 'AMOUNT_ASC') return (a.grandTotal || 0) - (b.grandTotal || 0);
      return new Date(b.date) - new Date(a.date);
    });
  }

  addDeliveryChallan(challan) {
    this.deliveryChallans.unshift(challan);
    this.saveToStorage();
    return challan;
  }

  deleteDeliveryChallan(id) {
    this.deliveryChallans = this.deliveryChallans.filter(c => c.id !== id);
    this.saveToStorage();
  }

  convertChallanToInvoice(challanId) {
    const challan = this.getDeliveryChallanById(challanId);
    if (!challan) return null;

    const newInvoiceNumber = this.getNextInvoiceNumber();
    const isIntraState = challan.stateCode === this.seller.stateCode;

    const invoice = {
      id: newInvoiceNumber,
      invoiceNumber: newInvoiceNumber,
      docType: 'TAX INVOICE',
      docCategory: 'ORIGINAL FOR RECIPIENT',
      issueDate: new Date().toISOString().split('T')[0],
      issueTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      customerId: challan.customerId,
      customerName: challan.customerName,
      customerGstin: challan.customerGstin,
      customerAddress: challan.customerAddress,
      dispatchAddress: challan.customerAddress,
      placeOfSupply: challan.placeOfSupply || `${challan.stateCode} - State`,
      stateCode: challan.stateCode,
      reverseCharge: 'No',
      isEInvoiced: true,
      irn: this.generateIrnHash(),
      status: 'UNPAID',
      items: (challan.items || []).map((it, idx) => {
        const gstRate = it.gstRate || 18;
        const taxable = it.taxableAmount || (it.rate * it.quantity);
        const cgstRate = isIntraState ? gstRate / 2 : 0;
        const sgstRate = isIntraState ? gstRate / 2 : 0;
        const igstRate = isIntraState ? 0 : gstRate;
        const cgstAmount = isIntraState ? (taxable * cgstRate) / 100 : 0;
        const sgstAmount = isIntraState ? (taxable * sgstRate) / 100 : 0;
        const igstAmount = isIntraState ? 0 : (taxable * igstRate) / 100;
        return {
          id: `item-${idx + 1}`,
          name: it.name,
          description: it.description || it.name,
          hsn: it.hsn,
          quantity: it.quantity,
          unit: it.unit || 'Unit',
          rate: it.rate,
          taxType: it.taxType || 'Exclusive',
          discountPercent: it.discountPercent || 0,
          taxableAmount: taxable,
          gstRate,
          cgstRate,
          sgstRate,
          igstRate,
          cgstAmount,
          sgstAmount,
          igstAmount,
          total: taxable + cgstAmount + sgstAmount + igstAmount
        };
      }),
      taxableSubtotal: challan.taxableSubtotal || 0,
      cgstTotal: isIntraState ? (challan.cgstTotal || 0) : 0,
      sgstTotal: isIntraState ? (challan.sgstTotal || 0) : 0,
      igstTotal: isIntraState ? 0 : (challan.igstTotal || (challan.cgstTotal + challan.sgstTotal) || 0),
      roundOff: challan.roundOff || 0,
      grandTotal: challan.grandTotal || 0,
      amountInWords: challan.amountInWords || numberToWordsINR(challan.grandTotal || 0),
      paidAmount: 0,
      dueAmount: challan.grandTotal || 0,
      settlementDetails: null,
      terms: '1. Invoiced against Delivery Challan ' + challan.challanNumber
    };

    challan.status = 'DELIVERED';
    challan.invoiced = true;
    challan.invoiceId = invoice.id;
    this.invoices.unshift(invoice);
    this.activeInvoiceId = invoice.id;
    this.saveToStorage();
    return invoice;
  }

  // ==========================================
  // E-WAYBILLS API METHODS
  // ==========================================
  getEwaybills() {
    return this.ewaybills;
  }

  getEwaybillById(id) {
    return this.ewaybills.find(e => e.id === id || e.ewbNumber === id);
  }

  loginEwaybill(gstin, username, password) {
    this.ewaybillLoggedIn = true;
    this.saveToStorage();
    return true;
  }

  logoutEwaybill() {
    this.ewaybillLoggedIn = false;
    this.saveToStorage();
  }

  generateEwaybill(data) {
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    const ewbNumber = `2410${randomSuffix}`;
    const newEwb = {
      id: `EWB-${ewbNumber}`,
      ewbNumber: ewbNumber,
      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      docType: data.docType || 'Tax Invoice',
      docNo: data.docNo || 'INV-2026-089',
      fromGstin: this.seller.gstin,
      fromTradeName: this.seller.tradeName || this.seller.legalName,
      toGstin: data.toGstin || '27AABCM6543D1ZT',
      toTradeName: data.toTradeName || 'Mahindra Logistics Ltd',
      toPlace: data.toPlace || 'Pune, Maharashtra',
      distance: data.distance || 120,
      vehicleNo: data.vehicleNo || 'MH-04-AB-1234',
      mode: data.mode || 'Road',
      validUntil: new Date(Date.now() + 48 * 3600000).toLocaleDateString('en-GB') + ' 11:59 PM',
      status: 'ACTIVE',
      totalValue: data.totalValue || 90860.00
    };
    this.ewaybills.unshift(newEwb);
    this.saveToStorage();
    return newEwb;
  }

  // ==========================================
  // BANKING & CASH ACCOUNTS API METHODS
  // ==========================================
  getBankAccounts() {
    let list = this.bankAccounts || [];
    if (this.bankingFilter === 'BANK') {
      list = list.filter(a => a.type === 'BANK');
    } else if (this.bankingFilter === 'CASH') {
      list = list.filter(a => a.type === 'CASH');
    }
    if (this.bankingSearch) {
      const q = this.bankingSearch.toLowerCase();
      list = list.filter(a => (a.name || '').toLowerCase().includes(q) || (a.accountNumber || '').includes(q) || (a.branchName || '').toLowerCase().includes(q) || (a.accountHolder || '').toLowerCase().includes(q));
    }
    return list;
  }

  getBankAccountById(id) {
    return (this.bankAccounts || []).find(a => a.id === id);
  }

  addBankAccount(acc) {
    if (!this.bankAccounts) this.bankAccounts = [];
    const newId = acc.id || `acc_${Date.now()}`;
    const newAcc = {
      id: newId,
      type: acc.type || 'BANK',
      name: acc.name || 'New Account',
      isDefault: false,
      subtitle: acc.type === 'CASH' ? 'Cash account' : (acc.accountNumber ? `A/c: **** ${acc.accountNumber.slice(-4)} • ${acc.branchName || 'Branch'}` : 'Bank account'),
      accountHolder: acc.accountHolder || this.seller.tradeName || 'SASMITH TRADERS',
      accountNumber: acc.accountNumber || '',
      ifsc: acc.ifsc || '',
      branchName: acc.branchName || '',
      openingBalance: parseFloat(acc.openingBalance) || 0,
      openingBalanceDate: acc.openingBalanceDate || new Date().toISOString().split('T')[0],
      amountInBank: parseFloat(acc.openingBalance) || 0,
      amountInGimbooks: parseFloat(acc.openingBalance) || 0,
      uncategorizedCount: 0,
      iban: acc.iban || '',
      swift: acc.swift || ''
    };
    this.bankAccounts.push(newAcc);
    this.saveToStorage();
    return newAcc;
  }

  updateBankAccount(id, data) {
    const idx = (this.bankAccounts || []).findIndex(a => a.id === id);
    if (idx !== -1) {
      this.bankAccounts[idx] = { ...this.bankAccounts[idx], ...data };
      if (data.openingBalance !== undefined) {
        this.bankAccounts[idx].amountInGimbooks = parseFloat(data.openingBalance) || 0;
        this.bankAccounts[idx].amountInBank = parseFloat(data.openingBalance) || 0;
      }
      this.saveToStorage();
      return this.bankAccounts[idx];
    }
    return null;
  }

  deleteBankAccount(id) {
    const acc = this.getBankAccountById(id);
    if (acc && acc.isDefault) {
      return false;
    }
    this.bankAccounts = (this.bankAccounts || []).filter(a => a.id !== id);
    this.saveToStorage();
    return true;
  }

  getBankingMetrics() {
    const accounts = this.bankAccounts || [];
    let cashInHand = 0;
    let bankBalance = 0;
    let uncategorized = 0;
    let bankCount = 0;
    let cashCount = 0;

    accounts.forEach(a => {
      const bal = Number(a.amountInGimbooks || a.openingBalance || 0);
      if (a.type === 'CASH') {
        cashInHand += bal;
        cashCount++;
      } else {
        bankBalance += bal;
        bankCount++;
      }
      uncategorized += Number(a.uncategorizedCount || 0);
    });

    return {
      cashInHand,
      bankBalance,
      uncategorized,
      totalCount: accounts.length,
      bankCount,
      cashCount
    };
  }
}

// Global Currency Formatter
function formatINR(val, includeSymbol = true, decimalPlaces = 2) {
  if (val === undefined || val === null || isNaN(val)) return includeSymbol ? '₹0.00' : '0.00';
  const num = Number(val);
  const parts = num.toFixed(decimalPlaces).split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1];

  let lastThree = integerPart.substring(integerPart.length - 3);
  let otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  if (decimalPlaces > 0) {
    res += '.' + decimalPart;
  }
  return includeSymbol ? `₹${res}` : res;
}

// Number to Words in Indian English
function numberToWordsINR(amount) {
  if (!amount || amount === 0) return 'Zero Rupees Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.trim();
  }

  const rounded = Math.round(amount * 100) / 100;
  const intPart = Math.floor(rounded);
  const paise = Math.round((rounded - intPart) * 100);

  let result = inWords(intPart) + ' Rupees';
  if (paise > 0) {
    result += ' and ' + inWords(paise) + ' Paise';
  }
  result += ' Only';
  return result;
}

// Global store instance
window.gstStore = new GSTStore();
window.formatINR = formatINR;
window.numberToWordsINR = numberToWordsINR;
