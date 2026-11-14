import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Instagram, MessageCircle, Phone } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import VideoPlaceholder from './components/VideoPlaceholder.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import { business, whatsappUrl } from './data/business.js';
import { services } from './data/services.js';
import { heroVideo, videos } from './data/videos.js';

function prefersDataSaving() {
  if (typeof navigator === 'undefined') return false;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return Boolean(connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType));
}

function Hero() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 720px)').matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [dataSaving, setDataSaving] = useState(prefersDataSaving);
  const [heroNearViewport, setHeroNearViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState !== 'hidden');
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const source = mobile ? (heroVideo.mobileSrc || heroVideo.src) : (heroVideo.src || heroVideo.mobileSrc);
  const poster = heroVideo.poster || '/ijo-hero-poster.svg';
  const currentPoster = mobile && heroVideo.mobilePoster ? heroVideo.mobilePoster : poster;
  const shouldLoadVideo = Boolean(source) && !failed && !reducedMotion && !dataSaving && heroNearViewport;
  const shouldPlayVideo = shouldLoadVideo && pageVisible && heroVideo.autoplay !== false;

  useEffect(() => {
    const viewport = window.matchMedia('(max-width: 720px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateViewport = (event) => setMobile(event.matches);
    const updateMotion = (event) => setReducedMotion(event.matches);
    viewport.addEventListener('change', updateViewport);
    motion.addEventListener('change', updateMotion);
    return () => {
      viewport.removeEventListener('change', updateViewport);
      motion.removeEventListener('change', updateMotion);
    };
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return undefined;
    if (!('IntersectionObserver' in window)) {
      setHeroNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setHeroNearViewport(entry.isIntersecting);
    }, { rootMargin: '120px 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection?.addEventListener) return undefined;
    const updateDataSaving = () => setDataSaving(prefersDataSaving());
    connection.addEventListener('change', updateDataSaving);
    return () => connection.removeEventListener('change', updateDataSaving);
  }, []);

  useEffect(() => {
    setReady(false);
    setFailed(false);
  }, [source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    if (shouldPlayVideo) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    return () => video.pause();
  }, [shouldPlayVideo, source]);

  return (
    <section className="hero" id="home" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <picture className="hero__fallback">
          {heroVideo.mobilePoster && <source media="(max-width: 720px)" srcSet={heroVideo.mobilePoster} />}
          <img src={poster} alt="" loading="eager" fetchPriority="high" />
        </picture>
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            className={'hero__video' + (ready ? ' hero__video--ready' : '')}
            src={source}
            poster={currentPoster}
            muted
            loop={heroVideo.loop !== false}
            playsInline
            preload={heroVideo.preload || 'metadata'}
            onCanPlay={() => setReady(true)}
            onPlaying={() => setReady(true)}
            onWaiting={() => setReady(false)}
            onError={() => setFailed(true)}
            aria-hidden="true"
          />
        )}
        <div className="hero__shade" />
      </div>
      <div className="hero__copy">
        <p className="hero__eyebrow"><span />A HOUSE FOR EVERY EXPRESSION</p>
        <h1 id="hero-title"><span>Beauty,</span><em>in full</em><span>expression.</span></h1>
        <p className="hero__description">Hair, nails and beauty, shaped around the way you want to feel.</p>
        <div className="hero__actions">
          <a className="hero__booking" href={whatsappUrl()} target="_blank" rel="noreferrer">
            Book your visit <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <span className="hero__aside">HAIR · NAILS · BEAUTY</span>
        </div>
      </div>
      <div className="hero__bottomline">
        <span>UNISEX SALON</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-shell" id="about" aria-labelledby="about-title">
      <div className="section-label"><span>01</span><span>THE HOUSE</span><i /></div>
      <div className="about__layout">
        <p className="about__overline">A PLACE TO COME BACK TO YOURSELF</p>
        <div className="about__story">
          <h2 id="about-title">A little more<br /><em>you.</em></h2>
          <p>IJO House of Beauty is a unisex destination for hair, nails and beauty. Come in for a fresh style, a little self-care, or the finishing touch that feels like you.</p>
          <a className="editorial-link" href="#services">Meet the service edit <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="about__art">
          <img
            src="/images/image01.jpeg"
            alt="IJO House of Beauty salon sign with its services and contact information"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="about__foot"><span>CARE, WITH CHARACTER</span><span>EST. FOR YOUR NEXT CHAPTER</span></div>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="section-shell services__inner">
        <div className="section-label section-label--light"><span>02</span><span>THE SERVICE EDIT</span><i /></div>
        <div className="services__heading">
          <p className="services__overline">YOUR LOOK, YOUR CALL</p>
          <h2 id="services-title">The beauty<br /><em>index.</em></h2>
          <p className="services__intro">A considered mix of hair, nail and beauty services. Find your starting point, then tell us what you have in mind.</p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <a className="service-row" href={whatsappUrl('Hello IJO House of Beauty, I am interested in ' + service.title.toLowerCase() + '. Please share your available slots.')} target="_blank" rel="noreferrer" key={service.number}>
              <span className="service-row__number">{service.number}</span>
              <span className="service-row__title">{service.title}</span>
              <span className="service-row__detail">{service.detail}</span>
              <span className="service-row__tag">{service.tag}</span>
              <ArrowUpRight className="service-row__arrow" size={19} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="services__foot"><span>NOT SURE WHERE TO START?</span><a href={whatsappUrl()} target="_blank" rel="noreferrer">Talk it through with us <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}

function OurWork() {
  return (
    <section className="work section-shell" id="our-work" aria-labelledby="work-title">
      <div className="section-label"><span>03</span><span>THE MOVING IMAGE</span><i /></div>
      <div className="work__heading">
        <div><p className="work__overline">A WINDOW INTO THE HOUSE</p><h2 id="work-title">Made to be<br /><em>seen.</em></h2></div>
        <div className="work__aside"><p>A closer look at the craft, care and creativity behind each visit.</p></div>
      </div>
      <div className="gallery-grid" aria-label="Salon video gallery">
        {videos.map((video, index) => (
          <figure className={'gallery-item gallery-item--' + (index + 1) + ' gallery-item--' + video.aspect} key={video.id}>
            <VideoPlaceholder item={video} />
          </figure>
        ))}
      </div>
      <div className="work__foot"><span>THE IJO BEAUTY FILMS</span><span>PRESS PLAY TO WATCH&nbsp; ↗</span></div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="approach" aria-labelledby="approach-title">
      <div className="section-shell approach__inner">
        <div className="section-label"><span>04</span><span>THE FEELING</span><i /></div>
        <div className="approach__layout">
          <div className="approach__lead"><p className="approach__overline">IT STARTS WITH YOU</p><h2 id="approach-title">Beauty is<br />personal<span>.</span></h2><p>Come as you are. Leave feeling more like yourself.</p></div>
          <div className="approach__notes">
            <article><span>01 / THE MIX</span><div><h3>One place, many ways</h3><p>Hair, nails and beauty services in one unisex salon.</p></div></article>
            <article><span>02 / YOUR LOOK</span><div><h3>Make it your own</h3><p>Choose the service and style that feel right for you.</p></div></article>
            <article><span>03 / THE FIRST STEP</span><div><h3>Start with a message</h3><p>Chat with us on WhatsApp to arrange an appointment.</p></div></article>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingCTA() {
  return (
    <section className="booking" aria-labelledby="booking-title">
      <div className="booking__inner">
        <div className="booking__topline"><span>YOUR NEXT APPOINTMENT</span><span>05 / BEGIN HERE</span></div>
        <div className="booking__body">
          <p className="booking__overline">MAKE A LITTLE SPACE FOR YOU</p>
          <h2 id="booking-title">Come as<br /><em>you are.</em></h2>
          <a className="booking__link" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> Book on WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <span className="booking__ghost" aria-hidden="true">IJO</span>
        <span className="booking__side">HAIR / NAILS / BEAUTY</span>
        <p className="booking__note">Send a message and we’ll share the available appointment slots.</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
      <div className="section-label"><span>06</span><span>THE NEXT CHAPTER</span><i /></div>
      <div className="contact__layout">
        <div className="contact__lead"><p className="contact__overline">MONDAY — SATURDAY</p><h2 id="contact-title">Let’s make<br /><em>a date.</em></h2><p>Tell us what you’re thinking. We’ll help you find a time.</p></div>
        <div className="contact__details">
          <a className="contact-link" href={whatsappUrl()} target="_blank" rel="noreferrer"><span className="contact-link__label">WHATSAPP / BOOKING</span><strong>{business.phoneDisplay}</strong><ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className="contact-link" href={'tel:+' + business.whatsappNumber}><span className="contact-link__label">CALL THE SALON</span><strong>{business.phoneDisplay}</strong><ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className="contact-link" href={business.instagramUrl} target="_blank" rel="noreferrer"><span className="contact-link__label">FOLLOW THE STORY</span><strong>{business.instagramHandle}</strong><Instagram size={17} aria-hidden="true" /></a>
          <div className="contact__hours"><span>OPEN</span><strong>{business.operatingDays}</strong></div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <OurWork />
        <WhyChooseUs />
        <BookingCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}



