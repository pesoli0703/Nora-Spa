import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Flower2, Heart, Leaf, Menu, MessageCircle, MoveUpRight, Phone, ShieldCheck, Sparkles, X } from 'lucide-react';

const WA_NUMBER = '2347068752258';
const PHONE_DISPLAY = '0810 023 6403';
const PHONE_LINK = '+2348100236403';
const waLink = (message = 'Hello Nora Home Service Spa, I would like to make a booking enquiry.') => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const reviews = [
  'I like having my massage done during this weather… very relaxing and strong now. Thanks for your special magical touches.',
  'Excellent service! Professional, relaxing, and truly worth it. I’ll definitely be booking again with Nora Home Service Spa.',
  'Had a very good experience getting massage from Nora mobile spa. The therapist understood the assignment. She was so nice.',
  'Very professional and organized home service therapists I got, staff was kind and respectful. Will definitely be requesting again.',
  'My experience with Nora spa was great. The massage was a great relief.',
  'In my opinion Nora spa has the best massagers around.'
];

function usePageEffects(title, description) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);
  }, [title, description]);
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) { nodes.forEach(n => n.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(window.scrollY > 24);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);
  useEffect(() => {
    const onKeyDown = event => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  const nav = [['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Reviews', '/reviews'], ['Contact', '/contact']];
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="header-inner">
      <Link to="/" className="brand" aria-label="Nora Home Service Spa home"><span className="brand-mark">N<span>.</span></span><span className="brand-copy"><strong>Nora</strong><small>HOME SERVICE SPA</small></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav>
      <a className="button button-gold header-book" href={waLink()} target="_blank" rel="noreferrer">Book an Appointment <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
    </div>
    <div className={`mobile-panel ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="mobile-panel-top"><span>MENU</span><button aria-label="Close menu" onClick={() => setOpen(false)}><X/></button></div>
      <nav aria-label="Mobile navigation">{nav.map(([label, path], i) => <NavLink key={path} to={path} end={path === '/'} style={{'--i': i}}>{label}<ArrowUpRight size={19}/></NavLink>)}</nav>
      <a className="button button-gold mobile-book" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Book on WhatsApp</a>
      <div className="mobile-note">A little more ease, wherever you are.</div>
    </div>
    {open && <button className="panel-scrim" onClick={() => setOpen(false)} aria-label="Close navigation"/>}
  </header>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-main wrap">
      <div className="footer-brand"><Link to="/" className="brand brand-light"><span className="brand-mark">N<span>.</span></span><span className="brand-copy"><strong>Nora</strong><small>HOME SERVICE SPA</small></span></Link><p>Thoughtful massage and spa experiences, brought to the comfort of your location.</p><a className="footer-wa" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Start a WhatsApp enquiry <ArrowUpRight size={14}/></a></div>
      <div className="footer-column"><h3>Explore</h3><Link to="/about">About Nora</Link><Link to="/services">Services</Link><Link to="/reviews">Customer feedback</Link><Link to="/contact">Book / Contact</Link></div>
      <div className="footer-column"><h3>Get in touch</h3><a href={`tel:${PHONE_LINK}`}><Phone size={15}/>{PHONE_DISPLAY}</a><a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={15}/>WhatsApp booking</a><span>Home service, arranged with care</span></div>
    </div>
    <div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Nora Home Service Spa. All rights reserved.</span><Link to="/privacy">Privacy Policy <ArrowUpRight size={13}/></Link><span className="illustrative-note">Spa imagery is illustrative.</span></div>
  </footer>;
}

function CTASection({ compact = false }) {
  return <section className={`cta-section ${compact ? 'cta-compact' : ''}`}><div className="cta-text" data-reveal><span className="eyebrow eyebrow-light"><span/> MAKE SPACE FOR YOU</span><h2>Your moment of relaxation<br className="desktop-only"/> starts here.</h2><p>Ready to enjoy a personalised massage experience? Contact Nora Home Service Spa today and arrange your appointment.</p><a className="button button-ivory" href={waLink()} target="_blank" rel="noreferrer">Book on WhatsApp <ArrowUpRight size={16}/></a></div><div className="cta-orbit orbit-one"/><div className="cta-orbit orbit-two"/><div className="cta-flower"><Flower2/></div></section>;
}

function SectionHeading({ eyebrow, title, children, centered = false }) {
 return <div className={`section-heading ${centered ? 'centered' : ''}`} data-reveal><span className="eyebrow"><span/>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function ReviewCards({ limit }) {
 const list = typeof limit === 'number' ? reviews.slice(0, limit) : reviews;
 return <div className="review-grid">{list.map((text, i) => <article className="review-card" key={text} data-reveal style={{'--delay': `${(i % 3) * 90}ms`}}><div className="review-top"><span className="quote-mark">“</span><span className="review-kind">CUSTOMER WORDS</span></div><blockquote>{text}</blockquote><div className="review-source"><span className="source-icon">G</span><span>Customer feedback<small>Shared with Nora Home Service Spa</small></span><Check size={15} className="review-check"/></div></article>)}</div>;
}

const serviceCards = [
  { icon: <Flower2/>, title: 'Massage enquiries', copy: 'Tell us about the massage experience you have in mind. We’ll talk through the details and availability together.', image: '/images/spa-room.jpg', alt: 'A calm massage setting with fresh white linens and soft natural light' },
  { icon: <Sparkles/>, title: 'At-home spa experience', copy: 'Explore a more relaxed way to enjoy spa care, with an experience arranged for your preferred location.', image: '/images/spa-detail.jpg', alt: 'Ivory towels and massage oils arranged for an at-home spa experience' },
  { icon: <Heart/>, title: 'A session shaped around you', copy: 'Share your preferences when you enquire so the team can help you find an experience that feels right.', image: '/images/spa-hero.jpg', alt: 'Warm, peaceful home setting prepared for a massage experience' }
];

function ServiceCards() {
 return <div className="service-grid">{serviceCards.map((item, i) => <article className="service-card" key={item.title} data-reveal style={{'--delay': `${i * 100}ms`}}><Link to="/contact" className="service-image"><img src={item.image} alt={item.alt} loading="lazy"/><span className="service-arrow"><ArrowUpRight size={18}/></span></Link><div className="service-info"><span className="service-icon">{item.icon}</span><h3>{item.title}</h3><p>{item.copy}</p><a href={waLink(`Hello Nora Home Service Spa, I would like to enquire about ${item.title.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="text-link">Enquire on WhatsApp <ArrowRight size={15}/></a></div></article>)}</div>;
}

function Home() {
 usePageEffects('Nora Home Service Spa | Relaxation, delivered', 'Enjoy personalised home-service massage and spa care with Nora Home Service Spa. Enquire and arrange a visit to your preferred location.');
 return <><main>
  <section className="hero"><img src="/images/spa-hero.jpg" alt="A serene home spa setting with soft linens, candlelight and massage oils" className="hero-photo" fetchPriority="high"/><div className="hero-shade"/><div className="hero-content wrap"><div className="hero-copy"><span className="eyebrow eyebrow-light"><span/> RELAXATION, DELIVERED</span><h1>Come back to<br/><em>yourself.</em></h1><p className="hero-lead">Relax, recharge and feel better — in the comfort of your home.</p><p className="hero-sub">Experience personalised home-service massage and spa care with Nora. A thoughtful moment of calm, brought to your preferred location.</p><div className="hero-actions"><a className="button button-gold" href={waLink()} target="_blank" rel="noreferrer">Book a Massage <ArrowUpRight size={16}/></a><Link className="button button-outline-light" to="/services">Explore our services <ArrowRight size={16}/></Link></div><div className="trust-points"><span><Check size={14}/> Convenient home service</span><i/><span><Check size={14}/> Professional care</span><i/><span><Check size={14}/> Personalised relaxation</span></div></div><div className="hero-note"><span className="hero-note-line"/><span>A softer kind of<br/>coming home.</span></div><a href="#welcome" className="scroll-cue" aria-label="Scroll to discover"><span>SCROLL TO DISCOVER</span><ArrowDown size={15}/></a></div><span className="hero-index">01 <i/> NORA HOME SERVICE SPA</span></section>
  <section className="intro-section wrap" id="welcome"><div className="intro-side" data-reveal><span className="eyebrow"><span/> CARE, AT YOUR PACE</span><div className="intro-number">01 <span>/ 03</span></div></div><div className="intro-content" data-reveal><h2>Wellbeing feels<br/>better <em>close to home.</em></h2><div className="intro-copy"><p>Make room to pause without making a day of getting there. Nora Home Service Spa brings a considered massage and spa experience to your preferred location.</p><Link className="text-link" to="/about">A little about Nora <ArrowRight size={15}/></Link></div></div></section>
  <section className="services-preview section-pad"><div className="wrap"><div className="split-heading"><SectionHeading eyebrow="A MOMENT, MADE YOURS" title="Care that comes to you.">A home-service experience made easier to arrange, with your comfort at its centre.</SectionHeading><Link className="button button-outline-dark" to="/services">Explore services <ArrowRight size={16}/></Link></div><ServiceCards/></div></section>
  <section className="why-section section-pad"><div className="wrap why-layout"><div className="why-visual" data-reveal><img src="/images/spa-room.jpg" alt="A quiet, softly lit room prepared for a relaxing massage" loading="lazy"/><div className="visual-caption"><span className="caption-flower"><Flower2/></span><span>Slow down.<br/><em>Feel at ease.</em></span></div><span className="visual-index">A MOMENT FOR YOU · NORA SPA</span></div><div className="why-content"><SectionHeading eyebrow="THE NORA DIFFERENCE" title="Your comfort. Our priority.">A few thoughtful reasons to make time for yourself.</SectionHeading><div className="benefit-list"><Benefit icon={<Leaf/>} title="Convenience">Arrange a massage experience from the comfort of your location.</Benefit><Benefit icon={<ShieldCheck/>} title="Professional service">A customer-focused approach, from first enquiry to your visit.</Benefit><Benefit icon={<Heart/>} title="Personalised experience">An experience arranged around your preferences and needs.</Benefit><Benefit icon={<MessageCircle/>} title="Easy booking">Get in touch directly to enquire and arrange an appointment.</Benefit></div><Link to="/about" className="text-link">Discover the Nora approach <ArrowRight size={15}/></Link></div></div></section>
  <section className="reviews-preview section-pad"><div className="wrap"><div className="review-head"><SectionHeading eyebrow="KIND WORDS" title="Trusted by customers who value quality care.">Thoughts shared by customers after their Nora experience.</SectionHeading><Link className="text-link" to="/reviews">Read all feedback <ArrowRight size={15}/></Link></div><ReviewCards limit={3}/></div></section>
  <GalleryPreview/>
  <CTASection/>
 </main></>;
}

function Benefit({ icon, title, children }) { return <div className="benefit"><span className="benefit-icon">{icon}</span><div><h3>{title}</h3><p>{children}</p></div></div>; }

const galleryImages = [
 {src:'/images/spa-hero.jpg',alt:'A peaceful home spa setting with warm candlelight', label:'A quiet welcome'},
 {src:'/images/spa-detail.jpg',alt:'Soft towels and massage oils in a warm spa setting',label:'Thoughtful details'},
 {src:'/images/spa-room.jpg',alt:'Massage table prepared in a sunlit room',label:'Room to unwind'},
 {src:'/images/spa-hero.jpg',alt:'Clean linens and gentle light create a calm setting',label:'A softer pace'},
];
function GalleryPreview() {
 const [selected, setSelected] = useState(null);
 const close = () => setSelected(null);
 useEffect(() => { const handle = e => { if (e.key === 'Escape') close(); if (selected !== null && e.key === 'ArrowRight') setSelected((selected + 1) % galleryImages.length); if (selected !== null && e.key === 'ArrowLeft') setSelected((selected + galleryImages.length - 1) % galleryImages.length); }; window.addEventListener('keydown',handle); return () => window.removeEventListener('keydown',handle); },[selected]);
 return <section className="gallery-section section-pad"><div className="wrap"><div className="gallery-head"><SectionHeading eyebrow="THE LITTLE DETAILS" title="A calmer kind of setting.">Illustrative spa imagery, inspired by the small details that make a moment feel special.</SectionHeading><span className="gallery-count">01 — 04</span></div><div className="gallery-grid">{galleryImages.map((img,i)=><button key={i} className={`gallery-tile tile-${i+1}`} onClick={()=>setSelected(i)} aria-label={`View image: ${img.label}`} data-reveal><img src={img.src} alt={img.alt} loading="lazy"/><span className="gallery-label">{img.label}<ArrowUpRight size={15}/></span></button>)}</div><p className="image-disclaimer">Images shown are illustrative and are not photographs of Nora’s staff or premises.</p></div>
 {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image gallery" onClick={close}><button className="lightbox-close" onClick={close} aria-label="Close image"><X/></button><button className="lightbox-nav prev" onClick={e=>{e.stopPropagation();setSelected((selected+galleryImages.length-1)%galleryImages.length)}} aria-label="Previous image"><ChevronLeft/></button><figure onClick={e=>e.stopPropagation()}><img src={galleryImages[selected].src} alt={galleryImages[selected].alt}/><figcaption>{galleryImages[selected].label}</figcaption></figure><button className="lightbox-nav next" onClick={e=>{e.stopPropagation();setSelected((selected+1)%galleryImages.length)}} aria-label="Next image"><ChevronRight/></button></div>}
 </section>;
}

function About() {
 usePageEffects('About Nora Home Service Spa | Home Massage Service', 'Meet Nora Home Service Spa: a home-service massage and spa experience for customers who value comfort, convenience and personal attention.');
 return <main><PageHero kicker="A LITTLE ABOUT US" title={<>Your comfort.<br/><em>Your relaxation.</em><br/>Our priority.</>} text="Wellbeing, brought a little closer to home." image="/images/spa-room.jpg" alt="A peaceful massage room with fresh linens and a calm, sunlit setting"/>
 <section className="about-story section-pad"><div className="wrap about-story-grid"><div className="about-stamp" data-reveal><Flower2/><span>YOUR SPACE<br/>TO UNWIND</span><i/></div><div className="about-copy" data-reveal><span className="eyebrow"><span/> COMFORT, WHERE YOU ARE</span><h2>A little more ease,<br/>right where you <em>are.</em></h2><p>Nora Home Service Spa provides home-service massage and spa experiences for customers who value comfort and convenience. We believe taking a moment for yourself should feel simple — from the first message to settling into your own space.</p><p>Whether you’re exploring a massage or looking for a more considered spa experience, reach out to share what you have in mind. We’ll help you enquire and arrange the details.</p><a className="button button-dark" href={waLink()} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={16}/></a></div></div></section>
 <section className="benefits-band section-pad"><div className="wrap"><SectionHeading eyebrow="WHY NORA" title="Your time, your way." centered>Care designed around what matters to you.</SectionHeading><div className="benefit-cards"><BenefitCard number="01" icon={<Leaf/>} title="Convenience" text="Arrange your massage experience from the comfort of your location."/><BenefitCard number="02" icon={<ShieldCheck/>} title="Professional service" text="A customer-focused approach to every appointment."/><BenefitCard number="03" icon={<Heart/>} title="Personalised" text="An experience arranged around your preferences and needs."/><BenefitCard number="04" icon={<MessageCircle/>} title="Easy booking" text="Contact the business directly to enquire and arrange a time."/></div></div></section><CTASection compact/></main>;
}
function BenefitCard({number,icon,title,text}) {return <article className="benefit-card" data-reveal><span className="benefit-number">{number}</span><span className="benefit-card-icon">{icon}</span><h3>{title}</h3><p>{text}</p><span className="benefit-line"/></article>}

function PageHero({kicker,title,text,image,alt}) {return <section className="page-hero"><img src={image} alt={alt} fetchPriority="high"/><div className="page-hero-shade"/><div className="wrap page-hero-content"><span className="eyebrow eyebrow-light"><span/>{kicker}</span><h1>{title}</h1>{text&&<p>{text}</p>}<div className="page-breadcrumb"><Link to="/">Home</Link><span>/</span><span>{kicker.replace('A LITTLE ','').replace('OUR ','')}</span></div></div></section>}

function Services() {
 usePageEffects('Massage & Spa Services | Nora Home Service Spa', 'Explore home-service massage and spa enquiries with Nora Home Service Spa. Contact us directly to discuss your preferred experience and availability.');
 return <main><PageHero kicker="A MOMENT, MADE YOURS" title={<>Care that<br/><em>comes to you.</em></>} text="Explore a home-service massage and spa experience, arranged around your comfort." image="/images/spa-detail.jpg" alt="Soft ivory towels and massage oils arranged in a calming spa setting"/><section className="services-page section-pad"><div className="wrap"><div className="services-page-intro"><SectionHeading eyebrow="EXPLORE WITH NORA" title="Start with what you need.">Every enquiry is a chance to share what kind of experience you’re looking for. Reach out and we can discuss the details, availability and what may suit your preferences.</SectionHeading><div className="service-note"><Sparkles size={19}/><p>Specific treatments and availability can be discussed directly. No service menu or prices are listed here.</p></div></div><ServiceCards/><div className="service-bottom-note"><span className="note-icon"><MessageCircle/></span><p>Have something else in mind? Let us know when you get in touch.</p><a className="text-link" href={waLink()} target="_blank" rel="noreferrer">Ask Nora on WhatsApp <ArrowRight size={15}/></a></div></div></section><CTASection compact/></main>;
}

function Reviews() {
 usePageEffects('Customer Reviews | Nora Home Service Spa', 'Read customer feedback shared about Nora Home Service Spa.');
 return <main><PageHero kicker="KIND WORDS" title={<>Experiences,<br/><em>in their words.</em></>} text="Customer feedback shared after time spent with Nora Home Service Spa." image="/images/spa-hero.jpg" alt="A warm, peaceful home spa setting with a massage table and gentle candlelight"/><section className="reviews-page section-pad"><div className="wrap"><div className="reviews-intro"><SectionHeading eyebrow="CUSTOMER FEEDBACK" title="Trusted by customers who value quality care.">These words have been shared by Nora Home Service Spa customers. We’re grateful for every kind note.</SectionHeading><div className="google-note"><span className="google-letter">G</span><span>Customer reviews<small>Shared feedback</small></span></div></div><ReviewCards/><div className="review-footnote">Customer feedback reproduced as shared. No rating or review count is displayed.</div></div></section><CTASection compact/></main>;
}

function BookingForm() {
 const [status, setStatus] = useState('');
 const [fallbackUrl, setFallbackUrl] = useState('');
 const [submitting, setSubmitting] = useState(false);
 const today = useMemo(() => new Date().toISOString().split('T')[0], []);
 const handleSubmit = e => {
   e.preventDefault();
   const form = e.currentTarget;
   if (!form.reportValidity()) return;
   const data = new FormData(form);
   const msg = `Hello Nora Home Service Spa, I would like to make a booking enquiry.\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nPreferred Service: ${data.get('service')}\nPreferred Date: ${data.get('date')}\nPreferred Time: ${data.get('time')}\nLocation: ${data.get('location')}\nAdditional Message: ${data.get('message') || '—'}`;
   setSubmitting(true);
   const messageUrl = waLink(msg);
   setFallbackUrl(messageUrl);
   const popup = window.open(messageUrl, '_blank');
   if (popup) popup.opener = null;
   setStatus(popup ? 'Your enquiry is ready in WhatsApp. Please review and send your message. The team will confirm your appointment directly.' : 'WhatsApp could not open automatically. Use this link to continue your enquiry.');
   setSubmitting(false);
 };
 return <form className="booking-form" onSubmit={handleSubmit}>
  <div className="form-heading"><span className="eyebrow"><span/> LET’S ARRANGE A MOMENT</span><h2>Booking enquiry</h2><p>Share a few details and we’ll continue your enquiry in WhatsApp.</p></div>
  <div className="form-grid"><label className="form-field"><span>Full name <b>*</b></span><input name="name" autoComplete="name" placeholder="Your name" required/></label><label className="form-field"><span>Phone number <b>*</b></span><input name="phone" type="tel" autoComplete="tel" placeholder="e.g. 080 1234 5678" required/></label><label className="form-field"><span>Preferred service <b>*</b></span><select name="service" defaultValue="" required><option value="" disabled>Select an option</option><option>Massage enquiry</option><option>At-home spa experience</option><option>I'd like to discuss options</option></select></label><label className="form-field"><span>Preferred date <b>*</b></span><input name="date" type="date" min={today} required/></label><label className="form-field"><span>Preferred time <b>*</b></span><input name="time" type="time" required/></label><label className="form-field"><span>Service location <b>*</b></span><input name="location" autoComplete="street-address" placeholder="Area or neighbourhood" required/></label><label className="form-field form-wide"><span>Additional message <small>(optional)</small></span><textarea name="message" rows="4" placeholder="Anything you would like us to know?"/></label></div>
  <button className="button button-gold submit-button" type="submit" disabled={submitting}>Send booking request on WhatsApp <ArrowUpRight size={16}/></button>
  <p className="form-reassurance"><ShieldCheck size={15}/> Your details are used to prepare your enquiry. Nothing is booked until Nora confirms with you.</p>
  {status && <div className="form-status" role="status"><Check size={17}/><span>{status} <a href={fallbackUrl || waLink()} target="_blank" rel="noreferrer">Open WhatsApp</a></span></div>}
 </form>;
}

function Contact() {
 usePageEffects('Book a Home Massage | Contact Nora Home Service Spa', 'Send a booking enquiry to Nora Home Service Spa through WhatsApp. Share your preferred service, date, time and location.');
 return <main><PageHero kicker="LET’S MAKE IT EASY" title={<>Your next moment<br/><em>starts here.</em></>} text="A few details, a quick conversation, and we’ll help arrange a time that works." image="/images/spa-room.jpg" alt="A softly lit room with fresh towels, prepared for a massage experience"/><section className="contact-section section-pad"><div className="wrap contact-layout"><div className="contact-aside" data-reveal><span className="eyebrow"><span/> YOUR TIME, YOUR PLACE</span><h2>Let’s make<br/>room for <em>you.</em></h2><p>Send us an enquiry and we’ll be in touch to confirm the details. Your appointment isn’t confirmed until the business gets back to you.</p><div className="contact-details"><a href={waLink()} target="_blank" rel="noreferrer"><span><MessageCircle/></span><div><small>WHATSAPP</small><strong>+234 706 875 2258</strong><em>Start a conversation <ArrowUpRight size={12}/></em></div></a><a href={`tel:${PHONE_LINK}`}><span><Phone/></span><div><small>CALL US</small><strong>{PHONE_DISPLAY}</strong><em>Phone contact</em></div></a><div className="contact-detail-static"><span><Clock3/></span><div><small>AVAILABILITY</small><strong>Confirm directly</strong><em>Ask about available times</em></div></div></div><p className="hours-note">Opening hours are not confirmed here. Please ask the team about availability.</p></div><BookingForm/></div></section><section className="contact-cta"><div className="wrap contact-cta-inner"><div><span className="eyebrow"><span/> PREFER TO MESSAGE?</span><h2>We’re just a message away.</h2></div><a className="button button-dark" href={waLink()} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={16}/></a></div></section></main>;
}

function Privacy() {
 usePageEffects('Privacy Policy | Nora Home Service Spa', 'Privacy information for the Nora Home Service Spa website and booking enquiry form.');
 return <main><PageHero kicker="YOUR INFORMATION" title={<>Privacy,<br/><em>with care.</em></>} text="A clear explanation of what happens when you make a booking enquiry." image="/images/spa-detail.jpg" alt="Folded clean towels in a calm, warm-toned spa setting"/><section className="privacy-section section-pad"><div className="wrap privacy-layout"><aside className="privacy-aside"><span className="eyebrow"><span/> LAST UPDATED</span><p>25 November 2026</p><span className="privacy-rule"/><p>This policy explains how information entered into this website’s booking enquiry form is handled.</p></aside><article className="privacy-copy"><h2>Privacy Policy</h2><p className="privacy-lede">Your enquiry details are yours. Here’s what to expect when you use this website.</p><h3>Information you provide</h3><p>The booking enquiry form asks for your name, phone number, preferred service, preferred date and time, service location, and any optional message you choose to include. Your browser uses these details to prepare a WhatsApp message addressed to Nora Home Service Spa.</p><h3>How enquiries are handled</h3><p>Submitting the form opens WhatsApp with your message prepared. The website itself does not submit the form to a Nora server or store the form details. You choose whether to send the message in WhatsApp. Once sent, the message is handled by WhatsApp and the business in accordance with their respective practices.</p><h3>Sharing and third parties</h3><p>This website does not send your form details to other parties. If you choose to send your enquiry using WhatsApp, that service receives the message. This site also loads web fonts from Google Fonts; your browser may make a request to Google to retrieve those fonts.</p><h3>Retention and security</h3><p>The website does not keep a copy of your form entry. If you send an enquiry, Nora Home Service Spa may receive your details through WhatsApp; ask the business directly how long it keeps messages and how they are protected. This policy does not make claims about processes that have not been confirmed.</p><h3>Your choices</h3><p>You can choose not to submit the form, or remove or change information before sending your WhatsApp message. To ask the business about access to or deletion of information you have already sent, contact Nora Home Service Spa directly on <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a> or call <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>.</p><h3>Policy updates</h3><p>If the website’s data handling changes, this policy should be updated to reflect those changes. The date above indicates the current publication date.</p><div className="privacy-contact"><MessageCircle/><p>Questions about an enquiry? <a href={waLink()} target="_blank" rel="noreferrer">Contact Nora Home Service Spa</a>.</p></div></article></div></section></main>;
}

function NotFound() { usePageEffects('Page not found | Nora Home Service Spa','The page you requested could not be found.'); return <main className="not-found"><span className="eyebrow"><span/> A LITTLE DETOUR</span><h1>Let’s find your<br/><em>way back.</em></h1><Link className="button button-dark" to="/">Return home <ArrowRight size={16}/></Link></main>; }

export default function App() {
 const location = useLocation();
 useEffect(() => { window.scrollTo(0,0); },[location.pathname]);
 return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/reviews" element={<Reviews/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/><a className="floating-whatsapp" href={waLink()} target="_blank" rel="noreferrer" aria-label="Enquire on WhatsApp"><MessageCircle size={20}/><span>Enquire</span></a></>;
}
