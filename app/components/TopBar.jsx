'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FeaturesDropdownContent from './FeaturesDropdownContent';
import { openStore } from './useStoreUrl';
import styles from './TopBar.module.css';

const logoSvg = '/assets/logo.svg';
const desktopLinks = [
  { href: '/wealth-genie', label: 'Wealth Genie' }, { href: '/blogs', label: 'Blogs' },
  { href: '/pricing', label: 'Pricing' }, { href: '/contact', label: 'Contact' }, { href: '/how-it-works', label: 'How it works?' },
];

export default function TopBar({ tone = 'light' }) {
  const pathname = usePathname();
  const dropdownId = useId();
  const menuId = useId();
  const triggerRef = useRef(null);
  const headerRef = useRef(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const active = (href) => pathname === href || pathname?.startsWith(`${href}/`);
  const hoverTimer = useRef(null);
  const openFeatures = () => { clearTimeout(hoverTimer.current); setFeaturesOpen(true); };
  const closeFeatures = () => { clearTimeout(hoverTimer.current); setFeaturesOpen(false); };
  const closeFeaturesSoon = () => { clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setFeaturesOpen(false), 150); };
  const closeMobile = () => { setMenuOpen(false); setMobileFeaturesOpen(false); };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (featuresOpen) { closeFeatures(); triggerRef.current?.focus(); }
      if (menuOpen) closeMobile();
    };
    const onPointerDown = (event) => {
      if (featuresOpen && headerRef.current && !headerRef.current.contains(event.target)) closeFeatures();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown); };
  }, [featuresOpen, menuOpen]);

  return <header className={`${styles.header} ${tone === 'dark' ? styles.dark : ''}`.trim()} ref={headerRef}>
    <div className={styles.headerInner}>
      <Link href="/" className={styles.brand} aria-label="WealthNX home" onClick={closeMobile}><img src={logoSvg} alt="WealthNX" width="122" height="35" /></Link>
      <nav className={styles.desktopNav} aria-label="Primary navigation">
        <div className={styles.featuresWrap} onMouseEnter={openFeatures} onMouseLeave={closeFeaturesSoon}>
          <Link ref={triggerRef} href="/features/" className={`${styles.featuresTrigger} ${featuresOpen ? styles.open : ""} ${active("/features") ? styles.active : ""}`} aria-haspopup="true" aria-expanded={featuresOpen} aria-controls={dropdownId} onClick={closeFeatures} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); openFeatures(); } }}>Features <span className={styles.chevron} aria-hidden="true">⌄</span></Link>
          {featuresOpen && <div className={styles.megaBackdrop} aria-hidden="true" onClick={closeFeatures} />}
          {featuresOpen && <div id={dropdownId} className={styles.megaMenu} onMouseEnter={openFeatures} onMouseLeave={closeFeaturesSoon} role="region" aria-label="Features menu"><FeaturesDropdownContent onClose={closeFeatures} /></div>}
        </div>
        {desktopLinks.map(({ href, label, external }) => external ? <a href={href} key={href} className={styles.navLink}>{label}</a> : <Link href={href} key={href} className={`${styles.navLink} ${active(href) ? styles.active : ''}`}>{label}</Link>)}
      </nav>
      <div className={styles.actions}><a className={styles.login} href="https://app.wealthnx.ai/login">Login</a><a className={styles.getStarted} href="https://app.wealthnx.ai/signup">Get Started</a></div>
      <button type="button" className={styles.mobileToggle} aria-expanded={menuOpen} aria-controls={menuId} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
    </div>
    {menuOpen && <nav id={menuId} className={styles.mobileMenu} aria-label="Mobile navigation">
      {!mobileFeaturesOpen ? <>
        <Link href="/" className={styles.mobileLink} onClick={closeMobile}>Home</Link>
        <div className={styles.mobileFeatureRow}><Link href="/features/" className={styles.mobileLink} onClick={closeMobile}>Features</Link><button type="button" className={styles.mobileFeatureExpand} aria-label="Show feature list" onClick={() => setMobileFeaturesOpen(true)}>›</button></div>
        {desktopLinks.map(({ href, label, external }) => external ? <a key={href} href={href} className={styles.mobileLink} onClick={closeMobile}>{label}</a> : <Link key={href} href={href} className={styles.mobileLink} onClick={closeMobile}>{label}</Link>)}
        <button type="button" className={styles.mobileFeatureButton} onClick={(event) => { openStore(event); closeMobile(); }}>Download</button>
        <div className={styles.mobileActions}><a className={styles.login} href="https://app.wealthnx.ai/login">Login</a><a className={styles.getStarted} href="https://app.wealthnx.ai/signup">Get Started</a></div>
      </> : <><button type="button" className={styles.backButton} onClick={() => setMobileFeaturesOpen(false)}>‹ Back to menu</button><FeaturesDropdownContent onClose={closeMobile} /></>}
    </nav>}
  </header>;
}
