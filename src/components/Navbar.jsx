import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { business, whatsappUrl } from '../data/business.js';

const links = [
  ['About', '#about'],
  ['Services', '#services'],
  ['The work', '#our-work'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 32);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  return (
    <header className={'site-header' + (scrolled || open ? ' site-header--solid' : '')}>
      <a className="wordmark" href="#home" onClick={closeMenu} aria-label={business.shortName + ', home'}>
        <span className="wordmark__monogram">IJO</span>
        <span className="wordmark__name">HOUSE OF BEAUTY</span>
      </a>
      <button
        className="nav-toggle"
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="primary-navigation"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <span>{open ? 'CLOSE' : 'MENU'}</span>{open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>
      <nav id="primary-navigation" className={'primary-nav' + (open ? ' primary-nav--open' : '')} aria-label="Main navigation">
        <a className="primary-nav__home" href="#home" onClick={closeMenu}>Home</a>
        {links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-booking" href={whatsappUrl()} target="_blank" rel="noreferrer" onClick={closeMenu}>
          Book an appointment <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
