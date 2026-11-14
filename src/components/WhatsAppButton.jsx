import React from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../data/business.js';

export default function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Book an appointment on WhatsApp">
      <MessageCircle size={20} aria-hidden="true" />
      <span>Book on WhatsApp</span>
    </a>
  );
}

