# GST Invoice & Billing Management Platform

A high-trust, responsive, production-ready GST Billing and E-Invoicing web platform tailored for Indian businesses, chartered accountants, and SMEs. Built in strict alignment with the **GST Fintech Flow** design system specifications and Google Stitch prototypes.

---

## 🌟 Key Features & Capabilities

### 1. Financial Pulse Dashboard
- **Telemetry KPI Bento:** Real-time Gross Turnover, Receivables Pending, GST Liability (Net Tax Payable), and Claimable Input Tax Credit (ITC).
- **Sales Turnover Trend Chart:** Interactive SVG chart displaying monthly/quarterly turnover progression with YoY growth metrics.
- **GST Compliance Card:** Live status tracking for GSTR-1, GSTR-3B summary returns, and NIC E-Invoice API quota.
- **Recent Invoices Table:** Quick overview with status badges and one-click navigation to full tax invoice details.

### 2. Sales Invoices Management
- **Universal Search & Filters:** Filter across 24 invoices by number, buyer name, GSTIN, or IRN hash.
- **Dynamic Telemetry Filter Cards:** Clickable metric cards (Total Sales, Unpaid, Paid, Partially Paid, Overdue) that instantly filter the invoice ledger.
- **Interactive Batch Operations:** Multi-select invoices to print packing slips, trigger WhatsApp batches, or export master data.
- **Compliance Actions:**
  - **Export GSTR-1:** One-click download of Table 4A (B2B outward supplies) CSV formatted for the GST Portal.
  - **NIC Portal Sync:** Simulated live IRN hash verification with government servers.
  - **Excel Master Export:** Detailed export of line items, tax breakdowns, and payment statuses.

### 3. Create Tax Invoice Flow
- **1-Click Bill Structure Templates:**
  - `⚡ IT & SaaS SLA Bill` (Enterprise Cloud Hosting, e-Invoicing API Gateway, Onboarding & Training)
  - `⚡ Hardware & Setup (Inter-State IGST)` (Network Firewall Appliance 8517, Edge Server Setup 8471)
  - `⚡ ERP & AMC Consulting` (Industrial ERP Workflow Blueprint 998313, Annual Maintenance Contract 9987)
- **Auto Serial Numbering:** Sequential, fiscal-year-compliant invoice numbering (`INV-2026-091`).
- **Customer Directory & Autofill:** Select saved customers (Reliance Retail, Mahindra Logistics, TCS, Infosys, Bharti Airtel) to instantly populate GSTIN, address, and Place of Supply (POS).
- **Intelligent GST Logic:** Automatically detects **Intra-State** (MH → MH: CGST 9% + SGST 9%) vs **Inter-State** (MH → KA/DL: IGST 18%) transactions based on supplier and customer state codes.
- **Dynamic Line Items:** Add, configure, or remove goods/services with HSN/SAC codes, quantity, rate, discount %, and tax rate (0%, 5%, 12%, 18%, 28%).
- **Instant Tax Calculation:** Real-time updates for gross subtotal, discounts, taxable value, CGST/SGST/IGST splits, round-off adjustment, and Indian Rupee amount in words.
- **Save Draft & Instant Generation:** Saves to persistent `localStorage` and generates a verifiable 64-character IRN with QR code.

### 4. Authentic Indian Tax Invoice View & Print Layout
- Conforms to **Rule 46 of CGST Rules**:
  - Original for Recipient watermark and header banner
  - Simulated IRN QR Code with copyable 64-character alphanumeric hash
  - Complete Supplier and Recipient details (GSTIN, PAN, State code, POS)
  - **Full Itemized Table:** Serial No, Item Name & Description, HSN/SAC, Qty, Unit, Unit Rate, Trade Discount, Taxable Amount, Tax Rate, and Total (₹)
  - **Statutory HSN / SAC Tax Summary Grid (Rule 46(k)):** Aggregate taxable amounts, CGST, SGST, IGST, and total tax breakdowns per HSN classification
  - **Financial Reconciliation:** Gross subtotal, CGST/SGST/IGST splits, round-off adjustment, and Grand Total in INR
  - **Indian Rupee Amount in Words:** KaTeX/fintech standard Indian numbering format (e.g. *Eighty Four Thousand Two Hundred Rupees Only*)
  - **Settlement & Payment Channels:**
    - Bank transfer details (HDFC Bank Ltd, Baner Branch, IFSC, A/C No)
    - **Instant Dynamic UPI Payment QR Code:** Scan and pay via PhonePe, Google Pay, Paytm, or BHIM (`gstbilling@hdfcbank`)
    - Digitally Verified signature seal and authorized signatory
    - Statutory Jurisdiction Declaration (*"We declare that this invoice shows the actual price of the goods or services described and that all particulars are true and correct. Subject to Pune Jurisdiction."*)
  - Settlement & Audit Trail card with payment voucher reference
- **Dedicated Print Styles (`@media print`):** A4-optimized, clean black-and-white print mode for paper and PDF export.

### 5. Authentication & Login Portal (GimBooks GST Invoice Manager)
- **Faithful Recreation of GimBooks Flow:**
  - Gold branded emblem with invoice iconography and rust-maroon tagline.
  - **Set New Password Flow:** Dual password inputs with show/hide eye toggles.
  - **Live Dynamic Password Criteria Checklist:** Real-time green checkmark updates as user types:
    - 🟢 At least 8 characters
    - 🟢 One uppercase letter
    - 🟢 One lowercase letter
    - 🟢 One digit
    - 🟢 One special character
  - Solid Gold/Yellow primary **Save** CTA.
  - Secondary dark action buttons: **`Login with OTP`**, **`Login with password`**, **`Signup with password`**.
- **Multi-Mode Authentication Hub:**
  - **Login with Password:** Email / Mobile + Password + Remember Me + Forgot Password.
  - **Login with OTP:** 10-digit Indian mobile number (`+91`) with 6-digit auto-advancing OTP boxes and resend countdown.
  - **Signup with Password:** Instant business registration with trade name and GSTIN auto-formatting.
  - **Fast 1-Click Demo Logins:** Instant access as *Apex Enterprise (Admin / CA)* or *Reliance Retail (Client)*.
  - **Integrated Sign-Out / Lock Screen:** Accessible directly from header profile avatar and sidebar footer.

### 6. Interactive Modals & Workflows
- **WhatsApp Direct Share:** Pre-formats professional invoice messages with invoice number, amount, payment status, IRN, and bank details, dispatchable directly to `https://api.whatsapp.com/send`.
- **NIC e-Way Bill Generator:** Pre-populates consignor, consignee, invoice value, vehicle number (`MH-12-QZ-4921`), distance, and generates e-Way Bill number with 24-hour validity.
- **Company Switcher:** Switch between active ledger (*Apex Enterprise FY 2026-27*) and archived fiscal periods (*My Company Logistics FY 2025-26*).
- **Compliance Notifications Center:** Displays upcoming GSTR-1 deadlines, overdue notices, and sync alerts.

### 6. "Ask GST AI" Copilot
- High-contrast royal violet theme (`#21005d` / `#7546E8`).
- Built-in Indian GST domain knowledge:
  - HSN/SAC code lookup (Cloud 998315, Consulting 998313, Hardware 8471, AMC 9987)
  - Intra-State vs Inter-State tax allocation
  - E-Invoicing thresholds (> ₹5 Cr Rule 48(4))
  - Reverse Charge Mechanism (RCM Section 9(3))
  - Return calendar (GSTR-1 11th, GSTR-3B 20th)
- **Voice/Prompt Line Item Autofill:** Type natural language like *"Add 2 Cloud Servers at 45000 and 1 Setup at 12500"* and the AI automatically populates the Create Invoice form!

---

## 🎨 Design System: GST Fintech Flow

- **Colors:**
  - Primary: `#000000` / `#1e1928` (Midnight obsidian)
  - Secondary: `#715c00` / `#fdd428` / `#ffe17a` (Radiant Amber-Yellow)
  - Tertiary: `#000000` / `#21005d` / `#9067ff` (Royal Violet AI Accent)
  - Surface: `#fbf8ff` / `#f4f2fd` (Canvas Mist)
  - Semantic: Emerald (`#059669` / `#ECFDF5`), Crimson (`#DC2626` / `#FEF2F2`), Amber (`#D97706` / `#FFFBEB`)
- **Typography:** Inter (700 for currency statistics with `₹`, tabular numeric alignment for ledger accuracy).
- **Icons:** Material Symbols Outlined.

---

## 🚀 How to Run the Application

This is a zero-dependency, pure web application. You can run it in multiple ways:

### Option A: Open directly in your browser
Simply double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari):
```
d:\Project\GST Billing\index.html
```

### Option B: Local HTTP Server (PowerShell)
Run the following PowerShell command in the project directory:
```powershell
# Using Python (if installed):
python -m http.server 3000

# Or open directly in Default Browser:
Start-Process "d:\Project\GST Billing\index.html"
```

---

## 📁 Directory Structure

```
d:\Project\GST Billing\
├── index.html                  # Main SPA Shell & all View templates
├── css\
│   └── styles.css              # Custom styling, print media rules & animations
├── js\
│   ├── store.js                # State management, Indian GST data, CRUD & calculations
│   ├── export.js               # GSTR-1 CSV generator & WhatsApp formatter
│   ├── ai-assistant.js         # GST AI Copilot with domain knowledge & autofill
│   └── app.js                  # Application controller, view routing & UI handlers
├── design_source\              # Extracted Stitch source mockups & design guides
└── README.md                   # Complete documentation
```
