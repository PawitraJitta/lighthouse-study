import { useState, useEffect, useRef } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────
const STATS = [
  { value: '7.15M', label: 'Agricultural Households', color: 'forest' },
  { value: '#1', label: 'MNC in Thailand CP Market', color: 'gold' },
  { value: '39.8%', label: 'MNC Market Share 2025 H1', color: 'ocean' },
  { value: '$596M', label: 'Total CP Market 2025', color: 'forest' },
]

const PHASES = [
  {
    phase: '01', month: 'May', title: 'Foundation', color: 'forest',
    items: ['Meta Pixel repair', 'GA4 audit', 'Salesforce access', 'Agency KPI framework'],
    status: 'complete',
  },
  {
    phase: '02', month: 'Jun', title: 'Activation', color: 'gold',
    items: ['LINE CRM launch', 'Emplifi dashboard', 'Facebook audit', 'Agency reviews'],
    status: 'active',
  },
  {
    phase: '03', month: 'Jul', title: 'Intelligence', color: 'ocean',
    items: ['Attribution modeling', 'First Lighthouse report', 'Data loop close', 'Global presentation'],
    status: 'upcoming',
  },
]

const SEGMENTS = [
  {
    name: 'Somchai, 63', role: 'Senior Landowner · Rice', pop: '~3.2M farmers · 40%',
    quote: '"I\'ve farmed 40 years. Whatever the shop says, I buy."',
    reach: 'RETAILER FIRST', color: 'from-violet-900/40 to-violet-800/20', border: 'border-violet-500/30',
    glow: 'rgba(124,58,237,0.15)', icon: '🧑‍🌾',
  },
  {
    name: 'Prayong, 47', role: 'Commercial Core · Multi-crop', pop: '~2.8M farmers · 35%',
    quote: '"If it cuts costs, I\'ll try it — but show me proof first."',
    reach: 'DRONE OPS + LINE', color: 'from-sky-900/40 to-sky-800/20', border: 'border-sky-500/30',
    glow: 'rgba(3,105,161,0.15)', icon: '👨‍🌾',
  },
  {
    name: 'Nat, 28', role: 'Agri-Entrepreneur · Drone Op', pop: '~1.2M farmers · 15%',
    quote: '"I track everything on my phone. I need data, not advice."',
    reach: 'DIRECT DIGITAL', color: 'from-emerald-900/40 to-emerald-800/20', border: 'border-emerald-500/30',
    glow: 'rgba(5,150,105,0.15)', icon: '🚁',
  },
]

const FIXES = [
  { icon: '📡', title: 'Digital & Agency Audit', desc: '5 agencies · 47,500 THB managed · overlaps identified', tag: 'Done ✓' },
  { icon: '📅', title: 'Seasonal Content Calendar', desc: '7 crop types × 3 seasons × 5 CP growth stages · 22 campaigns', tag: 'Done ✓' },
  { icon: '⚡', title: 'Agency Automation', desc: 'Auto-consolidates 5 agencies → 1 dashboard · weekly cadence', tag: 'Done ✓' },
  { icon: '🎬', title: 'Photo & Video Guide', desc: 'Cadrasia Field Guide · 34 sales territories · MDO + TMD', tag: 'Done ✓' },
]

const MATURITY = { current: 2.0, target: 4.0, label: 'Digital Maturity Index' }

// ─── Helpers ──────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// ─── Orb Background ───────────────────────────────────────────────────
function OrbBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Primary green orb */}
      <div className="absolute rounded-full opacity-20"
        style={{
          width: '60vw', height: '60vw',
          top: '-15%', left: '-10%',
          background: 'radial-gradient(circle, #00D4AA 0%, #00A651 40%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orbDrift 20s ease-in-out infinite',
        }} />
      {/* Blue orb */}
      <div className="absolute rounded-full opacity-15"
        style={{
          width: '50vw', height: '50vw',
          bottom: '-20%', right: '-10%',
          background: 'radial-gradient(circle, #818CF8 0%, #3B82F6 40%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orbDriftR 25s ease-in-out infinite',
        }} />
      {/* Gold accent orb */}
      <div className="absolute rounded-full opacity-10"
        style={{
          width: '30vw', height: '30vw',
          top: '40%', left: '30%',
          background: 'radial-gradient(circle, #FFD166 0%, #F5A623 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orbDrift 30s ease-in-out infinite reverse',
        }} />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,170,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00A651, #00D4AA)' }}>
            <span className="text-xs font-bold text-white font-display">S</span>
          </div>
          <span className="font-display font-semibold text-sm tracking-wide">Syngenta TH</span>
          <span className="hidden sm:block text-xs text-white/30 font-mono">· Digital Lighthouse</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:block text-xs text-white/40 font-mono">June 2026</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-forest-300 animate-pulse" />
            <span className="text-xs text-white/50">Month 1 Live</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 2500)
    return () => clearInterval(t)
  }, [])

  const words = ['Transformation', 'Intelligence', 'Attribution', 'Activation']

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Scan line */}
      <div className="scan-line" />

      {/* Decorative orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-forest-500/10 orbit" />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-ocean-500/5 orbit-reverse" />
        <div className="absolute w-[1000px] h-[1000px] rounded-full border border-white/[0.02] orbit" style={{ animationDuration: '30s' }} />
      </div>

      {/* Central floating blob */}
      <div className="absolute pointer-events-none"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-forest-500/20 mb-8"
          style={{ animation: 'countUp 0.8s ease forwards' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" />
          <span className="text-xs font-mono text-forest-400 tracking-[0.15em] uppercase">
            Digital Lighthouse Program · Thailand Chapter
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold mb-4 leading-none"
          style={{ animation: 'countUp 0.8s ease 0.1s forwards', opacity: 0 }}>
          <span className="grad-multi">Pawitra</span>
          <br />
          <span className="text-white/90">Jittasen</span>
        </h1>

        {/* Role */}
        <p className="text-lg text-white/50 font-body mb-3"
          style={{ animation: 'countUp 0.8s ease 0.2s forwards', opacity: 0 }}>
          Digital Transformation Lead, Thailand
        </p>

        {/* Rotating keyword */}
        <div className="flex items-center justify-center gap-3 mb-12"
          style={{ animation: 'countUp 0.8s ease 0.3s forwards', opacity: 0 }}>
          <span className="text-white/30 text-sm">Building</span>
          <div className="overflow-hidden h-7">
            <div className="transition-transform duration-700 ease-in-out"
              style={{ transform: `translateY(-${(tick % words.length) * 28}px)` }}>
              {words.map((w, i) => (
                <div key={i} className="h-7 flex items-center">
                  <span className="grad-green font-display font-semibold text-lg">{w}</span>
                </div>
              ))}
            </div>
          </div>
          <span className="text-white/30 text-sm">for Thailand</span>
        </div>

        {/* CTA pills */}
        <div className="flex flex-wrap items-center justify-center gap-3"
          style={{ animation: 'countUp 0.8s ease 0.4s forwards', opacity: 0 }}>
          {['Month 1 in market', 'Deep-dive research', 'First global offsite'].map((tag, i) => (
            <span key={i} className="px-4 py-2 rounded-full text-xs font-mono glass border border-white/10 text-white/60">
              {tag}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-30"
          style={{ animation: 'fadeIn 2s ease 1s forwards', opacity: 0 }}>
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

// ─── Market Stats ─────────────────────────────────────────────────────
function MarketStats() {
  const [ref, inView] = useInView()
  const colorMap = {
    forest: 'from-forest-500/20 to-forest-400/5 border-forest-500/30 text-forest-300',
    gold: 'from-gold-500/20 to-gold-400/5 border-gold-500/30 text-gold-300',
    ocean: 'from-ocean-500/20 to-ocean-400/5 border-ocean-500/30 text-ocean-300',
  }

  return (
    <section ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-mono text-forest-400 tracking-[0.2em] uppercase mb-3">Thailand Market Snapshot</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Agriculture at the<br />
            <span className="grad-green">heart of everything.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i}
              className={`card-lift rounded-2xl border bg-gradient-to-br p-6 glass transition-all duration-700 ${colorMap[s.color] || colorMap.forest}`}
              style={{ transitionDelay: `${i * 0.1}s`, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}>
              <div className={`font-display text-3xl md:text-4xl font-bold mb-2 ${s.color === 'forest' ? 'grad-green' : s.color === 'gold' ? 'grad-gold' : 'text-ocean-300'}`}>
                {s.value}
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Distribution chain visual */}
        <div className={`mt-12 glass rounded-3xl border border-white/5 p-8 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-6">Distribution Chain</p>
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2">
            {[
              { label: 'Syngenta', sub: 'Manufacturer', color: 'bg-forest-500/20 border-forest-500/40 text-forest-300' },
              { arrow: true },
              { label: 'Distributor', sub: 'National', color: 'bg-white/5 border-white/10 text-white/70' },
              { arrow: true },
              { label: 'Retailer', sub: '⚠ Decision point', color: 'bg-gold-500/20 border-gold-500/40 text-gold-300', pulse: true },
              { arrow: true },
              { label: '7.15M Farmers', sub: 'End grower', color: 'bg-ocean-500/20 border-ocean-500/30 text-ocean-300' },
            ].map((node, i) => node.arrow
              ? <div key={i} className="flex-shrink-0 text-white/20 text-xl">→</div>
              : (
                <div key={i} className={`flex-shrink-0 flex-1 min-w-[100px] rounded-xl border px-4 py-3 text-center ${node.color} ${node.pulse ? 'glow-gold' : ''}`}>
                  <div className="font-semibold text-sm">{node.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{node.sub}</div>
                  {node.pulse && <div className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />}
                </div>
              )
            )}
          </div>
          <p className="mt-5 text-xs text-white/30 border-l-2 border-forest-500/40 pl-3">
            80%+ of crop protection purchase decisions are made AT the retailer — Syngenta has no digital presence in this moment.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Grower Segments ──────────────────────────────────────────────────
function GrowerSegments() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-mono text-ocean-400 tracking-[0.2em] uppercase mb-3">Thai Grower Segments</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Three segments.<br />
            <span className="grad-multi">Different trust systems.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {SEGMENTS.map((seg, i) => (
            <div key={i}
              onClick={() => setActive(i)}
              className={`card-lift cursor-pointer rounded-3xl border glass p-6 transition-all duration-500 ${seg.border} ${active === i ? 'scale-[1.02]' : ''}`}
              style={{
                background: active === i ? `linear-gradient(135deg, ${seg.glow} 0%, rgba(255,255,255,0.02) 100%)` : 'rgba(255,255,255,0.03)',
                boxShadow: active === i ? `0 0 40px ${seg.glow}` : 'none',
                transitionDelay: `${i * 0.1}s`,
                opacity: inView ? 1 : 0,
                transform: inView ? `${active === i ? 'scale(1.02)' : 'scale(1)'}` : 'translateY(30px)',
              }}>
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{seg.icon}</div>
                <span className="text-xs font-mono text-white/30 bg-white/5 rounded-full px-3 py-1">{seg.pop}</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-0.5">{seg.name}</h3>
              <p className="text-xs text-white/40 mb-4 font-mono">{seg.role}</p>
              <blockquote className="text-sm text-white/60 italic border-l-2 border-gold-500/40 pl-3 mb-5 leading-relaxed">
                {seg.quote}
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                <span className="text-xs font-mono text-white/30">REACH VIA</span>
              </div>
              <div className="mt-2 text-xs font-bold font-mono tracking-wider" style={{ color: i === 0 ? '#C4B5FD' : i === 1 ? '#7DD3FC' : '#6EE7B7' }}>
                {seg.reach}
              </div>
            </div>
          ))}
        </div>

        {/* Key insight box */}
        <div className={`mt-8 glass rounded-2xl border border-gold-500/20 p-6 transition-all duration-700 delay-500 glow-gold ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs font-mono text-gold-400 tracking-widest">💡 KEY INSIGHT</span>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            Digital transformation here is not about farmer adoption — it's about <strong className="text-white">transforming the trusted intermediaries</strong> (retailer, drone operator) who control the decision.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── 90-Day Phases ────────────────────────────────────────────────────
function Phases() {
  const [ref, inView] = useInView()
  const colorClasses = {
    forest: { border: 'border-forest-500/30', text: 'text-forest-300', bg: 'bg-forest-500/10', dot: 'bg-forest-400' },
    gold: { border: 'border-gold-500/30', text: 'text-gold-300', bg: 'bg-gold-500/10', dot: 'bg-gold-400' },
    ocean: { border: 'border-ocean-500/30', text: 'text-ocean-300', bg: 'bg-ocean-500/10', dot: 'bg-ocean-400' },
  }

  return (
    <section ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-mono text-forest-400 tracking-[0.2em] uppercase mb-3">90-Day Roadmap</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            From foundation to<br />
            <span className="grad-green">transformation</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PHASES.map((ph, i) => {
            const c = colorClasses[ph.color]
            return (
              <div key={i}
                className={`card-lift relative rounded-3xl border glass overflow-hidden transition-all duration-700 ${c.border}`}
                style={{ transitionDelay: `${i * 0.15}s`, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)' }}>
                {/* Active glow */}
                {ph.status === 'active' && (
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at top, rgba(245,166,35,0.08) 0%, transparent 70%)' }} />
                )}
                {/* Top bar */}
                <div className={`h-1 ${ph.status === 'complete' ? 'bg-gradient-to-r from-forest-500 to-forest-400' : ph.status === 'active' ? 'bg-gradient-to-r from-gold-500 to-gold-400 animate-pulse' : 'bg-gradient-to-r from-ocean-500 to-ocean-400 opacity-40'}`} />

                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className={`text-xs font-mono ${c.text} tracking-widest mb-1`}>PHASE {ph.phase}</div>
                      <div className="font-display text-2xl font-bold">{ph.title}</div>
                      <div className="text-xs text-white/30 font-mono mt-0.5">{ph.month} 2026</div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-mono ${c.bg} ${c.text} border ${c.border}`}>
                      {ph.status === 'complete' ? '✓ Done' : ph.status === 'active' ? '⚡ Now' : '→ Next'}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {ph.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ph.status === 'complete' ? 'bg-forest-400' : ph.status === 'active' ? c.dot : 'bg-white/20'}`} />
                        <span className={`text-sm ${ph.status === 'complete' ? 'text-white/70' : ph.status === 'active' ? 'text-white/80' : 'text-white/40'}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Foundation Fixes ─────────────────────────────────────────────────
function FoundationFixes() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col md:flex-row gap-6 items-start mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex-1">
            <p className="text-xs font-mono text-ember-400 tracking-[0.2em] uppercase mb-3">Month 1 Deliverables</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Fixing the<br />
              <span className="shimmer-text">Foundation</span>
            </h2>
          </div>
          <div className="md:max-w-xs">
            <p className="text-sm text-white/40 leading-relaxed">
              Before transforming the market, we needed to fix what was broken inside. Four structural gaps closed in 30 days.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {FIXES.map((fix, i) => (
            <div key={i}
              className="card-lift group glass rounded-2xl border border-white/5 p-6 hover:border-forest-500/30 transition-all duration-500"
              style={{ transitionDelay: `${i * 0.1}s`, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 glass border border-white/10 group-hover:border-forest-500/30 transition-colors">
                  {fix.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-display font-semibold text-base">{fix.title}</h3>
                    <span className="text-xs font-mono text-forest-400 flex-shrink-0 bg-forest-500/10 px-2 py-0.5 rounded-full border border-forest-500/20">{fix.tag}</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{fix.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Maturity gauge */}
        <div className={`mt-8 glass rounded-3xl border border-white/5 p-8 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-1">Digital Maturity Score</p>
              <p className="font-display text-2xl font-bold">
                <span className="grad-green">{MATURITY.current}</span>
                <span className="text-white/20 text-lg">/5.0</span>
                <span className="text-xs font-mono text-white/30 ml-3">→ Target: {MATURITY.target}/5.0</span>
              </p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-xs text-white/30">Month 1 Baseline</p>
              <p className="text-xs text-forest-400 font-mono">+2.0 target delta</p>
            </div>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full progress-bar transition-all duration-1500"
              style={{ width: inView ? `${(MATURITY.current / 5) * 100}%` : '0%', transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1) 0.3s' }} />
          </div>
          <div className="flex justify-between mt-1.5 text-xs text-white/20 font-mono">
            <span>0</span><span>1</span><span>2 ← current</span><span>3</span><span className="text-forest-400">4 ← target</span><span>5</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── North Star ───────────────────────────────────────────────────────
function NorthStar() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="relative z-10 py-32 px-6 overflow-hidden">
      {/* Dramatic glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #00D4AA 0%, #00A651 40%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <p className="text-xs font-mono text-forest-400 tracking-[0.3em] uppercase mb-6">🎯 North Star Metric</p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-white">
          % of grower purchase decisions<br />
          <span className="grad-green">influenced by a Syngenta digital touchpoint</span>
        </h2>
        <p className="text-sm md:text-base text-white/40 max-w-2xl mx-auto leading-relaxed mb-10">
          Everything built in Month 1 is pre-condition infrastructure for this number.
          LINE CRM will produce the first measurable signal in Month 2.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {['Foundation Built', 'Intelligence Ready', 'Loop Starts Now'].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 px-5 py-3 glass rounded-full border border-forest-500/25 glow-green">
              <div className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" />
              <span className="text-sm font-display font-medium text-forest-300">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00A651, #00D4AA)' }}>
            <span className="text-[10px] font-bold text-white font-display">S</span>
          </div>
          <span className="text-xs text-white/30 font-mono">Syngenta Digital Lighthouse · Thailand · June 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/20 font-mono">Pawitra Jittasen · DT Lead</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" />
            <span className="text-xs text-forest-400 font-mono">Live</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen">
      <OrbBg />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <MarketStats />
        <GrowerSegments />
        <Phases />
        <FoundationFixes />
        <NorthStar />
        <Footer />
      </div>
    </div>
  )
}
