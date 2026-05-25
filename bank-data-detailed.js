// BankPicker — Detailed parameter data (28 parameters from research report)
// Values are indicative, grounded in the Nordic SMB research report (late 2025 / early 2026).
// Indicative only — verify directly with the bank.

// ─── Detailed row groups (SUMMARY subset + DETAILED full 28) ────────────────
// Each row id maps to a property on each package in BANKS_DK_DETAILED below.
// The `summary: true` flag marks rows that appear in the compact view.

const ROW_GROUPS_DETAILED = [
  { id: 'fees', label: 'Fees', summary: true, rows: [
    { id: 'onboarding', summary: true, tooltip: 'Establishment / setup fee, one-off' },
    { id: 'monthly', summary: true, tooltip: 'Fixed monthly subscription, excl. VAT' },
    { id: 'fee_waiver_threshold', tooltip: 'Avg. balance that waives monthly fee' },
    { id: 'overage_domestic', tooltip: 'Per-transfer fee above included quota' },
    { id: 'compliance_fee', tooltip: 'One-off KYC / EDD onboarding fee' },
  ]},

  { id: 'tier_gates', label: 'Tier & segmentation', rows: [
    { id: 'target_revenue', tooltip: 'Revenue band this package is anchored for' },
    { id: 'target_fte', tooltip: 'FTE band this package is anchored for' },
    { id: 'tier_migration', tooltip: 'Triggers that push you into the next tier' },
    { id: 'lifecycle_promo', tooltip: 'Start-up / new-customer promo terms' },
  ]},

  { id: 'transfers', label: 'Transfers', summary: true, rows: [
{ id: 'domestic_included', tooltip: 'Free domestic transfers included / month' },
    { id: 'intl_transfer', summary: true, tooltip: 'SWIFT / non-SEPA outbound flat fee' },
    { id: 'sepa_transfer', tooltip: 'SEPA EUR transfer (regulated at parity)' },
    { id: 'instant_transfer', tooltip: 'SCT Inst pricing (IPR parity)' },
    { id: 'incoming_transfer', tooltip: 'Per inbound credit transfer / direct debit' },
  ]},

  { id: 'fx', label: 'FX & multi-currency', rows: [
    { id: 'fx_fee', summary: true, tooltip: 'Markup over mid-market on majors' },
    { id: 'fx_currencies', tooltip: 'Currency pairs supported' },
    { id: 'fx_forwards', tooltip: 'FX forwards / swaps for local entity' },
    { id: 'multi_iban', tooltip: 'Local IBANs available across jurisdictions' },
  ]},

  { id: 'cards', label: 'Cards & acceptance', summary: true, rows: [
    { id: 'card_fee', summary: true, tooltip: 'Annual fee per business card' },
    { id: 'cards_included', tooltip: 'Cards included in package before uplift' },
    { id: 'card_fx_markup', tooltip: 'Markup on non-base-currency card spend' },
    { id: 'metal_cards', tooltip: 'Metal / premium card tier' },
    { id: 'virtual_cards', tooltip: 'Virtual single-use & per-user cards' },
    { id: 'acquiring', tooltip: 'Merchant acquiring / terminal offering' },
    { id: 'mobilepay', summary: true, tooltip: 'Local mobile wallet (MobilePay / Swish / Vipps)' },
  ]},

  { id: 'credit', label: 'Credit products', rows: [
    { id: 'overdraft', tooltip: 'Kassekredit / checkkredit / driftskredit' },
    { id: 'business_loan', tooltip: 'Working-capital / term loan access' },
    { id: 'invoice_finance', tooltip: 'Factoring / invoice discounting' },
    { id: 'leasing', tooltip: 'Equipment / vehicle leasing' },
    { id: 'mortgage_bundle', tooltip: 'Mortgage or real-estate bundle rebate' },
  ]},

  { id: 'cash_deposits', label: 'Cash & deposits', rows: [
    { id: 'cash_handling', tooltip: 'In-branch / CIT cash handling fees' },
    { id: 'deposit_interest', tooltip: 'Interest on operating balance (ADB)' },
    { id: 'sweep_account', tooltip: 'Automated sweep / MMF add-on' },
  ]},

  { id: 'services', label: 'Digital & services', summary: true, rows: [
    { id: 'netbank', summary: true, tooltip: 'Business netbank & mobile app' },
    { id: 'api', summary: true, tooltip: 'Regulatory PSD2 / premium API access' },
    { id: 'accounting_integrations', tooltip: 'Native accounting / ERP integrations' },
    { id: 'payroll', summary: true, tooltip: 'Cost per payslip / salary run' },
    { id: 'invoicing', tooltip: 'Invoicing, Peppol, e-invoicing tools' },
    { id: 'expense_mgmt', tooltip: 'Expense management / receipt capture' },
    { id: 'multi_user', tooltip: 'Extra users, roles, 4-eyes approval, SSO' },
  ]},

  { id: 'service_model', label: 'Advisory & service', summary: true, rows: [
    { id: 'advisory_model', tooltip: 'RM / digital / hybrid coverage model' },
    { id: 'physical_branch', summary: true, tooltip: 'In-branch service access' },
    { id: 'support', summary: true, tooltip: 'Support channels, SLA, hours' },
    { id: 'languages', tooltip: 'Local-language service coverage' },
  ]},

  { id: 'icp', label: 'ICP & compliance', rows: [
    { id: 'legal_structures', tooltip: 'Supported legal structures' },
    { id: 'industry_appetite', tooltip: 'Industries accepted / high-friction / no-go' },
    { id: 'group_structure', tooltip: 'Subsidiary / holding / treasury support' },
    { id: 'kyc_time', tooltip: 'Typical onboarding time' },
  ]},

  { id: 'extras', label: 'Killer features', summary: true, rows: [
    { id: 'killer_features', summary: true, tooltip: 'Unique perks — can be the tie-breaker' },
  ]},
];

// ─── Detailed data per Danish bank package ──────────────────────────────────
// Grounded in the research report (Section 2.1–2.5) with indicative numbers.
// Non-summary fields are plain strings shown in detailed view.

// Sources verified 2026-04-25 from official prislister: danskebank.dk,
// nordea.dk, revolut.com/da-DK, lunar.app/dk/erhverv, nykredit.dk.
// Fields marked "Forhandlet" are not disclosed in public prislister.
const DETAIL_OVERRIDES = {
  danske: {
    'Danske Business One': {
      fee_waiver_threshold: '—', overage_domestic: 'Forhandlet',
      compliance_fee: '0 kr standard',
      target_revenue: '<5M kr', target_fte: '0–2',
      tier_migration: 'FTE >2 eller >100 tx/mo',
      lifecycle_promo: 'Setup 1.500 kr standard',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: '0 kr',
      fx_currencies: 'DKK', fx_forwards: 'Nej', multi_iban: 'DKK only',
      cards_included: '1 Mastercard Business Debit', card_fx_markup: '1,0% EU / 1,5% øvrige',
      metal_cards: 'Nej', virtual_cards: 'Nej',
      acquiring: 'Via Nets/AltaPay',
      overdraft: 'Ja (kassekredit)', business_loan: 'Ja',
      invoice_finance: 'Ja (Fakturabelåning)', leasing: 'Nordania Finans / Blue',
      mortgage_bundle: 'Realkredit Danmark',
      cash_handling: 'I filial og udvalgte automater', deposit_interest: 'Variabel',
      sweep_account: 'Nej',
      accounting_integrations: 'Zenegy (via partner)',
      invoicing: 'Basic', expense_mgmt: 'Via Zenegy',
      multi_user: '1 bruger',
      advisory_model: 'Telefon/online (Erhverv Direkte)', languages: 'DA, EN',
      legal_structures: 'ENK, ApS, A/S',
      industry_appetite: 'Standard; begrænset for udenlandsk ejede',
      group_structure: 'Ja', kyc_time: '<48 timer',
    },
    'Danske Business Plus': {
      fee_waiver_threshold: '—', overage_domestic: '1 kr',
      compliance_fee: '1.500 kr standard',
      target_revenue: '5–30M kr', target_fte: '2–10',
      tier_migration: 'FTE >10 eller >5 konti',
      lifecycle_promo: 'Standard setup',
      sepa_transfer: '0 kr', instant_transfer: '1 kr',
      incoming_transfer: '0 kr',
      fx_currencies: '30+', fx_forwards: 'Ja',
      multi_iban: 'DKK + EUR/USD/GBP m.fl.',
      cards_included: '1 Mastercard Business Debit (op til 5 konti)', card_fx_markup: '1,0% EU / 1,5% øvrige',
      metal_cards: 'Mastercard Corporate', virtual_cards: 'Forhandlet',
      acquiring: 'AltaPay/Nets',
      overdraft: 'Ja', business_loan: 'Ja',
      invoice_finance: 'Ja', leasing: 'Ja',
      mortgage_bundle: 'Realkredit Danmark',
      cash_handling: 'Filial + automater', deposit_interest: 'Variabel',
      sweep_account: 'Forhandlet',
      accounting_integrations: 'Zenegy + ERP via District (e-conomic, Dinero, Visma, Uniconta)',
      invoicing: 'Inkl.',
      expense_mgmt: 'Zenegy + Mastercard Corporate',
      multi_user: 'Flere brugere',
      advisory_model: 'Hybrid', languages: 'DA, EN',
      legal_structures: 'Alle',
      industry_appetite: 'Bredt',
      group_structure: 'Ja', kyc_time: '<48 timer',
    },
    'Danske Business Pro': {
      fee_waiver_threshold: '—', overage_domestic: '1 kr',
      compliance_fee: '1.500 kr standard',
      target_revenue: '30–250M kr', target_fte: '10–50+',
      tier_migration: 'FTE >50 → LC&I',
      lifecycle_promo: 'Forhandlet',
      sepa_transfer: '0 kr', instant_transfer: '1 kr',
      incoming_transfer: '0 kr',
      fx_currencies: '30+', fx_forwards: 'Ja, dedicated FX-desk',
      multi_iban: 'DKK + udenlandske via konto i udlandet',
      cards_included: 'Mastercard Corporate Gold (1.045 kr/år)', card_fx_markup: '1,0% EU / 1,5% øvrige',
      metal_cards: 'Mastercard Gold/Platinum', virtual_cards: 'Ja',
      acquiring: 'AltaPay',
      overdraft: 'Ja', business_loan: 'Ja',
      invoice_finance: 'Ja', leasing: 'Ja',
      mortgage_bundle: 'Realkredit + ejendomsfinansiering',
      cash_handling: 'Fuld', deposit_interest: 'Forhandlet',
      sweep_account: 'Ja',
      accounting_integrations: 'Zenegy + ERP via District',
      invoicing: 'Fuld',
      expense_mgmt: 'Mastercard Corporate + District',
      multi_user: 'Frit antal i District',
      advisory_model: 'Dedikeret rådgiver', languages: 'DA, EN',
      legal_structures: 'Alle inkl. koncern',
      industry_appetite: 'Bredt + sektorspecialister',
      group_structure: 'Ja', kyc_time: '<48 timer',
    },
  },

  nordea: {
    'Nordea Business Base': {
      fee_waiver_threshold: '—', overage_domestic: 'Forhandlet',
      compliance_fee: '0 kr',
      target_revenue: '<50M kr', target_fte: '1–25',
      tier_migration: 'Forhandlet',
      lifecycle_promo: '75 kr/md ved privatbankbundle',
      sepa_transfer: 'Inkl.', instant_transfer: '8 kr',
      incoming_transfer: '1,25 kr',
      fx_currencies: '20+ via valutakonto', fx_forwards: 'Ja',
      multi_iban: 'DKK + valutakonti',
      cards_included: '1 firmakort + tilkøb (150 kr/år ekstra)', card_fx_markup: '1,17% EU / 1,99% øvrige',
      metal_cards: 'First Card Executive (1.295 kr/år)', virtual_cards: 'Forhandlet',
      acquiring: 'Nordea Merchant Services',
      overdraft: 'Ja', business_loan: 'Ja',
      invoice_finance: 'Ja (Nordea Finance Factoring)', leasing: 'Ja',
      mortgage_bundle: 'Nordea Kredit',
      cash_handling: '10 kr (automat) / 40 kr (valuta)', deposit_interest: 'Variabel',
      sweep_account: 'Ja',
      accounting_integrations: 'Uniconta, Intercount, Bankintegration, Corpay One, Fenerum, HallerupNet',
      invoicing: 'Basic', expense_mgmt: 'First Card + partnere',
      multi_user: 'Ubegrænset (RBAC + revisor-kik)',
      advisory_model: 'Hybrid + RM', languages: 'DA, EN',
      legal_structures: 'Alle',
      industry_appetite: 'Bredt',
      group_structure: 'Ja', kyc_time: '~2 uger',
    },
  },

  revolut: {
    Basic: {
      fee_waiver_threshold: '—', overage_domestic: 'Pr. transfer over 5/md',
      compliance_fee: '0 kr',
      target_revenue: '<2M kr', target_fte: '0–2',
      tier_migration: 'Transfers/FX >5/md → Grow',
      lifecycle_promo: '1 md gratis (til 31.12.2026)',
      sepa_transfer: '0 kr (allowance)', instant_transfer: '0 kr',
      incoming_transfer: 'Ubegrænset gratis',
      fx_currencies: '35+', fx_forwards: 'Nej',
      multi_iban: 'LT IBAN + UK/EUR lokale',
      cards_included: '1 fysisk + 200 virtuelle', card_fx_markup: '0,6% (1% weekend)',
      metal_cards: 'Tilkøb', virtual_cards: 'Ja (200)',
      acquiring: 'Revolut Reader / Tap to Pay',
      overdraft: 'Nej', business_loan: 'Nej',
      invoice_finance: 'Nej', leasing: 'Nej',
      mortgage_bundle: 'Nej',
      cash_handling: '2% ATM-gebyr', deposit_interest: 'Variabel (vault)',
      sweep_account: 'Nej',
      accounting_integrations: 'Xero, QuickBooks, Slack, Zapier',
      invoicing: 'Basic', expense_mgmt: 'Inkl. (RBAC + per-employee cards)',
      multi_user: 'Ubegrænset',
      advisory_model: 'Digital chat 24/7', languages: 'EN, DA-app',
      legal_structures: 'ApS, A/S (ikke ENK/velgørenhed)',
      industry_appetite: 'Digital-først; ingen offentlige/andelsselskaber',
      group_structure: 'Ja (multi-entity)', kyc_time: '~24 timer',
    },
    Grow: {
      fee_waiver_threshold: '—', overage_domestic: 'Pr. transfer over 100/md',
      compliance_fee: '0 kr',
      target_revenue: '2–15M kr', target_fte: '2–10',
      tier_migration: 'Transfers >100 → Scale',
      lifecycle_promo: '1 md gratis; op til 7% rabat årlig',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: 'Ubegrænset gratis',
      fx_currencies: '35+', fx_forwards: 'Nej',
      multi_iban: 'LT IBAN + lokale',
      cards_included: '1 metal + 200 virtuelle', card_fx_markup: '0,6% (under allowance)',
      metal_cards: '1 inkl.', virtual_cards: 'Ja (200)',
      acquiring: 'Revolut Reader + Pay',
      overdraft: 'Nej', business_loan: 'Nej',
      invoice_finance: 'Nej', leasing: 'Nej',
      mortgage_bundle: 'Nej',
      cash_handling: '2% ATM-gebyr', deposit_interest: 'Flexible Cash Funds',
      sweep_account: 'Ja',
      accounting_integrations: 'Xero, QuickBooks, Slack, Zapier',
      invoicing: 'Inkl.', expense_mgmt: 'Inkl. + bulk payments',
      multi_user: 'Ubegrænset',
      advisory_model: 'Digital chat 24/7', languages: 'EN, DA-app',
      legal_structures: 'ApS, A/S',
      industry_appetite: 'Digital-først',
      group_structure: 'Ja', kyc_time: '~24 timer',
    },
    Scale: {
      fee_waiver_threshold: '—', overage_domestic: 'Pr. transfer over 1.000/md',
      compliance_fee: '0 kr',
      target_revenue: '15–75M kr', target_fte: '10–50',
      tier_migration: 'Custom → Enterprise',
      lifecycle_promo: 'Op til 33% rabat årlig',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: 'Ubegrænset gratis',
      fx_currencies: '35+', fx_forwards: 'Nej',
      multi_iban: 'LT + lokale',
      cards_included: '2 metal + ubegr. virtuelle', card_fx_markup: '0,6% (under allowance)',
      metal_cards: '2 inkl. + personalisering', virtual_cards: 'Ubegrænset',
      acquiring: 'Revolut Reader + Pay',
      overdraft: 'Nej', business_loan: 'Nej',
      invoice_finance: 'Nej', leasing: 'Nej',
      mortgage_bundle: 'Nej',
      cash_handling: '2% ATM-gebyr', deposit_interest: 'Flexible Cash Funds',
      sweep_account: 'Ja, avanceret',
      accounting_integrations: 'Alle majors + API',
      invoicing: 'Avanceret', expense_mgmt: 'Pro + policy engine',
      multi_user: 'Ubegrænset + roles',
      advisory_model: 'Prioritet chat 24/7', languages: 'EN, DA-app',
      legal_structures: 'Alle',
      industry_appetite: 'Digital-først',
      group_structure: 'Ja, multi-entity', kyc_time: '~24 timer',
    },
  },

  lunar: {
    'Lunar Business Simple': {
      fee_waiver_threshold: '—', overage_domestic: '3 kr',
      compliance_fee: '1.495 kr (oprettelse)',
      target_revenue: '<2M kr', target_fte: '0–2',
      tier_migration: 'Behov for ekstra brugere → Essential',
      lifecycle_promo: '50% rabat første 6 mdr (nye virksomheder)',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: '0 kr',
      fx_currencies: 'DKK, SEK, NOK, EUR + 0,5% øvrige', fx_forwards: 'Nej',
      multi_iban: 'DKK only',
      cards_included: '1 digitalt Visa', card_fx_markup: '0,5%',
      metal_cards: 'Nej', virtual_cards: 'Ja',
      acquiring: 'Via Flatpay (rabat)',
      overdraft: 'Nej', business_loan: 'Via Froda/Qred (5k–3M kr)',
      invoice_finance: 'Nej', leasing: 'Nej',
      mortgage_bundle: 'Nej',
      cash_handling: 'Nej (kun ATM)', deposit_interest: '0 %',
      sweep_account: 'Nej',
      accounting_integrations: 'Nej (kun Essential/Limitless)',
      invoicing: 'Basic', expense_mgmt: 'Kvitterings-billede',
      multi_user: '1 bruger',
      advisory_model: 'Chat/telefon', languages: 'DA, EN',
      legal_structures: 'ENK, ApS (dansk skattepligt)',
      industry_appetite: 'Digital SMB',
      group_structure: 'Ja', kyc_time: '<3 hverdage',
    },
    'Lunar Business Essential': {
      fee_waiver_threshold: '—', overage_domestic: '3 kr',
      compliance_fee: '0 kr',
      target_revenue: '2–10M kr', target_fte: '2–10',
      tier_migration: 'Ubegrænset behov → Limitless',
      lifecycle_promo: 'Kampagner forekommer',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: '0 kr',
      fx_currencies: 'DKK, SEK, NOK, EUR + 0,5% øvrige', fx_forwards: 'Nej',
      multi_iban: 'DKK only',
      cards_included: '3 Visa-kort', card_fx_markup: '0,5%',
      metal_cards: 'Nej', virtual_cards: 'Ja',
      acquiring: 'Via Flatpay (rabat)',
      overdraft: 'Nej', business_loan: 'Via Froda/Qred',
      invoice_finance: 'Nej', leasing: 'Nej',
      mortgage_bundle: 'Nej',
      cash_handling: 'Nej', deposit_interest: '0 %',
      sweep_account: 'Nej',
      accounting_integrations: 'Dinero, Billy, e-conomic (gratis)',
      invoicing: 'Inkl. + auto-momskonto',
      expense_mgmt: 'Auto-bogføring + AI',
      multi_user: '3 (1 ejer + 2 admin)',
      advisory_model: 'Chat/telefon', languages: 'DA, EN',
      legal_structures: 'ENK, ApS, A/S',
      industry_appetite: 'Digital SMB',
      group_structure: 'Ja', kyc_time: '<3 hverdage',
    },
    'Lunar Business Limitless': {
      fee_waiver_threshold: '—', overage_domestic: '0 kr (ubegrænset)',
      compliance_fee: '0 kr',
      target_revenue: '10M+ kr', target_fte: '10+',
      tier_migration: '—',
      lifecycle_promo: 'Årlig rabat ~17%',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: '0 kr',
      fx_currencies: 'DKK, SEK, NOK, EUR + 0,5% øvrige', fx_forwards: 'Nej',
      multi_iban: 'DKK only',
      cards_included: 'Ubegrænset Visa-kort', card_fx_markup: '0,5%',
      metal_cards: 'Nej', virtual_cards: 'Ja',
      acquiring: 'Via Flatpay (rabat)',
      overdraft: 'Nej', business_loan: 'Via Froda/Qred',
      invoice_finance: 'Nej', leasing: 'Nej',
      mortgage_bundle: 'Nej',
      cash_handling: 'Nej', deposit_interest: '+0,75% op til 5M kr',
      sweep_account: 'Ja (savings)',
      accounting_integrations: 'Dinero, Billy, e-conomic (gratis)',
      invoicing: 'Inkl. + auto-momskonto',
      expense_mgmt: 'Auto + udgiftspolitik',
      multi_user: 'Ubegrænset (op til 3 ekstra admin)',
      advisory_model: 'Chat/telefon (7 dage/uge)', languages: 'DA, EN',
      legal_structures: 'Alle',
      industry_appetite: 'Digital SMB',
      group_structure: 'Ja', kyc_time: '<3 hverdage',
    },
  },

  nykredit: {
    'Nykredit Enkel': {
      fee_waiver_threshold: '—', overage_domestic: 'Pr. transfer over 20/md',
      compliance_fee: '3.000 kr (waives ved boligbundle)',
      target_revenue: '<5M kr', target_fte: '0–5',
      tier_migration: '>20 transfers/md → Plus',
      lifecycle_promo: 'Setup-rabat ved samtidig lån/realkredit',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: '0 kr',
      fx_currencies: '20+ via tilkøb', fx_forwards: 'Ja (begrænset)',
      multi_iban: 'DKK + valutakonto tilkøb',
      cards_included: '1 Mastercard Business Debit', card_fx_markup: '1,0% EU / 1,5% øvrige',
      metal_cards: 'Mastercard Business Platinum', virtual_cards: 'Nej',
      acquiring: 'Nej (henviser)',
      overdraft: 'Ja (kassekredit)', business_loan: 'Ja (Cibor, F-kort, fastforrentet)',
      invoice_finance: 'Forhandlet', leasing: 'Nykredit Leasing',
      mortgage_bundle: 'Erhvervsrealkredit (markedsleder)',
      cash_handling: 'Filial', deposit_interest: 'Variabel (Aftaleindskud)',
      sweep_account: 'Cash Pool / saldonetting',
      accounting_integrations: 'Bank Connect (EDIFACT)',
      invoicing: 'Basic',
      expense_mgmt: 'Nykredit Expense Manager (tilkøb)',
      multi_user: '1 bruger',
      advisory_model: 'Filial + sektorrådgiver', languages: 'DA',
      legal_structures: 'Alle',
      industry_appetite: 'Ejerleder, ejendom, landbrug, sundhed',
      group_structure: 'Ja', kyc_time: '5–10 dage',
    },
    'Nykredit Plus': {
      fee_waiver_threshold: '—', overage_domestic: 'Pr. transfer over 60/md',
      compliance_fee: '3.000 kr (waives ved bundle)',
      target_revenue: '5–20M kr', target_fte: '5–15',
      tier_migration: '>60 transfers → Total',
      lifecycle_promo: 'BoligBank 360/365: 165 kr/md',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: '0 kr',
      fx_currencies: '20+', fx_forwards: 'Ja',
      multi_iban: 'DKK + valutakonti',
      cards_included: '3 Mastercard Business Debit', card_fx_markup: '1,0% EU / 1,5% øvrige',
      metal_cards: 'Mastercard Business', virtual_cards: 'Nej',
      acquiring: 'Nej',
      overdraft: 'Ja', business_loan: 'Ja',
      invoice_finance: 'Ja', leasing: 'Nykredit Leasing',
      mortgage_bundle: 'Erhvervsrealkredit + ErhvervsKroner',
      cash_handling: 'Filial', deposit_interest: 'Variabel',
      sweep_account: 'Cash Pool',
      accounting_integrations: 'Bank Connect rabat + Corpay One (60 mdr betalinger)',
      invoicing: 'Inkl.', expense_mgmt: 'Tilkøb',
      multi_user: '3 brugere',
      advisory_model: 'Dedikeret rådgiver', languages: 'DA',
      legal_structures: 'Alle',
      industry_appetite: 'Bredt + sektorspecialer',
      group_structure: 'Ja (gratis ved branchekoder 642110/642120/642130/649910/649990)',
      kyc_time: '5–10 dage',
    },
    'Nykredit Total': {
      fee_waiver_threshold: '—', overage_domestic: 'Pr. transfer over 400/md',
      compliance_fee: '3.000 kr',
      target_revenue: '20–100M kr', target_fte: '10–50',
      tier_migration: '>400 transfers → Total Ekstra (105 kr/md)',
      lifecycle_promo: '—',
      sepa_transfer: '0 kr', instant_transfer: '0 kr',
      incoming_transfer: '0 kr',
      fx_currencies: '20+', fx_forwards: 'Ja',
      multi_iban: 'DKK + valutakonti',
      cards_included: '10 Mastercard Business Debit', card_fx_markup: '1,0% EU / 1,5% øvrige',
      metal_cards: 'Mastercard Business Platinum', virtual_cards: 'Forhandlet',
      acquiring: 'Nej',
      overdraft: 'Ja', business_loan: 'Ja',
      invoice_finance: 'Ja', leasing: 'Nykredit Leasing',
      mortgage_bundle: 'Erhvervsrealkredit + ErhvervsKroner',
      cash_handling: 'Filial', deposit_interest: 'Variabel',
      sweep_account: 'Cash Pool',
      accounting_integrations: 'Bank Connect inkl. + Corpay One (100 mdr betalinger)',
      invoicing: 'Fuld', expense_mgmt: 'Nykredit Expense Manager',
      multi_user: '10 brugere',
      advisory_model: 'Dedikeret rådgiver + sektor', languages: 'DA',
      legal_structures: 'Alle inkl. holding (gratis)',
      industry_appetite: 'Bredt',
      group_structure: 'Ja, gratis holding-tilvalg + Total Ekstra (105 kr/md)',
      kyc_time: '5–10 dage',
    },
  },
};

// ─── Enhanced scoring using expanded answers ─────────────────────────────────
// Uses: txMonth, needsIntl, needsBranch, budget, needsApi, needsPayroll,
//       revenueNow, revenueNext, fte, adb, fxVolume, cashIntensive, subsidiaries, industry

function scorePackageDetailed(pkg, bank, answers) {
  let score = 100;
  const midD = v => Array.isArray(v) ? (v[0] + v[1]) / 2 : v;
  const {
    needsIntl = false, needsBranch = false,
    needsApi = false, needsPayroll = false,
    cashIntensive = false,
    subsidiaries = 0, industryRisk = 'low', priority = 'pris',
  } = answers;
  const txMonth = midD(answers.txMonth) ?? 30;
  const revenueNow = midD(answers.revenueNow) ?? 5;
  const revenueNext = midD(answers.revenueNext) ?? 8;
  const fte = midD(answers.fte) ?? 3;
  const adb = midD(answers.adb) ?? 100;
  const fxVolume = midD(answers.fxVolume) ?? 0;

  // 1. Cost — only weighted when the user explicitly prioritizes price.
  // Cost transparency lives in the Y1/Y2/Y3 price-estimate rows in the table.
  const monthlyCost = pkg._monthly + (txMonth * pkg._transfer) + (needsIntl ? pkg._intl * 5 : 0);
  if (priority === 'pris') {
    // Graded: ~85 kr → +10, 300 kr → 0, 770 kr → -16
    score += Math.round(10 - monthlyCost / 30);
  }

  // 2. Revenue / tier fit (research: T0 <0.5M, T1 0.5–10M, T2 10–50M, T3 50–250M)
  const peakRevenue = Math.max(revenueNow, revenueNext);
  const tierMatch = {
    // Danske
    'Danske Business One': [0, 5],
    'Danske Business Plus': [5, 30],
    'Danske Business Pro': [30, 250],
    // Nordea (single SMB package)
    'Nordea Business Base': [0, 50],
    // Revolut
    Basic: [0, 2],
    Grow: [2, 15],
    Scale: [15, 75],
    // Lunar
    'Lunar Business Simple': [0, 2],
    'Lunar Business Essential': [2, 10],
    'Lunar Business Limitless': [10, 100],
    // Nykredit
    'Nykredit Enkel': [0, 5],
    'Nykredit Plus': [5, 20],
    'Nykredit Total': [20, 100],
  };
  const range = tierMatch[pkg.name];
  if (range) {
    if (peakRevenue >= range[0] && peakRevenue <= range[1]) score += 15;
    else if (peakRevenue < range[0]) score -= 8; // overkill
    else score -= 20; // undersized — you'll outgrow it
  }

  // 3. FTE / payroll
  if (fte > 5 && pkg.payroll === '—') score -= 15;
  if (needsPayroll && pkg.payroll === '—') score -= 20;

  // 4. Branch
  if (needsBranch && !pkg._hasBranch) score -= 35;
  if (!needsBranch && !pkg._hasBranch) score += 6;

  // 5. API
  if (needsApi && pkg._hasApi) score += 14;
  if (needsApi && !pkg._hasApi) score -= 18;

  // 6. International / FX
  if (needsIntl && pkg._intl <= 10) score += 10;
  if (needsIntl && pkg._intl > 30) score -= 8;
  if (fxVolume > 50 && bank.id === 'revolut') score += 12;
  if (fxVolume > 50 && ['danske','nordea','nykredit'].includes(bank.id)) score -= 6;

  // 7. Cash handling
  if (cashIntensive && ['revolut','lunar'].includes(bank.id)) score -= 30;
  if (cashIntensive && pkg._hasBranch) score += 8;

  // 8. Subsidiaries / group
  if (subsidiaries > 1 && bank.id === 'revolut' && pkg.name === 'Basic') score -= 10;
  if (subsidiaries > 1 && bank.id === 'lunar' && pkg.name === 'Lunar Business Simple') score -= 10;
  if (subsidiaries > 1 && bank.id === 'nykredit' && (pkg.name === 'Nykredit Plus' || pkg.name === 'Nykredit Total')) score += 8;
  if (subsidiaries > 1 && pkg.name === 'Danske Business Pro') score += 8;
  if (subsidiaries > 1 && pkg.name === 'Danske Business Plus') score += 4;

  // 9. Industry risk
  if (industryRisk === 'high' && ['revolut','lunar'].includes(bank.id)) score -= 25;
  if (industryRisk === 'high' && pkg._hasBranch) score += 5;

  // 10. ADB / deposit NII — higher ADB favors challengers w/ deposit interest
  if (adb > 500 && bank.id === 'lunar' && pkg.name === 'Lunar Business Limitless') score += 8;
  if (adb > 1000 && bank.id === 'revolut' && (pkg.name === 'Grow' || pkg.name === 'Scale')) score += 6;

  // 11. Priority-based nudges
  if (priority === 'service' && pkg._hasBranch) score += 8;
  if (priority === 'features' && pkg.killer_features && pkg.killer_features.length >= 4) score += 10;

  return Math.max(0, Math.round(score));
}

Object.assign(window, { ROW_GROUPS_DETAILED, DETAIL_OVERRIDES, scorePackageDetailed });
