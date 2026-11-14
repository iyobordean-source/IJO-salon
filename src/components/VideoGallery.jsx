import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function VideoGallery({ activeVideo, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!activeVideo) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(document.querySelectorAll('.media-modal__panel button:not([disabled]), .media-modal__panel video[controls]'))
        .filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [activeVideo, onClose]);

  if (!activeVideo) return null;

  return (
    <div className="media-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="media-modal__panel" role="dialog" aria-modal="true" aria-labelledby="media-modal-title">
        <button className="media-modal__close" ref={closeRef} type="button" onClick={onClose} aria-label="Close video viewer"><X size={20} /></button>
        <p className="media-modal__eyebrow">THE IJO BEAUTY FILM</p>
        <h2 id="media-modal-title" className="media-modal__title">{activeVideo.label}</h2>
        {activeVideo.src ? (
          <video className="media-modal__video" src={activeVideo.src} poster={activeVideo.poster || undefined} controls={activeVideo.controls !== false} muted={activeVideo.muted !== false} playsInline preload="none" />
        ) : (
          <div className={'media-modal__empty' + (activeVideo.aspect === 'landscape' ? ' media-modal__empty--landscape' : '')}>
            <span className="eyebrow">CONFIGURABLE VIDEO SLOT</span>
            <p>Add this clip in <code>src/data/videos.js</code> by setting its <code>src</code> path.</p>
            <p className="media-modal__hint">Add the video file to <code>public/videos/</code>.</p>
          </div>
        )}
      </section>
    </div>
  );
}
