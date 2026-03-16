// MR BRO - Landing Page
// Stack: React + Tailwind CSS + Lucide React
//
// INSTALL:
//   npm install lucide-react --legacy-peer-deps
//
// FONTS — replace the Google Fonts link in index.html <head> with:
//   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
//
// MASCOT — save your image as: public/mrbro-mascot.png
//
// COLOR PALETTE:
//   #111111  — Black
//   #7ED321  — Lime green
//   #D4570A  — Orange
//   #FFFFFF  — White

import { useState, useEffect } from "react";
import {
  Send,
  Twitter,
  Search,
  BarChart2,
  TrendingUp,
  Copy,
  Check,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// ─── GLOBAL STYLES & ANIMATIONS ──────────────────────────────────────────────
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(26px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%       { opacity: 0.12; transform: scale(1.14); }
  }
  @keyframes drawerIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .anim-fadeUp  { animation: fadeUp  0.6s ease both; }
  .anim-fadeIn  { animation: fadeIn  0.5s ease both; }
  .anim-scaleIn { animation: scaleIn 0.6s ease both; }
  .anim-float   { animation: float   3.6s ease-in-out infinite; }
  .anim-drawer  { animation: drawerIn 0.22s ease both; }

  .d1 { animation-delay: 0.08s; }
  .d2 { animation-delay: 0.18s; }
  .d3 { animation-delay: 0.28s; }
  .d4 { animation-delay: 0.38s; }
  .d5 { animation-delay: 0.48s; }

  .reveal {
    opacity: 0; transform: translateY(22px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .reveal-scale {
    opacity: 0; transform: scale(0.94);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .reveal-scale.visible { opacity: 1; transform: scale(1); }

  .s1 { transition-delay: 0.04s; }
  .s2 { transition-delay: 0.11s; }
  .s3 { transition-delay: 0.18s; }
  .s4 { transition-delay: 0.25s; }
  .s5 { transition-delay: 0.32s; }
  .s6 { transition-delay: 0.39s; }

  .nav-link { position: relative; text-decoration: none; }
  .nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    height: 1.5px; width: 0; background: #7ED321;
    transition: width 0.2s ease;
  }
  .nav-link:hover::after { width: 100%; }

  .hover-lift {
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(0,0,0,0.09);
  }
  .hover-lift-dark:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(0,0,0,0.35);
  }
`;

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CONTRACT = "0xd2D731ab1C6b934914F660d8A4F611b732251142";

const C = {
  black: "#111111",
  lime: "#7ED321",
  orange: "#D4570A",
  white: "#ffffff",
  bg: "#f6f6f4",
  dark: "#0d0d0d",
  dark2: "#181818",
  muted: "#777777",
  mutedLight: "#aaaaaa",
  borderDark: "rgba(255,255,255,0.07)",
};

const F = {
  display: "'Syne', sans-serif",
  body: "'Inter', sans-serif",
};

const NAV_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Burn Engine", href: "#burn" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

const TOKENOMICS_ROWS = [
  { label: "Network", value: "BNB Smart Chain (BEP-20)" },
  { label: "Buy Tax", value: "1.5%" },
  { label: "Sell Tax", value: "2.5%" },
  { label: "Max Supply", value: "2,000,000,000" },
  { label: "Terminal Goal", value: "100,000,000" },
  { label: "Burned Target", value: "90%" },
];

const ROADMAP = [
  {
    phase: "01",
    title: "Genesis",
    status: "done",
    desc: "Smart contract deployed on BNB Chain. Staking engine is live. The community has been seeded and is growing.",
  },
  {
    phase: "02",
    title: "Expansion",
    status: "active",
    desc: "We're stabilizing the market, growing the community, and securing Tier-2 exchange listings.",
  },
  {
    phase: "03",
    title: "Integration",
    status: "upcoming",
    desc: "Targeting Tier-1 CEX listings, deepening liquidity, and launching the Festival Payment utility.",
  },
  {
    phase: "04",
    title: "Autonomy",
    status: "upcoming",
    desc: "When we hit 100M supply, ownership gets renounced. All taxes stop. MR BRO becomes a pure, free asset — no one controls it.",
  },
];

const FAQS = [
  {
    q: "Is MR BRO safe to hold?",
    a: "The rules are hardcoded directly on-chain. There are no hidden mint functions and the team can't change the tokenomics. Every burn and every tax is publicly verifiable on BscScan anyone can check at any time.",
  },
  {
    q: "What actually happens when we reach 100M supply?",
    a: "Everything stops automatically. All taxes end, all burns end, and ownership of the contract is renounced. From that point forward, MR BRO functions as a classic decentralized asset with zero fees and zero team control.",
  },
  {
    q: "How is this different from every other meme coin?",
    a: "Most meme coins run on vibes and promises. MR BRO runs on code. The tokenomics are written into the contract and can't be altered. The community holds the token, the blockchain enforces the rules no trust required.",
  },
  {
    q: "Should I be aware of any risks?",
    a: "Yes — MR BRO is a high-volatility DeFi experiment. Token prices can move sharply in either direction. Only put in what you're genuinely comfortable losing. This is not financial advice.",
  },
];

const BURN_STEPS = [
  {
    num: "01",
    title: "You Stake",
    desc: "Lock your MR BRO tokens into the staking contract.",
  },
  {
    num: "02",
    title: "Mint-to-DEAD",
    desc: "The protocol mints an equivalent amount of tokens straight to the dead address.",
  },
  {
    num: "03",
    title: "Supply Burns",
    desc: "Those tokens are gone permanently — supply drops with zero sell pressure.",
  },
  {
    num: "04",
    title: "You Get It All Back",
    desc: "Your full principal is returned. You staked, supply burned, and your bags stayed intact.",
  },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const h2Style = {
  fontFamily: F.display,
  fontWeight: 800,
  fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)",
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};

function SectionLabel({ children, dark = false }) {
  return (
    <span
      style={{
        fontFamily: F.body,
        fontWeight: 600,
        fontSize: "0.68rem",
        color: dark ? C.lime : C.orange,
        background: dark ? "rgba(126,211,33,0.13)" : "rgba(212,87,10,0.10)",
        borderRadius: "100px",
        padding: "5px 14px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        display: "inline-block",
        marginBottom: "14px",
      }}
    >
      {children}
    </span>
  );
}

function PillBtn({ href, bg, color, children, onClick }) {
  const [hov, setHov] = useState(false);
  const props = href
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        style: { textDecoration: "none" },
      }
    : { onClick };

  const Tag = href ? "a" : "button";
  return (
    <Tag
      {...props}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: F.body,
        fontWeight: 600,
        fontSize: "0.88rem",
        background: bg,
        color,
        padding: "12px 24px",
        borderRadius: "100px",
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        letterSpacing: "0.01em",
        opacity: hov ? 0.82 : 1,
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "opacity 0.2s, transform 0.2s",
        textDecoration: "none",
      }}
    >
      {children}
    </Tag>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.3s ease",
          background:
            scrolled || menuOpen ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.07)" : "none",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? "58px" : "68px",
            transition: "height 0.3s ease",
          }}
        >
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: F.display,
                fontWeight: 800,
                fontSize: "1.3rem",
                letterSpacing: "-0.02em",
                color: C.black,
              }}
            >
              MR<span style={{ color: C.lime }}>BRO</span>
            </span>
          </a>

          {/* Desktop links — hidden on mobile */}
          {!isMobile && (
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="nav-link"
                    style={{
                      fontFamily: F.body,
                      fontWeight: 500,
                      fontSize: "0.71rem",
                      color: "#444",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Desktop CTA — hidden on mobile */}
            {!isMobile && (
              <a
                href="https://dexscreener.com/bsc/0xc71ac83e5eecb5c81a84372c33fd87f0ca468312"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: F.body,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  background: C.black,
                  color: C.white,
                  padding: "9px 20px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = C.lime)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = C.black)
                }
              >
                Buy Now
              </a>
            )}

            {/* Hamburger — ONLY on mobile */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.black,
                }}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile drawer — vertical nav links, ONLY shown on mobile when open */}
        {isMobile && menuOpen && (
          <div
            className="anim-drawer"
            style={{
              background: "rgba(255,255,255,0.99)",
              borderTop: "1px solid rgba(0,0,0,0.07)",
              padding: "8px 20px 24px",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={handleNavClick}
                    style={{
                      display: "block",
                      fontFamily: F.body,
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      color: "#222",
                      textDecoration: "none",
                      padding: "13px 4px",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "16px" }}>
              <a
                href="https://dexscreener.com/bsc/0xc71ac83e5eecb5c81a84372c33fd87f0ca468312"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: F.body,
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  background: C.black,
                  color: C.white,
                  padding: "13px",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                Buy MR BRO
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: C.white,
        paddingTop: "68px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(126,211,33,0.12) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,87,10,0.08) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 20px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "48px",
          flexWrap: "wrap",
        }}
      >
        {/* Text */}
        <div style={{ flex: "1 1 340px" }}>
          {/* Live badge */}
          <div
            className="anim-fadeIn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(126,211,33,0.1)",
              borderRadius: "100px",
              padding: "6px 14px",
              marginBottom: "22px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.lime,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: F.body,
                fontWeight: 600,
                fontSize: "0.7rem",
                color: "#3d6b0e",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Live on BNB Smart Chain
            </span>
          </div>

          {/* Headline */}
          <h1
            className="anim-fadeUp d1"
            style={{
              ...h2Style,
              fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)",
              color: C.black,
              marginBottom: "18px",
            }}
          >
            The Meme Token
            <br />
            That Actually
            <br />
            <span style={{ color: C.lime }}>Plays By Rules.</span>
          </h1>

          {/* Sub */}
          <p
            className="anim-fadeUp d2"
            style={{
              fontFamily: F.body,
              fontSize: "1.05rem",
              color: "#555",
              lineHeight: 1.78,
              marginBottom: "32px",
              maxWidth: "440px",
            }}
          >
            MR BRO isn't built on promises it's built on code. Every burn,
            every tax, and every buyback is hardcoded into the BNB Smart Chain.
            No team discretion. No surprises.
          </p>

          {/* Buttons */}
          <div
            className="anim-fadeUp d3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "28px",
            }}
          >
            <PillBtn
              href="https://dexscreener.com/bsc/0xc71ac83e5eecb5c81a84372c33fd87f0ca468312"
              bg={C.lime}
              color={C.black}
            >
              Buy MR BRO
            </PillBtn>
            <PillBtn
              href="https://www.geckoterminal.com/bsc/pools/0xc71ac83e5eecb5c81a84372c33fd87f0ca468312"
              bg={C.black}
              color={C.white}
            >
              View Chart
            </PillBtn>
            <PillBtn
              href="https://t.me/mrbromeme"
              bg={C.orange}
              color={C.white}
            >
              Join Telegram
            </PillBtn>
          </div>

          {/* Contract address */}
          <div className="anim-fadeUp d4">
            <button
              onClick={copyCA}
              style={{
                fontFamily: F.body,
                fontSize: "0.78rem",
                fontWeight: 500,
                background: "#f3f3f3",
                color: "#555",
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#ebebeb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f3f3f3")
              }
            >
              <span
                style={{
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  color: C.lime,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                CA
              </span>
              <span style={{ fontFamily: "monospace" }}>
                {CONTRACT.slice(0, 14)}...{CONTRACT.slice(-6)}
              </span>
              {copied ? (
                <Check size={13} color={C.lime} />
              ) : (
                <Copy size={13} color="#bbb" />
              )}
            </button>
          </div>
        </div>

        {/* Mascot */}
        <div
          className="anim-scaleIn d2"
          style={{
            flex: "0 0 auto",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-24px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(126,211,33,0.18) 0%, transparent 65%)",
              animation: "glowPulse 3.2s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <img
            src="/mrbro-mascot.png"
            alt="MR BRO Mascot"
            className="anim-float"
            style={{
              width: "clamp(160px, 24vw, 340px)",
              objectFit: "contain",
              position: "relative",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── PHILOSOPHY ───────────────────────────────────────────────────────────────
function Philosophy() {
  const pillars = [
    {
      title: "The Rules Don't Change",
      desc: "Once the contract is deployed, that's it. There's no admin key that lets the team mint new tokens or rewrite the rules. What you see on-chain is what you get permanently.",
      accent: C.lime,
    },
    {
      title: "You Can See Everything",
      desc: "Every burn event, every tax collected, every buyback — it's all public and verifiable on BscScan. You don't have to trust us. You just have to read the contract.",
      accent: C.orange,
    },
    {
      title: "The Math Is Predictable",
      desc: "There's a clear, visible path from 2 billion tokens down to 100 million. No guessing, no speculation about what the team might do next. The supply trajectory is locked in.",
      accent: C.black,
    },
  ];

  return (
    <section id="philosophy" style={{ padding: "100px 0", background: C.bg }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <SectionLabel>Our DNA</SectionLabel>
          <h2 style={{ ...h2Style, color: C.black, marginBottom: "14px" }}>
            We don't ask you to trust us.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "1rem",
              color: C.muted,
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Most crypto projects are built on the reputation of a team. MR BRO
            is built on the certainty of code. Here's what that actually means.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`reveal hover-lift s${i + 1}`}
              style={{
                background: C.white,
                borderRadius: "18px",
                padding: "30px 28px",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 3,
                  borderRadius: 3,
                  background: p.accent,
                  marginBottom: "18px",
                }}
              />
              <h3
                style={{
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: C.black,
                  marginBottom: "10px",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "0.91rem",
                  color: C.muted,
                  lineHeight: 1.75,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOKENOMICS ───────────────────────────────────────────────────────────────
function Tokenomics() {
  return (
    <section id="tokenomics" style={{ padding: "100px 0", background: C.dark }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <SectionLabel dark>The Numbers</SectionLabel>
          <h2 style={{ ...h2Style, color: C.white, marginBottom: "14px" }}>
            Designed to become scarce.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "1rem",
              color: C.mutedLight,
              maxWidth: "460px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            The tokenomics aren't complicated they're just built differently.
            Every transaction chips away at the supply, on purpose.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Table */}
          <div
            className="reveal"
            style={{
              background: C.dark2,
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            {TOKENOMICS_ROWS.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 24px",
                  borderBottom:
                    i < TOKENOMICS_ROWS.length - 1
                      ? `1px solid ${C.borderDark}`
                      : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: F.body,
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: F.display,
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    color: C.white,
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Info cards */}
          <div
            className="reveal s2"
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div
              style={{
                background: "rgba(126,211,33,0.07)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: C.lime,
                  marginBottom: "10px",
                }}
              >
                How the treasury works
              </h3>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "0.88rem",
                  color: "#999",
                  lineHeight: 1.75,
                }}
              >
                Half of every treasury allocation goes back into the liquidity
                pool to deepen the floor. The other half buys tokens off the
                open market. Both moves support the price none of it goes to
                the team.
              </p>
            </div>
            <div
              style={{
                background: "rgba(212,87,10,0.07)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: C.orange,
                  marginBottom: "10px",
                }}
              >
                What happens at the finish line
              </h3>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "0.88rem",
                  color: "#999",
                  lineHeight: 1.75,
                }}
              >
                When supply hits 100 million, all taxes stop and ownership of
                the contract is renounced permanently. At that point, MR BRO is
                completely free no team, no fees, no strings attached.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BURN ENGINE ──────────────────────────────────────────────────────────────
function BurnEngine() {
  return (
    <section id="burn" style={{ padding: "100px 0", background: C.white }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <SectionLabel>Staking 2.0</SectionLabel>
          <h2 style={{ ...h2Style, color: C.black, marginBottom: "14px" }}>
            Staking that actually burns supply.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "1rem",
              color: C.muted,
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Regular staking hands out token rewards, which holders then sell
            putting downward pressure on the price. MR BRO's staking works
            completely differently.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          {BURN_STEPS.map((s, i) => (
            <div
              key={s.title}
              className={`reveal-scale hover-lift s${i + 1}`}
              style={{
                background: C.bg,
                borderRadius: "16px",
                padding: "24px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: F.display,
                  fontWeight: 800,
                  fontSize: "2.2rem",
                  color: "#e8e8e8",
                  lineHeight: 1,
                  marginBottom: "10px",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  color: C.black,
                  marginBottom: "8px",
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "0.82rem",
                  color: C.muted,
                  lineHeight: 1.68,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Result banner */}
        <div
          className="reveal"
          style={{
            background: C.black,
            borderRadius: "16px",
            padding: "30px 32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: F.display,
              fontWeight: 800,
              fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)",
              color: C.white,
              letterSpacing: "-0.02em",
            }}
          >
            The supply shrinks.{" "}
            <span style={{ color: C.lime }}>
              Your principal comes back whole.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── ROADMAP ──────────────────────────────────────────────────────────────────
function Roadmap() {
  const statusCfg = {
    done: { color: C.lime, label: "Completed" },
    active: { color: C.orange, label: "In Progress" },
    upcoming: { color: C.muted, label: "Upcoming" },
  };

  return (
    <section id="roadmap" style={{ padding: "100px 0", background: C.bg }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <SectionLabel>The Journey</SectionLabel>
          <h2 style={{ ...h2Style, color: C.black, marginBottom: "14px" }}>
            From launch to fully decentralized.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "1rem",
              color: C.muted,
              maxWidth: "440px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Four phases. One destination: a token that nobody controls and
            nobody can change.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "16px",
          }}
        >
          {ROADMAP.map((r, i) => {
            const cfg = statusCfg[r.status];
            return (
              <div
                key={r.phase}
                className={`reveal hover-lift s${i + 1}`}
                style={{
                  background: C.white,
                  borderRadius: "18px",
                  padding: "26px 24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: F.display,
                      fontWeight: 800,
                      fontSize: "2.8rem",
                      color: "#ebebeb",
                      lineHeight: 1,
                      userSelect: "none",
                      flexShrink: 0,
                    }}
                  >
                    {r.phase}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: F.display,
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: C.black,
                        }}
                      >
                        {r.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: F.body,
                          fontWeight: 600,
                          fontSize: "0.63rem",
                          color: cfg.color,
                          background: cfg.color + "18",
                          padding: "3px 10px",
                          borderRadius: "100px",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "0.87rem",
                        color: C.muted,
                        lineHeight: 1.72,
                      }}
                    >
                      {r.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: "100px 0", background: C.dark }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <SectionLabel dark>Real Talk</SectionLabel>
          <h2 style={{ ...h2Style, color: C.white, marginBottom: "14px" }}>
            Honest answers to real questions.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "1rem",
              color: C.mutedLight,
              lineHeight: 1.75,
            }}
          >
            No marketing spin. Just straight answers.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQS.map((f, i) => (
            <div
              key={i}
              className={`reveal s${i + 1}`}
              style={{
                background: C.dark2,
                borderRadius: "14px",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div
                style={{
                  padding: "18px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <span
                  style={{
                    fontFamily: F.body,
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    color: C.white,
                  }}
                >
                  {f.q}
                </span>
                <ChevronDown
                  size={15}
                  color={open === i ? C.lime : C.muted}
                  style={{
                    flexShrink: 0,
                    transform: open === i ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.25s, color 0.25s",
                  }}
                />
              </div>
              <div
                style={{
                  maxHeight: open === i ? "180px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: "0.88rem",
                    color: "#888",
                    lineHeight: 1.75,
                    padding: "0 22px 18px",
                  }}
                >
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const socials = [
    {
      label: "Telegram",
      href: "https://t.me/mrbromeme",
      Icon: Send,
      bg: C.lime,
      color: C.black,
    },
    {
      label: "Twitter / X",
      href: "https://x.com/MrBroMeme",
      Icon: Twitter,
      bg: "#1a1a1a",
      color: C.white,
    },
    {
      label: "BscScan",
      href: `https://bscscan.com/token/${CONTRACT}`,
      Icon: Search,
      bg: "#1a1a1a",
      color: C.white,
    },
    {
      label: "DexScreener",
      href: "https://dexscreener.com/bsc/0xc71ac83e5eecb5c81a84372c33fd87f0ca468312",
      Icon: BarChart2,
      bg: C.orange,
      color: C.white,
    },
    {
      label: "GeckoTerminal",
      href: "https://www.geckoterminal.com/bsc/pools/0xc71ac83e5eecb5c81a84372c33fd87f0ca468312",
      Icon: TrendingUp,
      bg: "#1a1a1a",
      color: C.lime,
    },
  ];

  return (
    <footer style={{ background: "#080808", padding: "68px 0 32px" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: F.display,
            fontWeight: 800,
            fontSize: "1.9rem",
            letterSpacing: "-0.03em",
            color: C.white,
            marginBottom: "6px",
          }}
        >
          MR<span style={{ color: C.lime }}>BRO</span>
        </div>
        <p
          style={{
            fontFamily: F.body,
            fontSize: "0.88rem",
            color: "#444",
            marginBottom: "36px",
            lineHeight: 1.6,
          }}
        >
          The rules are set. The revolution is on.
        </p>

        {/* Social links with Lucide icons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "44px",
          }}
        >
          {socials.map(({ label, href, Icon, bg, color }) => {
            const [hov, setHov] = useState(false);
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  fontFamily: F.body,
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  background: bg,
                  color,
                  padding: "10px 18px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  opacity: hov ? 0.78 : 1,
                  transform: hov ? "translateY(-2px)" : "translateY(0)",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
              >
                <Icon size={14} />
                {label}
              </a>
            );
          })}
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.05)",
            marginBottom: "22px",
          }}
        />

        <p style={{ fontFamily: F.body, fontSize: "0.75rem", color: "#333" }}>
          mrbro@mrbro.com &nbsp;·&nbsp; © 2026 MR BRO &nbsp;·&nbsp;
        </p>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MrBroLanding() {
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar />
      <Hero />
      <Philosophy />
      <Tokenomics />
      <BurnEngine />
      <Roadmap />
      <FAQ />
      <Footer />
    </>
  );
}
