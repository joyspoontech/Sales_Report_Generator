# Joyspoon Report Generator - User Guide

## Quick Start

1. Open the app at your deployed URL or http://localhost:5173
2. Configure your n8n webhook URL in **Settings**
3. Upload an invoice PDF
4. Download your shipping report as **PDF**, **Excel**, or **CSV**

---

## Step-by-Step Guide

### Step 1: Configure Settings (First Time Only)

1. Click **Settings** in the sidebar
2. Enter your **n8n Webhook URL**
   - Example: `https://your-n8n.com/webhook/invoice`
3. Click **Save**
4. You should see "Supabase Connected" or "Local Backend Connected"

---

### Step 2: Set Up Product Master

Before processing invoices, add your products:

1. Click **Product Master** in the sidebar
2. Click **+ Add Product**
3. Fill in the details:
   - **SKU Code**: Your product code (e.g., ELA-100)
   - **Product Name**: Description
   - **Pieces per Box**: How many items fit in one box
   - **Box Weight (kg)**: Weight of one full box
   - **Box Dimensions**: Length × Width × Height in cm
4. Click **Save Product**
5. Repeat for all your products

> **Tip**: Products are used to calculate boxes and weights from quantities.

---

### Step 3: Upload an Invoice

1. Click **Upload Invoice** in the sidebar
2. Either:
   - **Drag & drop** your PDF invoice onto the upload area
   - **Click** the upload area to browse for a file
3. Wait for processing (usually 5-10 seconds)
4. The extracted data will appear below

---

### Step 4: Review Extracted Data

After upload, you'll see:

| Section | Description |
|---------|-------------|
| **Invoice Info** | Invoice number and date |
| **Summary Cards** | Total boxes, weight, and value |
| **Seller/Buyer** | Company names and GSTIN |
| **Line Items** | All products with calculations |

**If data is incorrect:**
- Click **🔄 Recalculate** to re-apply Product Master values
- Edit products in Product Master if needed

---

### Step 5: Download Reports

Choose your format:

| Button | Format | Best For |
|--------|--------|----------|
| **CSV** | Comma-separated | Quick import to other tools |
| **Excel** | .xlsx file | Sharing with sales team |
| **PDF** | Formatted document | Printing, archiving |

All exports include:
- Invoice details
- Seller/Buyer info
- Line items with quantities, boxes, weights
- Totals

---

### Step 6: View History

1. Click **History** in the sidebar
2. See all previously generated reports
3. For each report, you can:
   - **View** - Load it back to edit/regenerate
   - **XLSX** - Download Excel directly
   - **CSV** - Download CSV directly

---

## Tips & Troubleshooting

### "Please configure webhook URL" error
→ Go to Settings and enter your n8n webhook URL

### Products not matching
→ Check that SKU codes in Product Master exactly match your invoice SKUs

### Recalculate not working
→ Ensure Product Master has entries for all SKUs in the invoice

### Mixed Content error (production)
→ Use HTTPS for your n8n webhook, or configure the proxy endpoint

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Drag & Drop | Fastest way to upload |

---

## Data Storage

- **Supabase Connected**: Data saved to cloud database
- **Local Backend**: Data saved to server/data/ folder
- **Local Storage**: Data saved in browser only

---

## Support

For issues or feature requests, contact your system administrator.
