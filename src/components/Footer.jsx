import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { business, whatsappUrl } from '../data/business.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="wordmark wordmark--footer" href="#home" aria-label={business.shortName + ', back to top'}>
          <span className="wordmark__monogram">IJO</span>
          <span className="wordmark__name">HOUSE OF BEAUTY</span>
        </a>
        <p>Make room for a<br /><em>little more you.</em></p>
        <a className="footer-booking" href={whatsappUrl()} target="_blank" rel="noreferrer">Start a booking <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
      <div className="footer-lower">
        <span>© {new Date().getFullYear()} {business.shortName}</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#about">About</a><a href="#services">Services</a><a href="#our-work">The work</a><a href="#contact">Contact</a>
        </nav>
        <a className="footer-social" href={business.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={14} aria-hidden="true" />{business.instagramHandle}</a>
      </div>
      <div className="footer-contact">
        <span>BOOKINGS & ENQUIRIES</span>
        <a href={whatsappUrl()} target="_blank" rel="noreferrer">{business.phoneDisplay} <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
