import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  Copy,
  ExternalLink,
  Layers3,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import { sourcePosts, tokenConfig } from './config'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className="logo" href="#top" aria-label="Pump Lolly Pop home">
      <span className="logo-mark" aria-hidden="true">
        <span />
      </span>
      {!compact && (
        <span className="logo-type">
          PUMP <b>LOLLY POP</b>
        </span>
      )}
    </a>
  )
}

function Button({
  children,
  href,
  secondary = false,
  disabled = false,
}: {
  children: React.ReactNode
  href: string
  secondary?: boolean
  disabled?: boolean
}) {
  if (disabled) {
    return (
      <span className={`button ${secondary ? 'button-secondary' : ''} disabled`} aria-disabled="true">
        {children}
      </span>
    )
  }
  return (
    <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href}>
      {children}
    </a>
  )
}

function LollipopOrbit() {
  const reduced = useReducedMotion()
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <motion.div
        className="floating-pill pill-usdc"
        animate={reduced ? undefined : { y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <span className="mini-token usdc-token">$</span> USDC
      </motion.div>
      <motion.div
        className="floating-pill pill-pump"
        animate={reduced ? undefined : { y: [0, 12, 0], rotate: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut' }}
      >
        <span className="mini-token pump-token">P</span> $PUMP
      </motion.div>
      <motion.div
        className="lollipop"
        initial={{ rotate: -7, scale: 0.9 }}
        animate={reduced ? { scale: 1 } : { rotate: [-7, 5, -7], scale: [0.96, 1.02, 0.96] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      >
        <div className="lolly-head">
          <div className="lolly-swirl" />
          <span className="lolly-glint" />
        </div>
        <div className="lolly-stick" />
      </motion.div>
      <div className="art-label">
        <span>PAIR ROUTE</span>
        USDC → PUMP → LOLLY
      </div>
    </div>
  )
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flow-arrow">
      <span>{label}</span>
      <div className="arrow-line">
        <i />
        <ArrowRight size={18} />
      </div>
    </div>
  )
}

function SwapFlow() {
  const [amount, setAmount] = useState(1000)
  return (
    <div className="swap-demo">
      <div className="demo-topbar">
        <div>
          <span className="eyebrow">LIVE EXPLAINER</span>
          <h3>Follow one buy</h3>
        </div>
        <div className="amount-switch" aria-label="Trade amount">
          {[100, 500, 1000].map((value) => (
            <button className={amount === value ? 'active' : ''} onClick={() => setAmount(value)} key={value}>
              ${value.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
      <div className="swap-route">
        <div className="route-node">
          <span className="node-index">01</span>
          <div className="token-icon usdc-token">$</div>
          <strong>USDC</strong>
          <small>Trader pays</small>
          <b>${amount.toLocaleString()}</b>
        </div>
        <FlowArrow label="SWAP" />
        <div className="route-node route-highlight">
          <span className="node-index">02</span>
          <div className="token-icon pump-token">P</div>
          <strong>$PUMP</strong>
          <small>Runner gets buy pressure</small>
          <b>+${amount.toLocaleString()}</b>
          <span className="pulse-ring" />
        </div>
        <FlowArrow label="SWAP" />
        <div className="route-node">
          <span className="node-index">03</span>
          <div className="token-icon lolly-token">L</div>
          <strong>$LOLLY</strong>
          <small>Trader receives</small>
          <b>Tokens</b>
        </div>
      </div>
      <div className="demo-result">
        <Sparkles size={18} />
        <span>
          The trader receives <b>$LOLLY</b>, while the route creates <b>${amount.toLocaleString()} of $PUMP demand</b>.
        </span>
      </div>
    </div>
  )
}

const faqs = [
  {
    q: 'Which coins can a new token pair with?',
    a: 'Eligible bases include coins still on the Pump.fun bonding curve, coins graduated to PumpSwap, and approved whitelist assets. Coins that graduated to Raydium are not automatically eligible unless whitelisted.',
  },
  {
    q: 'How deep can a custom pair go?',
    a: 'The standard maximum is one level: a token already paired with another Pump.fun coin cannot become the base for another launch. Assets whitelisted before this update may support a maximum depth of two.',
  },
  {
    q: 'Do fees stack across both swaps?',
    a: 'On compatible interfaces using the upgraded Pump Program, fees are routed by leg instead of charged repeatedly. Holder Rewards, creator fees and LP fees apply on the final buy leg and first sell leg; protocol fees apply on the first buy leg and final sell leg.',
  },
  {
    q: 'What is the whitelist now used for?',
    a: 'Most existing Pump.fun coins—and future Pump.fun coins—are automatically eligible. The whitelist still lets eligible assets outside the Pump.fun ecosystem become custom-pair bases.',
  },
  {
    q: 'Can a pairing be changed after launch?',
    a: 'No. The paired token is locked permanently once the coin launches. Confirm the base asset before creating the token.',
  },
]

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq-list">
      {faqs.map((item, index) => (
        <div className={`faq-item ${open === index ? 'open' : ''}`} key={item.q}>
          <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
            <span>0{index + 1}</span>
            {item.q}
            <ChevronDown size={20} />
          </button>
          <div className="faq-answer">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()

  const copyContract = async () => {
    await navigator.clipboard.writeText(tokenConfig.contractAddress)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div id="top">
      <nav className="nav">
        <Logo />
        <div className="desktop-nav">
          <a href="#how">How it works</a>
          <a href="#fees">Fees</a>
          <a href="#faq">FAQ</a>
          <a href="#sources">Sources</a>
        </div>
        <div className="nav-actions">
          <a className="round-link" href="#contract" aria-label="View token details">
            <ArrowDown size={18} />
          </a>
          <Button href={tokenConfig.buyUrl} disabled={!tokenConfig.isLive}>
            {tokenConfig.isLive ? 'Buy $LOLLY' : 'Launch soon'} <ArrowUpRight size={16} />
          </Button>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            {['how', 'fees', 'faq', 'sources', 'contract'].map((item) => (
              <a href={`#${item}`} onClick={() => setMenuOpen(false)} key={item}>
                {item === 'how' ? 'How it works' : item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main>
        <section className="hero">
          <div className="noise" />
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.6 }}
          >
            <div className="status-pill">
              <span /> CUSTOM PAIR CONCEPT
            </div>
            <h1>
              Sweeter together.
              <em>Stronger by design.</em>
            </h1>
            <p>
              Meet <b>Pump Lolly Pop</b>—an illustrative token concept that shows how custom pairs can turn
              attention into shared momentum, routing every buy through an existing runner.
            </p>
            <div className="hero-buttons">
              <Button href="#how">
                See the route <ArrowDown size={16} />
              </Button>
              <Button href="#sources" secondary>
                Official sources <ExternalLink size={15} />
              </Button>
            </div>
            <div className="hero-proof">
              <div>
                <b>1</b>
                <span>pair depth</span>
              </div>
              <div>
                <b>2</b>
                <span>swap legs</span>
              </div>
              <div>
                <b>1×</b>
                <span>effective fee layer*</span>
              </div>
            </div>
          </motion.div>
          <LollipopOrbit />
        </section>

        <div className="marquee" aria-hidden="true">
          <div>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                LESS PVP <i>✦</i> MORE PVE <i>✦</i> EVERY BUY BUILDS THE BASE <i>✦</i>{' '}
              </span>
            ))}
          </div>
        </div>

        <section className="section intro-section">
          <div className="section-heading">
            <span className="eyebrow">THE SHIFT</span>
            <h2>Derivatives used to divide momentum.</h2>
          </div>
          <div className="shift-grid">
            <div className="shift-card old-way">
              <span className="card-tag">BEFORE · PVP</span>
              <div className="split-visual">
                <div className="mindshare-core">RUNNER</div>
                <div className="split-lines">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="derivatives">
                  <i>A</i><i>B</i><i>C</i>
                </div>
              </div>
              <h3>Attention leaked outward</h3>
              <p>Derivative launches competed for mindshare, holders and liquidity—often lowering the main runner’s ceiling.</p>
            </div>
            <div className="shift-card new-way">
              <span className="card-tag">NOW · PVE</span>
              <div className="loop-visual">
                <div className="runner-orb">RUNNER</div>
                <div className="loop-track"><ArrowRight size={18} /></div>
                <div className="pair-orb">PAIR</div>
              </div>
              <h3>Activity can compound inward</h3>
              <p>When the derivative is paired with the runner, each routed buy creates demand and can deepen the runner’s market.</p>
            </div>
          </div>
        </section>

        <section className="section route-section" id="how">
          <div className="section-heading horizontal">
            <div>
              <span className="eyebrow">HOW IT WORKS</span>
              <h2>One trade. Two swaps.<br />Shared momentum.</h2>
            </div>
            <p>
              This example models a $LOLLY custom pair with $PUMP. It is an educational route—not a live token or guaranteed execution.
            </p>
          </div>
          <SwapFlow />
          <div className="benefits-grid">
            <article>
              <span><Zap size={20} /></span>
              <h3>Runner buy pressure</h3>
              <p>The first leg acquires the base coin before the second leg delivers the paired token.</p>
            </article>
            <article>
              <span><CircleDollarSign size={20} /></span>
              <h3>Holder Rewards</h3>
              <p>In Pump.fun’s example, pair activity may reward the paired-token community in the base asset.</p>
            </article>
            <article>
              <span><Layers3 size={20} /></span>
              <h3>Deeper liquidity</h3>
              <p>Repeated routed activity can contribute to a healthier, more active market for the base community.</p>
            </article>
          </div>
        </section>

        <section className="fees-section" id="fees">
          <div className="fee-copy">
            <span className="eyebrow light">MULTI-HOP, SIMPLIFIED</span>
            <h2>More hops.<br /><em>Not more fee layers.</em></h2>
            <p>
              Compatible interfaces using the latest Pump Program distribute fee types across specific legs, avoiding repeated
              fee stacking across a multi-hop route.
            </p>
            <a href="https://pump.fun/docs/fees" target="_blank" rel="noreferrer">
              Read the official fee docs <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="fee-diagram">
            <div className="fee-route-row">
              <span className="fee-side">BUY</span>
              <div className="fee-leg active"><small>LEG 1</small>USDC → PUMP<b>Protocol fee</b></div>
              <ArrowRight />
              <div className="fee-leg active"><small>LEG 2</small>PUMP → LOLLY<b>Creator · LP · Rewards</b></div>
            </div>
            <div className="fee-route-row reverse">
              <span className="fee-side">SELL</span>
              <div className="fee-leg active"><small>LEG 1</small>LOLLY → PUMP<b>Creator · LP · Rewards</b></div>
              <ArrowRight />
              <div className="fee-leg active"><small>LEG 2</small>PUMP → USDC<b>Protocol fee</b></div>
            </div>
            <div className="fee-callout">
              <ShieldCheck />
              <div><b>No duplicated fee stack*</b><span>when traded through an upgraded interface</span></div>
            </div>
          </div>
        </section>

        <section className="section depth-section">
          <div className="section-heading centered">
            <span className="eyebrow">PAIR ELIGIBILITY</span>
            <h2>Built for a clear, shallow route.</h2>
            <p>Eligibility and pair depth protect the route from becoming an endless chain of swaps.</p>
          </div>
          <div className="eligibility-grid">
            {[
              ['01', 'Bonding curve', 'Currently trading on the Pump.fun bonding curve.'],
              ['02', 'PumpSwap', 'Graduated from Pump.fun into PumpSwap.'],
              ['03', 'Whitelist', 'Explicitly approved assets, including selected external tokens.'],
            ].map(([num, title, text]) => (
              <article key={num}>
                <span>{num}</span><Check size={19} />
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
          <div className="depth-note">
            <Layers3 size={22} />
            <p><b>Standard maximum depth: 1.</b> Previously whitelisted tokens may support depth 2. Raydium graduates require whitelist approval.</p>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="section-heading">
            <span className="eyebrow">CLEAR ANSWERS</span>
            <h2>The important details.</h2>
          </div>
          <FAQ />
        </section>

        <section className="sources-section" id="sources">
          <div className="section-heading horizontal">
            <div>
              <span className="eyebrow light">SOURCE THREAD</span>
              <h2>See every official post.</h2>
            </div>
            <p>The original Pump.fun thread includes the announcement graphics, fee diagrams and video explainer referenced here.</p>
          </div>
          <div className="source-grid">
            {sourcePosts.map((post, index) => (
              <a href={`https://x.com/Pumpfun/status/${post.id}`} target="_blank" rel="noreferrer" key={post.id}>
                <span className="source-number">0{index + 1}</span>
                <div className={`media-preview media-${(index % 3) + 1}`}>
                  {post.type === 'Video' ? <span className="play">▶</span> : <span className="x-mark">𝕏</span>}
                  <small>{post.type}</small>
                </div>
                <div className="source-meta">
                  <div><small>@Pumpfun</small><b>{post.label}</b></div>
                  <ArrowUpRight size={18} />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="launch-section" id="contract">
          <div className="launch-orb"><div className="mini-lolly"><span /></div></div>
          <div className="launch-copy">
            <span className="eyebrow">PUMP LOLLY POP</span>
            <h2>The sweetest route<br />is almost ready.</h2>
            <p>$LOLLY is presented as a launch-ready concept. The verified contract and official buy link will appear here after creation.</p>
            <div className="contract-box">
              <div>
                <small>CONTRACT ADDRESS</small>
                <code>{tokenConfig.contractAddress}</code>
              </div>
              <button onClick={copyContract} aria-label="Copy contract address">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <div className="launch-actions">
              <Button href={tokenConfig.buyUrl} disabled={!tokenConfig.isLive}>
                {tokenConfig.isLive ? 'Buy $LOLLY' : 'Buy link coming soon'} <ArrowUpRight size={16} />
              </Button>
              <span className="coming-soon"><i /> NOT LIVE YET</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Logo />
        <p>
          Educational concept site. Not affiliated with Pump.fun. Not financial advice. Token mechanics, eligibility and fees
          may change—verify all details in the official documentation before transacting.
        </p>
        <div>
          <a href="https://github.com/pump-fun/pump-public-docs" target="_blank" rel="noreferrer">Developer docs</a>
          <a href="https://pump.fun/docs/fees" target="_blank" rel="noreferrer">Fee docs</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
