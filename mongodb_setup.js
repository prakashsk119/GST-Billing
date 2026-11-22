// ====================================================================
// GST Billing Platform - MongoDB Database Setup & Schema Script
// Run via: mongosh "<your-mongodb-uri>" mongodb_setup.js
// Or paste into MongoDB Compass / Mongosh shell
// ====================================================================

const dbName = 'gst_billing';
const db = db.getSiblingDB(dbName);

print(`Connecting to database: ${dbName}...`);

// 1. Invoices Collection
db.createCollection('invoices');
db.invoices.createIndex({ id: 1 }, { unique: true });
db.invoices.createIndex({ invoiceNumber: 1 }, { unique: true });
db.invoices.createIndex({ customerId: 1 });
db.invoices.createIndex({ status: 1 });
db.invoices.createIndex({ issueDate: -1 });

// 2. Customers Collection
db.createCollection('customers');
db.customers.createIndex({ id: 1 }, { unique: true });
db.customers.createIndex({ gstin: 1 });
db.customers.createIndex({ name: 1 });

// 3. Catalog Items Collection
db.createCollection('catalog');
db.catalog.createIndex({ id: 1 }, { unique: true });
db.catalog.createIndex({ hsn: 1 });

// 4. Seller Profile Collection
db.createCollection('seller_profile');
db.seller_profile.createIndex({ id: 1 }, { unique: true });

// 5. Bank Accounts Collection
db.createCollection('bank_accounts');
db.bank_accounts.createIndex({ id: 1 }, { unique: true });

// 6. Seed Default SASMITH TRADERS Data
print('Seeding default SASMITH TRADERS profile and flagship records...');

db.seller_profile.updateOne(
  { id: 'default' },
  {
    $set: {
      id: 'default',
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
      updatedAt: new Date()
    }
  },
  { upsert: true }
);

db.customers.updateOne(
  { id: 'cust-kanthasamy' },
  {
    $set: {
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
      phone: '9842371148',
      updatedAt: new Date()
    }
  },
  { upsert: true }
);

db.catalog.updateOne(
  { id: 'prod-waste-fiber' },
  {
    $set: {
      id: 'prod-waste-fiber',
      name: 'WASTE FIBER',
      hsn: '5305',
      isService: false,
      unit: 'BAG',
      defaultRate: 245.00,
      defaultGstRate: 0,
      desc: 'WASTE FIBER • HSN/SAC: 5305 • Unit: BAG',
      updatedAt: new Date()
    }
  },
  { upsert: true }
);

db.invoices.updateOne(
  { id: 'SSS-INV-26-27-345' },
  {
    $set: {
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
      terms: '1. This is an electronically generated document. 2. All disputes are subject to Coimbatore jurisdiction.',
      updatedAt: new Date()
    }
  },
  { upsert: true }
);

print('SUCCESS: MongoDB collections and indexes created successfully for database: gst_billing!');
