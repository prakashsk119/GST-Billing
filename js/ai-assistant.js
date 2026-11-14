// GST Billing Platform - AI Assistant Engine

const gstKnowledgeBase = [
  {
    keywords: ['hsn', 'sac', 'code', 'software', 'cloud', 'hosting', 'consulting'],
    answer: `Here are commonly used **HSN/SAC codes** for IT, SaaS & Hardware services:
- **SAC 998315**: Cloud hosting, server infrastructure, and storage services (GST: 18%)
- **SAC 998313**: IT consulting, ERP implementation, and system architecture (GST: 18%)
- **SAC 998319**: Other technical and compliance training/consulting (GST: 18%)
- **HSN 8471**: Automatic data processing machines, servers, and computers (GST: 18%)
- **HSN 8517**: Networking gateways, routers, firewalls, and modems (GST: 18%)
- **SAC 9987**: Annual maintenance contracts (AMC) and software support (GST: 18%)`
  },
  {
    keywords: ['cgst', 'sgst', 'igst', 'inter-state', 'intra-state', 'pos', 'place of supply'],
    answer: `Under GST law, tax type is determined by the **Supplier's State** vs **Place of Supply (POS)**:
1. **Intra-State Supply** (Supplier and POS in the same state, e.g. Maharashtra to Maharashtra):
   - **CGST** (Central GST): 50% of total rate
   - **SGST** (State GST): 50% of total rate
2. **Inter-State Supply** (Supplier and POS in different states, e.g. Maharashtra to Karnataka/Delhi):
   - **IGST** (Integrated GST): Full rate (e.g. 18%) directly to the Central Government pool.`
  },
  {
    keywords: ['einvoice', 'e-invoice', 'irn', 'threshold', 'mandatory', 'qr code'],
    answer: `**e-Invoicing Rules & Limits (Rule 48(4)):**
- Mandatory for all registered businesses with aggregate turnover exceeding **₹5 Crore** in any preceding FY.
- Applies to **B2B supplies**, exports, and supplies to SEZ developers/units.
- Requires real-time reporting of invoices to the **Invoice Registration Portal (IRP)** (NIC / Clear / Iris).
- Output includes a unique **64-character IRN** (Invoice Reference Number) and a digitally signed **QR Code** containing key invoice parameters.`
  },
  {
    keywords: ['rcm', 'reverse charge', 'mechanism', 'gta', 'advocate'],
    answer: `**Reverse Charge Mechanism (RCM - Section 9(3)):**
The recipient pays the GST directly to the government instead of the supplier.
- **Common RCM Services**:
  1. Goods Transport Agency (GTA) opting out of forward charge (5% GST under RCM)
  2. Legal services provided by Individual Advocates / Senior Advocates
  3. Services provided by arbitral tribunals or directors to a company
  4. Import of services from abroad by a business entity
- Note: Tax paid under RCM is fully claimable as **Input Tax Credit (ITC)** in the same tax period.`
  },
  {
    keywords: ['due date', 'gstr1', 'gstr-1', 'gstr3b', 'gstr-3b', 'returns'],
    answer: `**GST Return Filing Calendar:**
- **GSTR-1 (Monthly)**: Details of outward supplies — Due by **11th** of the following month.
- **GSTR-1 (QRMP Scheme)**: Quarterly filers — Due by **13th** of the month following the quarter.
- **GSTR-3B (Monthly)**: Summary return & tax payment — Due by **20th** of the following month.
- **GSTR-9 & 9C (Annual Return)**: Due by **31st December** of the subsequent financial year.`
  }
];

class GSTAIAssistant {
  constructor() {
    this.history = [
      {
        sender: 'ai',
        text: 'Hello! I am your **GST Compliance AI Assistant**. Ask me anything about HSN/SAC codes, CGST/SGST/IGST tax logic, e-Invoicing requirements, or tell me to autofill invoice line items.'
      }
    ];
  }

  ask(question) {
    const qLower = question.toLowerCase();
    
    // Check for autofill command
    if (qLower.includes('add') || qLower.includes('autofill') || qLower.includes('item')) {
      const parsedItems = this.parseLineItemsPrompt(question);
      if (parsedItems.length > 0) {
        if (window.populateCreateFormWithItems) {
          window.populateCreateFormWithItems(parsedItems);
          const reply = `I have parsed **${parsedItems.length} item(s)** from your prompt and added them to your Create Invoice form:\n` +
            parsedItems.map(it => `• **${it.name}** (${it.quantity} ${it.unit} @ ₹${it.rate})`).join('\n') +
            `\n\nNavigate to **Create Invoice** to review and finalize!`;
          this.history.push({ sender: 'user', text: question });
          this.history.push({ sender: 'ai', text: reply });
          return reply;
        }
      }
    }

    // Check knowledge base
    let bestMatch = null;
    let maxScore = 0;

    for (const entry of gstKnowledgeBase) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (qLower.includes(kw)) {
          score += 2;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = entry;
      }
    }

    let responseText = '';
    if (bestMatch && maxScore > 0) {
      responseText = bestMatch.answer;
    } else {
      responseText = `Under Indian GST regulations, all registered taxpayers must issue a valid GST Tax Invoice with mandatory details including:
- Legal Name & Trade Name
- 15-digit GSTIN of supplier and recipient
- Serial invoice number with unique financial year sequence
- HSN / SAC code (6 digits for turnover > ₹5 Cr)
- Place of Supply and GST breakdown (CGST + SGST for Intra-State, IGST for Inter-State)
- IRN Hash and QR Code for e-invoicing compliance.

Would you like help calculating tax or generating an e-way bill for your next consignment?`;
    }

    this.history.push({ sender: 'user', text: question });
    this.history.push({ sender: 'ai', text: responseText });
    return responseText;
  }

  parseLineItemsPrompt(prompt) {
    const items = [];
    const lower = prompt.toLowerCase();

    // Check for cloud / server
    if (lower.includes('cloud') || lower.includes('server')) {
      const qtyMatch = prompt.match(/(\d+)\s*(cloud|server)/i);
      const rateMatch = prompt.match(/(?:at|@|for|rs\.?|inr|₹)\s*(\d[\d,]*)/i);
      const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;
      const rate = rateMatch ? parseFloat(rateMatch[1].replace(/,/g, '')) : 45000;
      items.push({
        name: 'Enterprise Cloud Server Hosting',
        description: 'HSN 998315 • Annual SLA License',
        hsn: '998315',
        quantity: qty,
        unit: 'Unit',
        rate: rate,
        gstRate: 18,
        discountPercent: 0
      });
    }

    // Check for firewall / hardware / laptop
    if (lower.includes('firewall') || lower.includes('hardware') || lower.includes('laptop')) {
      items.push({
        name: 'Hardware Setup & Installation',
        description: 'HSN 8471 • Onsite edge server config & peripherals',
        hsn: '8471',
        quantity: 2,
        unit: 'Unit',
        rate: 12500,
        gstRate: 18,
        discountPercent: 5
      });
    }

    // Check for consultation / api
    if (lower.includes('api') || lower.includes('e-invoice') || lower.includes('einvoice')) {
      items.push({
        name: 'GST Automated e-Invoicing API Gateway',
        description: 'HSN 998313 • Integration Pack (10k docs)',
        hsn: '998313',
        quantity: 2,
        unit: 'Packs',
        rate: 10000,
        gstRate: 18,
        discountPercent: 0
      });
    }

    // Fallback item if none matched
    if (items.length === 0) {
      items.push({
        name: 'Industrial ERP Consultation',
        description: 'HSN 998313 • System workflow blueprint & audit',
        hsn: '998313',
        quantity: 1,
        unit: 'Session',
        rate: 45000,
        gstRate: 18,
        discountPercent: 0
      });
    }

    return items;
  }
}

window.gstAI = new GSTAIAssistant();
