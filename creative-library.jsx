// ─── Creative Library ──────────────────────────────────────────────────────
function CreativeMockup({ creative }) {
  if (creative.aspect === 'text') {
    return (
      <div className="creative-preview creative-text-ad">
        <div className="creative-gads-url">example.com › erhverv</div>
        <div className="creative-gads-title">{creative.headline}</div>
        <div className="creative-gads-body">{creative.body}</div>
      </div>
    );
  }
  const isPortrait = creative.aspect === 'portrait';
  return (
    <div className={'creative-preview ' + (isPortrait ? 'creative-portrait' : 'creative-landscape')}
      style={{background: 'linear-gradient(135deg, ' + creative.color1 + ' 0%, ' + creative.color2 + ' 100%)'}}>
      <div className="creative-big-icon">{creative.icon}</div>
      <div className="creative-overlay">
        <div className="creative-headline">{creative.headline}</div>
        {!isPortrait && <div className="creative-body">{creative.body}</div>}
        <div className="creative-cta-btn">{creative.cta} →</div>
      </div>
    </div>
  );
}

const PL_COLOR = { facebook:'#1877F2', instagram:'#E1306C', google:'#EA4335', tiktok:'#010101', linkedin:'#0A66C2' };
const PL_LABEL = { facebook:'Facebook', instagram:'Instagram', google:'Google', tiktok:'TikTok', linkedin:'LinkedIn' };

function CreativeCard({ creative, banks }) {
  const bank = banks.find(b => b.id === creative.bank);
  if (!bank) return null;
  return (
    <div className="creative-card">
      <CreativeMockup creative={creative} />
      <div className="creative-card-body">
        <div className="creative-card-meta">
          <span className="creative-platform-tag" style={{background: (PL_COLOR[creative.platform]||'#888')+'22', color: PL_COLOR[creative.platform]||'#888'}}>
            {PL_LABEL[creative.platform]||creative.platform}
          </span>
          <span className="creative-format-tag">{creative.format}</span>
        </div>
        <div className="creative-headline-text">{creative.headline}</div>
        <div className="creative-body-text">{creative.body}</div>
        <div className="creative-cta-text">CTA: <strong>{creative.cta}</strong></div>
      </div>
    </div>
  );
}

function CreativesLibrary({ visibleBanks, selectedPlatform }) {
  const visibleIds = visibleBanks.map(b => b.id);
  const filtered = typeof CREATIVES !== 'undefined' ? CREATIVES.filter(c =>
    visibleIds.includes(c.bank) &&
    (selectedPlatform === 'all' || c.platform === selectedPlatform)
  ) : [];

  // Group by bank, preserving visibleBanks order
  return (
    <div className="creatives-wrap">
      {visibleBanks.map(bank => {
        const bankCreatives = filtered.filter(c => c.bank === bank.id);
        if (!bankCreatives.length) return null;
        const totalSpend = ['facebook','instagram','google','linkedin','tiktok'].reduce((s,p) => {
          const d = typeof ADS_DATA !== 'undefined' ? ADS_DATA[bank.id]?.[p]?.spend || 0 : 0;
          return s + (selectedPlatform === 'all' || selectedPlatform === p ? d : 0);
        }, 0);
        return (
          <div key={bank.id} className="creatives-bank-section">
            <div className="creatives-bank-header">
              <BankLogo bank={bank} size={28}/>
              <div>
                <div className="creatives-bank-name">{bank.name}</div>
                <div className="creatives-bank-sub">{bankCreatives.length} creative{bankCreatives.length > 1 ? 's' : ''} · est. {Math.round(totalSpend/1000)}K DKK/mo</div>
              </div>
            </div>
            <div className="creatives-grid">
              {bankCreatives.map(c => <CreativeCard key={c.id} creative={c} banks={visibleBanks}/>)}
            </div>
          </div>
        );
      })}
      {filtered.length === 0 && (
        <div style={{padding:'40px',textAlign:'center',color:'var(--muted)'}}>No creatives for this filter.</div>
      )}
    </div>
  );
}

Object.assign(window, { CreativesLibrary });
