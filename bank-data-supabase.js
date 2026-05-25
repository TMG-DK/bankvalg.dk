// bank-data-supabase.js
// Fetches verified pricing from Supabase and patches BANKS_DK packages.
// Must load AFTER bank-data.js and BEFORE the React Babel scripts.
// Sets window.__dbReady (Promise) which resolves when patching is done (or on error).

(function () {
  'use strict';

  var SUPABASE_URL = 'https://yjkhqgnlefwgasbnlcvy.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqa2hxZ25sZWZ3Z2FzYm5sY3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjU1NDAsImV4cCI6MjA5NDM0MTU0MH0.CxuU7xgOW7HiLsju6tByxgiUFuY6ZqNQH3kKiCo_w1I';

  // Gate that the React render script awaits before mounting.
  var resolveReady;
  window.__dbReady = new Promise(function (resolve) { resolveReady = resolve; });

  // ── Formatters ────────────────────────────────────────────────────────────

  // Danish number string: period thousands, comma decimal, up to maxDec places.
  function numDK(n, minDec, maxDec) {
    if (n == null) return '';
    minDec = minDec || 0;
    maxDec = (maxDec != null) ? maxDec : minDec;
    return Number(n).toLocaleString('da-DK', {
      minimumFractionDigits: minDec,
      maximumFractionDigits: maxDec
    });
  }

  function fmtOnboarding(fee) {
    var n = Number(fee);
    return n === 0 ? '0 kr' : numDK(n) + ' kr';
  }

  function fmtMonthly(fee) {
    return numDK(Number(fee)) + ' kr';
  }

  // domestic_included NULL  → return null (keep bank-data.js value)
  // 0 included, X fee      → "X kr/stk"
  // N included, 0 fee      → "N gratis/md"
  // N included, X fee      → "N gratis/md · derefter X kr/stk"
  function fmtDomestic(included, feeExtra) {
    if (included == null) return null; // forhandlet — keep static value
    var inc = Number(included);
    var fee = Number(feeExtra) || 0;
    if (inc === 0) {
      return fee > 0 ? numDK(fee, 0, 2) + ' kr/stk' : 'Gratis';
    }
    if (fee === 0) return numDK(inc) + ' gratis/md';
    return numDK(inc) + ' gratis/md · derefter ' + numDK(fee, 0, 2) + ' kr/stk';
  }

  // intl_included 0, X fee    → "X kr/overf."
  // intl_included 0, 0 fee    → "Kun FX-tillæg"  (no per-tx fee, but FX markup still applies)
  // N included, 0 fee         → "N gratis/md"
  // N included, X fee         → "N gratis/md · derefter X kr/overf."
  // NULL                      → null (keep static bank-data.js value)
  function fmtIntl(included, feePer) {
    if (included == null) return null; // keep static value
    var inc = Number(included);
    var fee = (feePer != null) ? Number(feePer) : 0;
    if (inc === 0) {
      return fee > 0 ? numDK(fee) + ' kr/overf.' : 'Kun FX-tillæg';
    }
    if (fee === 0) return numDK(inc) + ' gratis/md';
    return numDK(inc) + ' gratis/md · derefter ' + numDK(fee) + ' kr/overf.';
  }

  // Revolut: "X% (Y% weekend)" · equal rates: "X%" · different: "X% EU / Y% øvrige"
  function fmtFX(bankId, euPct, otherPct) {
    if (euPct == null) return null; // keep static value
    var eu = Number(euPct);
    var other = (otherPct != null) ? Number(otherPct) : eu;
    var p = function (v) { return numDK(v, 0, 2) + '%'; };
    if (bankId === 'revolut') return p(eu) + ' (' + p(other) + ' weekend)';
    if (eu === other) return p(eu);
    return p(eu) + ' EU / ' + p(other) + ' øvrige';
  }

  // NULL cards   → "Ubegrænset inkl."
  // 0, 0         → "—"
  // 0, X, year   → "X kr/år"
  // 0, X, once   → "X kr/stk (engang)"
  // N, 0         → "N inkl."
  // N, X, year   → "N inkl. · ekstra X kr/år"
  // N, X, once   → "N inkl. · ekstra X kr/stk"
  function fmtPhysical(cardsIncluded, fee, period) {
    if (cardsIncluded == null) return 'Ubegrænset inkl.';
    var inc = Number(cardsIncluded);
    var f = Number(fee) || 0;
    if (inc === 0) {
      if (f === 0) return '—';
      return period === 'one-time'
        ? numDK(f) + ' kr/stk (engang)'
        : numDK(f) + ' kr/år';
    }
    if (f === 0) return numDK(inc) + ' inkl.';
    var extra = period === 'one-time'
      ? 'ekstra ' + numDK(f) + ' kr/stk'
      : 'ekstra ' + numDK(f) + ' kr/år';
    return numDK(inc) + ' inkl. · ' + extra;
  }

  // note set     → return note (display override)
  // NULL         → "Ubegrænset inkl."
  // 0            → "—"
  // N, 0 fee     → "N inkl."
  // N, X fee     → "N inkl. · X kr/stk"
  function fmtDigital(included, fee, note) {
    if (note) return note;
    if (included == null) return 'Ubegrænset inkl.';
    var inc = Number(included);
    var f = Number(fee) || 0;
    if (inc === 0) return '—';
    if (f === 0) return numDK(inc) + ' inkl.';
    return numDK(inc) + ' inkl. · ' + numDK(f, 0, 2) + ' kr/stk';
  }

  // ── Package lookup ────────────────────────────────────────────────────────

  // Finds the pkg object in BANKS_DK by bank_id + package_name (suffix match).
  // E.g. bank_id="danske", package_name="Business One" → finds "Danske Business One"
  function findPkg(bankId, packageName) {
    var banks = (typeof COUNTRY_BANKS !== 'undefined' && COUNTRY_BANKS['DK'])
      ? COUNTRY_BANKS['DK']
      : (typeof BANKS_DK !== 'undefined' ? BANKS_DK : []);
    var bank = banks.find(function (b) { return b.id === bankId; });
    if (!bank) return null;
    return bank.packages.find(function (p) {
      return p.name === packageName
        || p.name.endsWith(' ' + packageName);
    }) || null;
  }

  // ── Patch logic ───────────────────────────────────────────────────────────

  function patchRow(row) {
    var pkg = findPkg(row.bank_id, row.package_name);
    if (!pkg) {
      console.warn('[bankvalg] No pkg match for', row.bank_id, row.package_name);
      return;
    }

    // Fees
    pkg.onboarding = fmtOnboarding(row.onboarding_fee);
    pkg.monthly    = fmtMonthly(row.monthly_fee);
    pkg._monthly   = Number(row.monthly_fee);

    // Domestic transfers (NULL → keep static fallback from bank-data.js)
    var dom = fmtDomestic(row.domestic_included, row.domestic_fee_extra);
    if (dom !== null) {
      pkg.domestic_transfer  = dom; // used by computeAnnualCost + computeRowMonthlyCost
      pkg.domestic_included  = dom; // used by cell renderer (row.id === 'domestic_included')
      pkg._transfer = Number(row.domestic_fee_extra) || 0;
    }

    // International transfers (NULL → keep static fallback from bank-data.js)
    var intl = fmtIntl(row.intl_included, row.intl_fee_per_tx);
    if (intl !== null) {
      pkg.intl_transfer = intl;
      pkg._intl = (row.intl_fee_per_tx != null) ? Number(row.intl_fee_per_tx) : (pkg._intl || 0);
    }

    // FX markup
    var fx = fmtFX(row.bank_id, row.fx_markup_eu_pct, row.fx_markup_other_pct);
    if (fx !== null) pkg.fx_fee = fx;

    // Physical cards (physical_card_extra row — card_fee stays from bank-data.js, has card type name)
    pkg.physical_card_extra = fmtPhysical(
      row.cards_included, row.physical_card_fee, row.physical_card_fee_period
    );

    // Digital cards
    pkg.digital_card_extra = fmtDigital(
      row.digital_cards_included, row.digital_card_fee, row.digital_card_note
    );

    // Support
    if (row.support_type) pkg.support = row.support_type;

    // Credit options (overdraft, business loan, pricing summary)
    if (row.overdraft != null)       pkg.overdraft = row.overdraft;
    if (row.business_loan != null)   pkg.business_loan = row.business_loan;
    if (row.credit_pricing != null)  pkg.credit_pricing = row.credit_pricing;
  }

  // ── Fetch & patch ─────────────────────────────────────────────────────────

  fetch(SUPABASE_URL + '/rest/v1/packages?select=*', {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    }
  })
  .then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  })
  .then(function (rows) {
    rows.forEach(patchRow);
    console.log('[bankvalg] Patched', rows.length, 'packages from Supabase');
    resolveReady(rows.length);
  })
  .catch(function (err) {
    console.warn('[bankvalg] Supabase fetch failed — using static bank-data.js values:', err);
    resolveReady(0);
  });

})();
