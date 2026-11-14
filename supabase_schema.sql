-- ====================================================================
-- GST Billing Platform - Supabase PostgreSQL Database Schema
-- Project: GST Billing (ID: bxcsrfuxrjepjtctefoq)
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/bxcsrfuxrjepjtctefoq/sql)
-- ====================================================================

-- 1. Seller / Company Profile Table
CREATE TABLE IF NOT EXISTS seller_profile (
    id TEXT PRIMARY KEY DEFAULT 'default',
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Customers / Buyers Table
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT,
    gstin TEXT,
    state TEXT,
    category TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Product & Service Catalog Items
CREATE TABLE IF NOT EXISTS catalog_items (
    id TEXT PRIMARY KEY,
    name TEXT,
    hsn TEXT,
    default_rate NUMERIC,
    default_gst_rate NUMERIC,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tax Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    invoice_no TEXT,
    customer_id TEXT,
    customer_name TEXT,
    invoice_date TEXT,
    due_date TEXT,
    grand_total NUMERIC,
    status TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Quotations / Estimates Table
CREATE TABLE IF NOT EXISTS quotations (
    id TEXT PRIMARY KEY,
    quote_no TEXT,
    customer_name TEXT,
    date TEXT,
    grand_total NUMERIC,
    status TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Purchases & Inward Supplies Table
CREATE TABLE IF NOT EXISTS purchases (
    id TEXT PRIMARY KEY,
    bill_no TEXT,
    vendor TEXT,
    date TEXT,
    amount NUMERIC,
    itc NUMERIC,
    status TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Payment Receipts Table
CREATE TABLE IF NOT EXISTS payment_receipts (
    id TEXT PRIMARY KEY,
    receipt_no TEXT,
    customer_name TEXT,
    date TEXT,
    amount NUMERIC,
    payment_mode TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Refund Vouchers Table
CREATE TABLE IF NOT EXISTS refund_vouchers (
    id TEXT PRIMARY KEY,
    voucher_no TEXT,
    party_name TEXT,
    date TEXT,
    amount NUMERIC,
    paid_from TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TDS Vouchers Table
CREATE TABLE IF NOT EXISTS tds_vouchers (
    id TEXT PRIMARY KEY,
    voucher_no TEXT,
    party_name TEXT,
    date TEXT,
    amount NUMERIC,
    status TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Proforma Invoices Table
CREATE TABLE IF NOT EXISTS proforma_invoices (
    id TEXT PRIMARY KEY,
    proforma_no TEXT,
    buyer_name TEXT,
    date TEXT,
    grand_total NUMERIC,
    status TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Delivery Challans Table
CREATE TABLE IF NOT EXISTS delivery_challans (
    id TEXT PRIMARY KEY,
    challan_no TEXT,
    buyer_name TEXT,
    date TEXT,
    grand_total NUMERIC,
    status TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. e-Waybills Table
CREATE TABLE IF NOT EXISTS ewaybills (
    id TEXT PRIMARY KEY,
    ewaybill_no TEXT,
    doc_type TEXT,
    doc_no TEXT,
    buyer_name TEXT,
    amount NUMERIC,
    valid_until TEXT,
    status TEXT,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Bank & Cash Accounts Table
CREATE TABLE IF NOT EXISTS bank_accounts (
    id TEXT PRIMARY KEY,
    account_type TEXT,
    account_name TEXT,
    account_number TEXT,
    ifsc TEXT,
    balance NUMERIC,
    is_default BOOLEAN DEFAULT FALSE,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- Enable Row Level Security (RLS) with Public Anonymous Access Policies
-- This allows your web frontend to query and synchronize data cleanly.
-- ====================================================================

DO $$
DECLARE
    tbl text;
    tables text[] := ARRAY[
        'seller_profile', 'customers', 'catalog_items', 'invoices',
        'quotations', 'purchases', 'payment_receipts', 'refund_vouchers',
        'tds_vouchers', 'proforma_invoices', 'delivery_challans',
        'ewaybills', 'bank_accounts'
    ];
BEGIN
    FOREACH tbl IN ARRAY tables LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Public access policy" ON %I;', tbl);
        EXECUTE format('CREATE POLICY "Public access policy" ON %I FOR ALL USING (true) WITH CHECK (true);', tbl);
    END LOOP;
END $$;

-- Enable Realtime replication for live multi-tab & multi-device sync
ALTER PUBLICATION supabase_realtime ADD TABLE 
    invoices, customers, catalog_items, bank_accounts, delivery_challans, payment_receipts;

-- Output confirmation
SELECT 'GST Billing Supabase Schema installed successfully!' AS status;
