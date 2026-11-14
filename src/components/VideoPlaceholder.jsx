import React, { useEffect, useRef, useState } from 'react';

export default function VideoPlaceholder({ item }) {
  const frameRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [failed, setFailed] = useState(false);
  const aspect = item.aspect === 'landscape' ? 'video-frame--landscape' : 'video-frame--portrait';

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNearViewport(true);
      observer.disconnect();
    }, { rootMargin: '220px 0px' });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={'video-frame ' + aspect} ref={frameRef}>
      {nearViewport && item.src && !failed ? (
        <video
          className="video-frame__video"
          src={item.src}
          controls
          playsInline
          preload="metadata"
          aria-label={item.label}
          onError={() => setFailed(true)}
        />
      ) : failed ? (
        <p className="video-frame__error">Video file unavailable: {item.src.split('/').pop()}</p>
      ) : null}
    </div>
  );
}
