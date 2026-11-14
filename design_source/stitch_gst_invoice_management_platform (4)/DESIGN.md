---
name: GST Fintech Flow
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#49454c'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#7a767c'
  outline-variant: '#cac5cc'
  surface-tint: '#625b6d'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1e1928'
  on-primary-container: '#888094'
  inverse-primary: '#ccc3d8'
  secondary: '#715c00'
  on-secondary: '#ffffff'
  secondary-container: '#fdd428'
  on-secondary-container: '#705b00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#21005d'
  on-tertiary-container: '#9067ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9def4'
  primary-fixed-dim: '#ccc3d8'
  on-primary-fixed: '#1e1928'
  on-primary-fixed-variant: '#4a4455'
  secondary-fixed: '#ffe17a'
  secondary-fixed-dim: '#ebc30d'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#554500'
  tertiary-fixed: '#e8ddff'
  tertiary-fixed-dim: '#cebdff'
  on-tertiary-fixed: '#21005d'
  on-tertiary-fixed-variant: '#5211c5'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  currency-stat:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers a contemporary, high-trust fintech experience tailored for Indian businesses, chartered accountants, and SMEs navigating GST compliance, e-invoicing, and ledger management. The interface fuses operational efficiency with an approachable modern aesthetic: deep midnight obsidian for navigation stability, vibrant energetic marigold yellow for primary calls-to-action, and rich royal violet for intelligent assistant actions and key highlights.

### Visual Style
- **Modern Corporate SaaS with High-Contrast Utility:** Built on a structured, modular card framework with clean surfaces, crisp hairline borders, and subtle tinted ambient elevations.
- **Focus & Trust:** White workspace surfaces set against a soothing mist neutral background (`#F3F3F5`) reduce cognitive fatigue during dense data entry and accounting reconciliation.
- **Regulatory Precision:** Tailored specifically for Indian financial workflows with native INR (`₹`) formatting, GST breakdown displays (CGST, SGST, IGST), and unequivocal semantic status badging.

## Colors

The palette leverages high-contrast functional color assignments to distinguish navigation, high-value billing actions, AI assistance, and compliance audit states.

### Core Roles
- **Primary (`#171221`)**: Midnight plum-black used across primary side navigation, active parent menus, high-emphasis headline typography, and authoritative structural borders.
- **Secondary (`#FFD52A`)**: Radiant amber-yellow used exclusively for direct creation actions (e.g., "+ Create Invoice", quick actions). Paired with `#171221` text to ensure optimal AAA accessibility.
- **Tertiary (`#7546E8`)**: Vivid violet accent dedicated to AI assistants (e.g., "Ask AI"), interactive link triggers, active tabs, and promotional tags.
- **Canvas Neutral (`#F3F3F5`)**: Soft muted grey background preventing white-screen glare while providing visual contrast behind pure white operational cards.

### Semantic Status Palette
- **Paid / Completed:** Emerald Green (`#059669` fill, `#ECFDF5` background, `#A7F3D0` border).
- **Unpaid / Overdue:** Vivid Crimson (`#DC2626` fill, `#FEF2F2` background, `#FECACA` border).
- **Partially Paid:** Warm Amber (`#D97706` fill, `#FFFBEB` background, `#FDE68A` border).
- **Draft / In Review:** Slate Gray (`#475569` fill, `#F1F5F9` background, `#CBD5E1` border).

## Typography

Inter serves as the primary typographic anchor across all viewports. Its tall x-height, clear numeric tabular legibility, and geometric clarity maintain crisp precision across dense financial ledgers and GST summary dashboards.

- **Tabular Figures (`tnum`):** All financial tables, quantity counts, INR values, and balance summaries must enable tabular numeric figures to ensure vertical alignment of digits.
- **Financial Hierarchy:** Metric numbers (such as sales metrics and tax computations) use `currency-stat` or `headline-lg` in 700 weight with the standard Indian currency symbol `₹`.
- **Form & Metadata Labels:** Labels above input fields and micro-chips utilize `label-md` and `label-sm` with slight uppercase letter-spacing to enhance scannability.

## Layout & Spacing

The layout is built upon an 8px modular baseline grid engineered for enterprise SaaS dashboards. 

### Grid & Structure
- **Persistent Left Navigation:** A fixed-width dark sidebar (240px expanded, 72px collapsed) anchoring application tools, GST modules, and core navigation.
- **Main Workspace Canvas:** A fluid content container utilizing `#F3F3F5` background, housing segmented metric rows, search filters, and tabular data cards.
- **Breakpoints:**
  - **Mobile (< 768px):** Collapsible off-canvas drawer navigation, single-column summary cards, sticky bottom creation buttons, and horizontal swipe tables.
  - **Tablet (768px - 1024px):** Compact sidebar icon strip, 2-column metric cards, full-width search and filter toolbars.
  - **Desktop (1024px+):** Full 12-column content grid, persistent navigation, multi-column metric cards (4-up layout), and persistent secondary action headers.

## Elevation & Depth

Visual hierarchy uses clean planar surface differentiation combined with ultra-refined border treatments rather than deep dropped shadows.

- **Flat Background Base (`#F3F3F5`):** Structural bottom plane housing all interface components.
- **Container Surfaces (`#FFFFFF`):** High-clarity white surfaces framed with subtle neutral borders (`border: 1px solid #E4E4E7`).
- **Subtle Resting Elevation:** Applied to floating summary cards, tables, and popovers:
  `box-shadow: 0 1px 3px 0 rgba(23, 18, 33, 0.04), 0 1px 2px -1px rgba(23, 18, 33, 0.04)`
- **Interactive Hover & Dropdowns:** Elevated tooltips, dropdown menus, and date pickers use a targeted ambient plum shadow:
  `box-shadow: 0 10px 15px -3px rgba(23, 18, 33, 0.08), 0 4px 6px -4px rgba(23, 18, 33, 0.03)`
- **AI Assist Layer:** Subtle luminous violet glow applied to the primary intelligent assistant floating badge:
  `box-shadow: 0 0 12px 0 rgba(117, 70, 232, 0.25)`

## Shapes

The design uses balanced, rounded geometry (`roundedness: 2`) delivering approachable fintech precision without feeling overly playful or rigidly technical.

- **Standard Elements (0.5rem / 8px):** Primary buttons, input fields, dropdown trigger selectors, and table headers.
- **Cards & Data Surfaces (0.75rem to 1rem / 12px - 16px):** Metric dashboard cards, invoice data tables, and modal dialogs.
- **Pills & Status Badges (9999px):** Invoice status chips, AI tool triggers, and counter tags.

## Components

### Buttons
- **Primary Secondary (`#FFD52A`):** Used for transactional creation actions (e.g., "+ Create Invoice"). Bold dark typography (`#171221`), 8px border-radius, 10px 20px padding. Hover: `#F5CB24`.
- **Tertiary AI Assistant Button:** Dark plum/violet pill button with white text, a gradient sheen or glowing border (`#7546E8`), accompanied by an illustrative sparkle icon.
- **Secondary Neutral Button:** Pure white background, 1px solid `#E4E4E7` border, `#171221` text. Used for "Filters", "Sort by", and date range triggers. Hover: `#F8FAFC`.

### Status Badges (Pills)
Small, semi-rounded pill containers (`padding: 4px 10px`, `font-size: 11px`, `font-weight: 600`):
- **Paid:** Green fill text (`#047857`) on soft mint background (`#ECFDF5`), border `#A7F3D0`.
- **Unpaid:** Crimson fill text (`#B91C1C`) on soft blush background (`#FEF2F2`), border `#FECACA`.
- **Partially Paid:** Deep amber text (`#B45309`) on pastel amber background (`#FFFBEB`), border `#FDE68A`.
- **Overdue:** Bright red text with solid light red accent indicator dot.

### Metric / KPI Tabs
Segmented card strip dividing business telemetry (Total Sales, Unpaid, Paid, Partially Paid):
- Pure white container with fine vertical divider lines (`#E4E4E7`).
- Active metric indicated by a 3px bottom violet accent line (`#7546E8`) and deep plum metric text.
- Metric display values strictly rendered in tabular format with `₹` currency indicators.

### Data Tables
- **Header:** Pale cool-grey header background (`#F9FAFB`), subtle bottom border (`#E5E7EB`), with 12px uppercase slate labels (`#64748B`).
- **Rows:** Minimum row height of 52px, alternating row hover states (`#F8FAFC`), vertical alignment centered.
- **Action Columns:** Fixed right-aligned action trigger with low-opacity icon buttons (`Edit`, `Download PDF`, `Share WhatsApp`, `More`).

### Inputs & Date Range Pickers
- **Text Inputs:** Height 40px, `#FFFFFF` background, `#D1D5DB` hairline border, `#171221` input text. Focus state brings a 2px violet ring (`#7546E8`) with 0-offset.
- **Integrated Date Bar:** Dual calendar field showing start date `→` end date enclosed within a unified pill/card selector with calendar glyph.