"use client";

// ===== PORTFOLIO COMPONENT IMPORTS: START =====
import Image from "next/image";
import Link from "next/link";
import {FormEvent, useEffect, useState} from "react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Building2, Check, ChevronUp,
  Globe2, Handshake, Home, Mail, MapPin, Menu, PackageCheck,
  SearchCheck, ShieldCheck, ShoppingBag, UtensilsCrossed, X
} from "lucide-react";
import {content, type Locale} from "@/lib/content";
import {site} from "@/lib/site";
// ===== PORTFOLIO COMPONENT IMPORTS: END =====

const navKeys = ["about", "focus", "process", "partners", "founder", "contact"] as const;
const categoryIcons = [UtensilsCrossed, ShoppingBag, Home];
const processIcons = [SearchCheck, ShieldCheck, PackageCheck, ShoppingBag];
const partnerIcons = [Handshake, Globe2, Check];

type Props = {locale: Locale};

export default function Portfolio({locale}: Props) {
  const t = content[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({name: "", company: "", email: "", interest: "", message: ""});
  const otherLocale: Locale = locale === "en" ? "es" : "en";

  useEffect(() => {
    document.documentElement.lang = locale;
    setHash(window.location.hash);
    const updateHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [locale]);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!site.email.trim()) {
      setNotice(t.contact.missingEmail);
      return;
    }
    const subject = `Wholesale partnership inquiry — ${form.company}`;
    const message = [
      `Name: ${form.name}`, `Company: ${form.company}`, `Email: ${form.email}`,
      `Business type: ${form.interest}`, "", form.message,
    ].join("\n");
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
    setNotice(t.contact.openingEmail);
  }

  return (
    <>
      {/* ===== SECTION 00: HEADER / NAVIGATION START ===== */}
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#top" className="brand" aria-label="Silent Shopping - Back to top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">S<span>.</span></span>
            <span className="brand-text">SILENT <strong>SHOPPING</strong><small>WHOLESALE COMMERCE</small></span>
          </a>
          <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Main navigation">
            {navKeys.map(key => <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)}>{t.nav[key]}</a>)}
            <a className="mobile-nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.action}</a>
          </nav>
          <div className="header-actions">
            <Link className="locale-control" href={`/${otherLocale}${hash}`} aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}>
              <Globe2 size={15}/><span>{locale.toUpperCase()}</span><span className="locale-slash">/</span><strong>{otherLocale.toUpperCase()}</strong>
            </Link>
            <a href="#contact" className="header-cta">{t.nav.action} <ArrowUpRight size={15}/></a>
            <button type="button" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={23}/> : <Menu size={23}/>}
            </button>
          </div>
        </div>
      </header>
      {/* ===== SECTION 00: HEADER / NAVIGATION END ===== */}

      <main id="top">
        {/* ===== SECTION 01: HERO START ===== */}
        <section className="hero section-dark" aria-labelledby="hero-heading">
          <div className="hero-grain" aria-hidden="true"/>
          <div className="hero-orbit hero-orbit-one" aria-hidden="true"/>
          <div className="hero-orbit hero-orbit-two" aria-hidden="true"/>
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span className="eyebrow-line"/>{t.hero.label}</p>
              <h1 id="hero-heading">{t.hero.before}<br/><em>{t.hero.highlight}</em></h1>
              <p className="hero-description">{t.hero.description}</p>
              <div className="hero-buttons">
                <a className="btn btn-gold" href="#contact">{t.hero.primary}<ArrowUpRight size={18}/></a>
                <a className="btn btn-ghost" href="#about">{t.hero.secondary}<ArrowRight size={18}/></a>
              </div>
              <div className="hero-lower"><span className="hero-dot"/><span>VITORIA-GASTEIZ · SPAIN</span></div>
            </div>
            <div className="hero-photo-area">
              <div className="portrait-outline" aria-hidden="true"/>
              <div className="portrait-frame">
                <Image src="/muhammad-asim.jpeg" alt="Portrait of Muhammad Asim, founder of Silent Shopping" fill priority sizes="(max-width: 900px) 90vw, 43vw" className="founder-portrait"/>
                <div className="portrait-shade"/>
              </div>
              <div className="portrait-caption"><span>01 / {t.hero.portraitLabel}</span><strong>{t.hero.portraitRole}</strong></div>
              <div className="hero-photo-decoration">SS <ArrowUpRight size={19}/></div>
            </div>
          </div>
          <div className="shell hero-scroll"><span>{t.hero.scroll}</span><ArrowDownRight size={17}/></div>
        </section>
        {/* ===== SECTION 01: HERO END ===== */}

        {/* ===== SECTION 01B: VERIFIED FACTS START ===== */}
        <section className="fact-strip" aria-label="Business facts"><div className="shell fact-grid">
          {t.stats.map(item => <div className="fact" key={item.label}><div className="fact-value">{item.value} <small>{item.suffix}</small></div><p>{item.label}</p></div>)}
          <div className="fact-strip-note"><span className="tiny-square"/>{site.businessName.toUpperCase()}<br/><strong>EST. IN SPAIN</strong></div>
        </div></section>
        {/* ===== SECTION 01B: VERIFIED FACTS END ===== */}

        {/* ===== SECTION 02: ABOUT START ===== */}
        <section className="section about-section" id="about" aria-labelledby="about-heading"><div className="shell">
          <div className="section-heading about-heading-grid">
            <p className="eyebrow dark-eyebrow">{t.about.eyebrow}</p>
            <h2 id="about-heading">{t.about.heading}<br/><em>{t.about.accent}</em></h2>
          </div>
          <div className="about-grid">
            <div className="about-art" aria-hidden="true"><span>SS</span><div className="art-corner">SILENT<br/>SHOPPING</div><div className="art-axis">WHOLESALE / HOME / COMMERCE</div></div>
            <div className="about-details"><p className="lead">{t.about.intro}</p><p className="muted-paragraph">{t.about.description}</p>
              <div className="pillar-list">{t.about.pillars.map((item, i) => <div className="pillar" key={item.title}><span className="pillar-num">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight className="pillar-arrow" size={18}/></div>)}</div>
            </div>
          </div>
        </div></section>
        {/* ===== SECTION 02: ABOUT END ===== */}

        {/* ===== SECTION 03: PRODUCT FOCUS START ===== */}
        <section className="section categories-section" id="focus" aria-labelledby="focus-heading"><div className="shell">
          <div className="section-top"><div><p className="eyebrow dark-eyebrow">{t.focus.eyebrow}</p><h2 id="focus-heading">{t.focus.heading}<br/><em>{t.focus.accent}</em></h2></div><p className="section-intro">{t.focus.intro}</p></div>
          <div className="category-grid">{t.focus.categories.map((item, idx) => {
            const Icon = categoryIcons[idx];
            return <article className={`category-card category-${idx + 1}`} key={item.num}>
              <div className="category-top"><span>{item.num} / 03</span><ArrowUpRight size={19}/></div>
              <div className="category-art"><div className="category-ring ring-one"/><div className="category-ring ring-two"/><Icon size={70} strokeWidth={1} aria-hidden="true"/></div>
              <div className="category-bottom"><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>;
          })}</div>
          <p className="focus-note"><ShieldCheck size={15}/>{t.focus.note}</p>
        </div></section>
        {/* ===== SECTION 03: PRODUCT FOCUS END ===== */}

        {/* ===== SECTION 04: HOW WE WORK START ===== */}
        <section className="section process-section" id="process" aria-labelledby="process-heading"><div className="shell">
          <div className="section-top"><div><p className="eyebrow dark-eyebrow">{t.process.eyebrow}</p><h2 id="process-heading">{t.process.heading}<br/><em>{t.process.accent}</em></h2></div><p className="section-intro">{t.process.intro}</p></div>
          <div className="process-grid">{t.process.steps.map((step, idx) => {const Icon = processIcons[idx]; return <article className="process-step" key={step.number}><div className="process-head"><span>{step.number}</span><Icon size={26} strokeWidth={1.4}/></div><div className="process-rule"/><h3>{step.title}</h3><p>{step.description}</p></article>;})}</div>
        </div></section>
        {/* ===== SECTION 04: HOW WE WORK END ===== */}

        {/* ===== SECTION 05: PARTNERSHIPS START ===== */}
        <section className="section partners-section section-dark" id="partners" aria-labelledby="partners-heading"><div className="shell partners-grid">
          <div className="partners-copy"><p className="eyebrow light-eyebrow">{t.partners.eyebrow}</p><h2 id="partners-heading">{t.partners.heading}<br/><em>{t.partners.accent}</em></h2><p>{t.partners.intro}</p><a href="#contact" className="btn btn-gold">{t.partners.cta}<ArrowUpRight size={18}/></a></div>
          <div className="partner-benefits">{t.partners.benefits.map((benefit, idx) => {const Icon = partnerIcons[idx];return <article className="benefit" key={benefit.title}><div className="benefit-icon"><Icon size={24} strokeWidth={1.5}/></div><div><h3>{benefit.title}</h3><p>{benefit.description}</p></div><span className="benefit-index">0{idx + 1}</span></article>;})}</div>
        </div></section>
        {/* ===== SECTION 05: PARTNERSHIPS END ===== */}

        {/* ===== SECTION 06: BUSINESS PROFILE / VERIFIED CREDENTIALS START ===== */}
        <section className="section proof-section" id="credentials" aria-labelledby="proof-heading"><div className="shell proof-grid">
          <div className="proof-title"><p className="eyebrow dark-eyebrow">{t.proof.eyebrow}</p><h2 id="proof-heading">{t.proof.heading}<br/><em>{t.proof.accent}</em></h2>
          {/* <div className="proof-stamp">S<span>.</span><small>INDEPENDENT<br/>WHOLESALE BUSINESS</small></div> */}
          </div>
          <div className="proof-table">{t.proof.rows.map(row => <div className="proof-row" key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>)}</div>
        </div>
        </section>
        {/* ===== SECTION 06: BUSINESS PROFILE / VERIFIED CREDENTIALS END ===== */}

        {/* ===== SECTION 07: FOUNDER START ===== */}
        <section className="section founder-section" id="founder" aria-labelledby="founder-heading"><div className="shell founder-grid">
          <div className="founder-image-wrap"><div className="founder-image"><Image src="/muhammad-asim.jpeg" alt="Muhammad Asim in professional attire" fill sizes="(max-width: 900px) 90vw, 42vw" className="founder-portrait"/></div><div className="founder-image-tag">SILENT SHOPPING</div></div>
          <div className="founder-bio"><p className="eyebrow dark-eyebrow">{t.founder.eyebrow}</p><h2 id="founder-heading">{t.founder.heading}<br/><em>{t.founder.accent}</em></h2><span className="founder-role">{t.founder.role}</span><p className="lead">{t.founder.paragraph1}</p><p className="muted-paragraph">{t.founder.paragraph2}</p><div className="founder-signature"><span className="signature-line"/><span>{t.founder.note}</span></div></div>
        </div></section>
        {/* ===== SECTION 07: FOUNDER END ===== */}

        {/* ===== SECTION 08: CONTACT / INQUIRY START ===== */}
        <section className="section contact-section section-dark" id="contact" aria-labelledby="contact-heading"><div className="shell contact-grid">
          <div className="contact-copy"><p className="eyebrow light-eyebrow">{t.contact.eyebrow}</p><h2 id="contact-heading">{t.contact.heading}<br/><em>{t.contact.accent}</em></h2><p className="contact-intro">{t.contact.intro}</p>
            <div className="contact-details"><span className="contact-details-heading">{t.contact.information}</span>
              <div className="contact-detail"><MapPin size={20}/><div><small>{t.contact.locationLabel}</small><strong>Vitoria-Gasteiz, Spain</strong></div></div>
              <div className="contact-detail"><Mail size={20}/><div><small>{t.contact.emailLabel}</small><strong>{site.email || t.contact.emailPending}</strong></div></div>
              <div className="contact-detail"><Building2 size={20}/><div><small>{t.contact.whatsappLabel}</small><strong>{site.whatsapp ? `+${site.whatsapp}` : t.contact.whatsappPending}</strong></div></div>
            </div>
          </div>
          <form className="contact-form" onSubmit={submitInquiry}>
            <div className="form-head"><h3>{t.contact.formTitle}</h3><ArrowUpRight size={23}/></div>
            <div className="field-grid"><div className="field"><label htmlFor="your-name">{t.contact.name}</label><input id="your-name" required minLength={2} value={form.name} onChange={e => setForm({...form, name: e.target.value})}/></div><div className="field"><label htmlFor="company-name">{t.contact.company}</label><input id="company-name" required value={form.company} onChange={e => setForm({...form, company: e.target.value})}/></div></div>
            <div className="field"><label htmlFor="business-email">{t.contact.email}</label><input id="business-email" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}/></div>
            <div className="field"><label htmlFor="business-type">{t.contact.interest}</label><select id="business-type" required value={form.interest} onChange={e => setForm({...form, interest: e.target.value})}><option value="">{t.contact.select}</option>{t.contact.options.map((option, index) => <option key={option} value={["brand", "manufacturer", "wholesale-distributor", "other"][index]}>{option}</option>)}</select></div>
            <div className="field"><label htmlFor="partnership-message">{t.contact.message}</label><textarea id="partnership-message" required minLength={10} rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}/></div>
            <button className="btn btn-gold form-submit" type="submit">{t.contact.send}<ArrowUpRight size={18}/></button>
            {notice && <p className="form-notice" role="status">{notice}</p>}
            <p className="form-disclaimer">{t.contact.disclaimer}</p>
          </form>
        </div></section>
        {/* ===== SECTION 08: CONTACT / INQUIRY END ===== */}
      </main>

      {/* ===== SECTION 09: FOOTER START ===== */}
      <footer className="site-footer"><div className="shell footer-inner"><div className="footer-brand"><span className="brand-mark">S<span>.</span></span><div><strong>SILENT SHOPPING</strong><p>{t.footer.line}</p></div></div><p>© {new Date().getFullYear()} Silent Shopping. {t.footer.rights}</p><a href="#top">{t.footer.back}<ChevronUp size={16}/></a></div></footer>
      {/* ===== SECTION 09: FOOTER END ===== */}
    </>
  );
}
