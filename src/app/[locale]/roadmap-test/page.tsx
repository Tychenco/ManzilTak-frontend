'use client';

import React, { useEffect, useRef } from 'react';
import { CareerTimeline } from '../../../../landing-page-prototype/CareerTimeline';

export default function RoadmapTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    /* ── Typewriter ── */
    function typeWriter(element: HTMLElement) {
      const text = element.getAttribute('data-text');
      if (!text) return;
      const cursor = element.querySelector('.typewriter-cursor') as HTMLElement;
      const textContainer = element.querySelector('.typewriter-text') as HTMLElement;
      if (!textContainer) return;
      let i = 0;
      const speed = 50;
      function type() {
        if (i < text!.length) {
          textContainer.innerHTML += text!.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          setTimeout(() => {
            if (cursor) cursor.classList.add('fade-out');
          }, 500);
        }
      }
      type();
    }

    /* ── Scroll reveal observer ── */
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const tw = entry.target.querySelector('.typewriter-container') as HTMLElement;
            if (tw && !tw.dataset.started) {
              tw.dataset.started = 'true';
              typeWriter(tw);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    root.querySelectorAll('.scroll-reveal').forEach((el) => scrollObserver.observe(el));

    /* ── Hero reveal ── */
    const heroHeadline = root.querySelector('#hero-headline');
    const heroElements = root.querySelectorAll('.reveal-element');
    const heroTimer = setTimeout(() => {
      if (heroHeadline) heroHeadline.classList.add('active');
      heroElements.forEach((el, index) => {
        setTimeout(() => el.classList.add('active'), (index + 1) * 600);
      });
    }, 300);

    /* ── DREAMY INTERACTIVE BLOB BACKGROUND (exact same as original code2.html) ── */
    const blobs = root.querySelectorAll('[data-blob]') as NodeListOf<HTMLElement>;
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      blobs.forEach((blob) => {
        const factor = parseFloat(blob.dataset.factor || '1');
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    document.addEventListener('mousemove', handleMouse);

    return () => {
      scrollObserver.disconnect();
      clearTimeout(heroTimer);
      document.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* ── External fonts ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* ── COMPLETE INLINE CSS ── */}
      <style>{`
        /* ─── Material Symbols ─── */
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block; line-height: 1; text-transform: none;
          letter-spacing: normal; word-wrap: normal; white-space: nowrap; direction: ltr;
        }

        /* ─── Shader drift ─── */
        @keyframes shader-drift {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(5%, 5%) scale(1.1); }
          66%  { transform: translate(-3%, 2%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* ─── Scroll Reveals ─── */
        .scroll-reveal {
          opacity: 0; transform: translateY(30px);
          transition: opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

        /* ─── Hero Reveal ─── */
        .hero-reveal {
          opacity: 0; transform: translateY(40px); filter: blur(8px);
          transition: opacity 2500ms cubic-bezier(0.16, 1, 0.3, 1), transform 2500ms cubic-bezier(0.16, 1, 0.3, 1), filter 2000ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-reveal.active { opacity: 1; transform: translateY(0); filter: blur(0); }

        /* ─── Typewriter ─── */
        .typewriter-text { display: inline; }
        .typewriter-container { position: relative; display: inline; }
        .typewriter-cursor {
          display: inline-block; width: 3px; height: 1em;
          background-color: #0070F3; box-shadow: 0 0 10px #0070F3;
          margin-left: 2px; vertical-align: middle; opacity: 1;
          transition: opacity 1s ease-out;
        }
        .typewriter-cursor.fade-out { opacity: 0; }

        /* ─── Reveal Elements ─── */
        .reveal-element {
          opacity: 0; transform: translateY(20px);
          transition: opacity 1500ms cubic-bezier(0.16, 1, 0.3, 1), transform 1500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-element.active { opacity: 1; transform: translateY(0); }
      `}</style>

      <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#ffffff', color: '#1c1c1a', minHeight: '100vh' }} className="antialiased">
        
        {/* ── Navbar ── */}
        <nav className="fixed top-0 w-full backdrop-blur-xl border-b" style={{ zIndex: 50, backgroundColor: 'rgba(255,255,255,0.8)', borderColor: '#f5f5f4' }}>
          <div className="flex justify-between items-center px-8 py-3 max-w-[1200px] mx-auto w-full">
            <div className="text-2xl tracking-tighter font-bold" style={{ color: '#1c1917' }}>ManzilTak</div>
            <div className="hidden md:flex items-center gap-10 tracking-tight font-medium text-sm">
              <a className="font-semibold" style={{ color: '#1d4ed8' }} href="#">Solutions</a>
              <a style={{ color: '#57534e' }} href="#">Methodology</a>
              <a style={{ color: '#57534e' }} href="#">Curriculum</a>
              <a style={{ color: '#57534e' }} href="#">About</a>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-sm font-medium" style={{ color: '#57534e' }}>Sign In</button>
              <button className="text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:scale-105 transition-all duration-700" style={{ backgroundColor: '#0058c3', boxShadow: '0 4px 14px rgba(0,88,195,0.1)' }}>Get Started</button>
            </div>
          </div>
        </nav>

        <main>
          {/* ═══════════════════════════════════════════════
              HERO SECTION — with EXACT dreamy blob background
              ═══════════════════════════════════════════════ */}
          <section className="relative min-h-[95vh] flex items-center justify-center px-8 pt-28 pb-20 overflow-hidden">
            
            {/* This is the EXACT blob background from code2.html */}
            <div style={{
              position: 'absolute', top: '-20%', left: '-20%', right: '-20%', bottom: '-20%',
              background: '#ffffff', overflow: 'hidden', zIndex: 0,
            }}>
              <div 
                data-blob="true" 
                data-factor="0.8"
                style={{
                  position: 'absolute', width: '70vw', height: '70vw',
                  filter: 'blur(120px)', opacity: 0.18, top: 0, left: 0,
                  background: 'radial-gradient(circle, #0070F3 0%, transparent 70%)',
                  transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              <div 
                data-blob="true" 
                data-factor="1.6"
                style={{
                  position: 'absolute', width: '70vw', height: '70vw',
                  filter: 'blur(120px)', opacity: 0.18, bottom: 0, right: 0,
                  background: 'radial-gradient(circle, #fe9572 0%, transparent 70%)',
                  transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              <div 
                data-blob="true" 
                data-factor="2.4"
                style={{
                  position: 'absolute', width: '70vw', height: '70vw',
                  filter: 'blur(120px)', opacity: 0.18, top: '30%', left: '40%',
                  background: 'radial-gradient(circle, #ffe083 0%, transparent 70%)',
                  transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            <div className="max-w-6xl mx-auto text-center" style={{ zIndex: 10, position: 'relative' }}>
              <h1 className="hero-reveal text-6xl md:text-7xl lg:text-[88px] font-black leading-[1.05] mb-12 mx-auto" id="hero-headline" style={{ color: '#1c1917', letterSpacing: '-0.04em' }}>
                Meet your personal<br />career guide
              </h1>
              <p className="reveal-element text-lg md:text-xl font-normal leading-relaxed max-w-4xl mx-auto mb-14 whitespace-nowrap overflow-hidden" style={{ color: '#57534e' }}>
                When the future feels wide and uncertain. Start where clarity comes naturally.
              </p>
              <div className="reveal-element flex flex-col sm:flex-row justify-center items-center gap-6">
                <button className="text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-[1.03] transition-all duration-700" style={{ backgroundColor: '#1c1917', boxShadow: '0 10px 25px rgba(28,25,23,0.1)' }}>
                  Begin Your Journey
                </button>
                <button className="font-bold px-8 py-5 flex items-center gap-2 group transition-all duration-500 text-lg hover:text-stone-900" style={{ color: '#57534e' }}>
                  View Methodology
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-500">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* ── Ambient transition shader: Hero → Roadmap ── */}
          <div className="relative" style={{ height: '120px', marginTop: '-60px', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
            <div style={{
              position: 'absolute', bottom: 0, left: '10%', width: '600px', height: '200px',
              background: 'radial-gradient(ellipse, rgba(0,112,243,0.04) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: '15%', width: '400px', height: '200px',
              background: 'radial-gradient(ellipse, rgba(254,149,114,0.04) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }} />
          </div>

          {/* ── Roadmap Section ── */}
          <section className="relative overflow-hidden py-16 px-8" style={{ backgroundColor: '#ffffff' }}>
            <div className="text-center mb-4 mt-8 scroll-reveal max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
              <span className="font-bold tracking-widest uppercase text-sm" style={{ color: '#99462a' }}>The Curated Process</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mt-4 whitespace-nowrap" style={{ color: '#1c1c1a' }}>
                <span className="typewriter-container" data-text="The roadmap to mastery">
                  <span className="typewriter-text"></span><span className="typewriter-cursor"></span>
                </span>
              </h2>
            </div>
            <CareerTimeline />
          </section>

          {/* ── Ambient transition shader: Roadmap → Bento ── */}
          <div className="relative" style={{ height: '160px', marginTop: '-80px', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
            <div style={{
              position: 'absolute', top: 0, left: '20%', width: '700px', height: '300px',
              background: 'radial-gradient(ellipse, rgba(255,224,131,0.06) 0%, rgba(254,149,114,0.03) 50%, transparent 80%)',
              filter: 'blur(80px)',
            }} />
            <div style={{
              position: 'absolute', top: 0, right: '10%', width: '500px', height: '250px',
              background: 'radial-gradient(ellipse, rgba(0,112,243,0.04) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }} />
          </div>

          {/* ── Bento Grid Section ── */}
          <section className="pt-8 pb-32 px-8 overflow-hidden relative" style={{ backgroundColor: '#ffffff' }}>
            {/* Subtle ambient glow behind the grid */}
            <div style={{
              position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px',
              background: 'radial-gradient(circle, rgba(216,226,255,0.15) 0%, transparent 70%)',
              filter: 'blur(100px)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px',
              background: 'radial-gradient(circle, rgba(255,219,208,0.1) 0%, transparent 70%)',
              filter: 'blur(100px)', pointerEvents: 'none',
            }} />

            <div className="max-w-[1440px] mx-auto relative" style={{ zIndex: 2 }}>
              <div className="mb-20 scroll-reveal">
                <h2 className="text-5xl md:text-7xl font-black tracking-tight" style={{ color: '#1c1c1a' }}>
                  <span className="typewriter-container" data-text="The Intelligence Layer">
                    <span className="typewriter-text"></span><span className="typewriter-cursor"></span>
                  </span>
                </h2>
                <p className="text-xl mt-6 max-w-xl leading-relaxed" style={{ color: '#414754' }}>
                  Every tool you need to navigate the academic and professional landscape with confidence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 h-auto lg:h-[700px]">
                {/* Large Card 1 */}
                <div
                  className="md:col-span-3 lg:col-span-8 rounded-[2rem] p-10 flex flex-col justify-between group cursor-pointer overflow-hidden relative scroll-reveal"
                  style={{
                    backgroundColor: 'rgba(216, 226, 255, 0.3)',
                    transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div className="relative" style={{ zIndex: 10 }}>
                    <span className="text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#0058c3' }}>Industry Pulse</span>
                    <h3 className="text-4xl font-black mt-8" style={{ color: '#001a43' }}>Real-time market alignment</h3>
                    <p className="mt-4 text-lg max-w-sm" style={{ color: '#004397' }}>We monitor 40,000+ industry signals to ensure your learning remains relevant as the global economy shifts.</p>
                  </div>
                  <div className="absolute right-0 bottom-0 w-1/2 h-2/3 opacity-20 group-hover:scale-110 transition-transform duration-1000">
                    <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                  </div>
                </div>

                {/* Small Card 2 */}
                <div
                  className="md:col-span-3 lg:col-span-4 rounded-[2rem] p-10 flex flex-col items-center text-center justify-center group cursor-pointer scroll-reveal"
                  style={{
                    backgroundColor: 'rgba(255, 219, 208, 0.3)',
                    transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <span className="material-symbols-outlined text-6xl mb-6 group-hover:rotate-12 transition-transform duration-700" style={{ color: '#99462a' }}>verified</span>
                  <h3 className="text-2xl font-bold" style={{ color: '#390b00' }}>Verified Mentorship</h3>
                  <p className="mt-2 text-sm" style={{ color: '#7a2f15' }}>Direct access to industry veterans.</p>
                </div>

                {/* Small Card 3 */}
                <div
                  className="md:col-span-3 lg:col-span-4 rounded-[2rem] p-10 flex flex-col justify-end group cursor-pointer relative overflow-hidden scroll-reveal"
                  style={{
                    backgroundColor: 'rgba(255, 224, 131, 0.3)',
                    transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div className="absolute top-10 left-10">
                    <span className="material-symbols-outlined text-5xl" style={{ color: '#735c00' }}>rocket_launch</span>
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: '#231b00' }}>Accelerated Path</h3>
                  <p className="mt-2 text-sm" style={{ color: '#574500' }}>Cut 40% off your time to hire with targeted skill-stacking modules.</p>
                </div>

                {/* Medium Card 4 */}
                <div
                  className="md:col-span-3 lg:col-span-8 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10 group cursor-pointer scroll-reveal"
                  style={{
                    backgroundColor: '#e5e2e0',
                    transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div className="w-full md:w-1/2">
                    <h3 className="text-3xl font-black" style={{ color: '#1c1c1a' }}>The Academic Concierge</h3>
                    <p className="mt-4" style={{ color: '#414754' }}>24/7 intelligent support to answer complex questions about curriculum, admissions, and career transitions.</p>
                  </div>
                  <div className="w-full md:w-1/2 p-6 rounded-2xl border shadow-xl" style={{ borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.4)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#0058c3' }}></div>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0058c3' }}>Assistant active</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: 'rgba(216, 226, 255, 0.4)' }}></div>
                      <div className="h-3 w-full rounded-full" style={{ backgroundColor: 'rgba(216, 226, 255, 0.2)' }}></div>
                      <div className="h-3 w-1/2 rounded-full" style={{ backgroundColor: 'rgba(216, 226, 255, 0.2)' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA Section ── */}
          <section className="py-40 px-8 text-center overflow-hidden relative" style={{ backgroundColor: '#0058c3' }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white rounded-full blur-[160px]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ backgroundColor: '#ffdbd0' }}></div>
            </div>
            <div className="max-w-4xl mx-auto relative scroll-reveal" style={{ zIndex: 10 }}>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-10 leading-none">
                <span className="typewriter-container" data-text="Your future self is waiting.">
                  <span className="typewriter-text"></span><span className="typewriter-cursor"></span>
                </span>
              </h2>
              <p className="text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: '#d8e2ff' }}>
                Join 12,000+ students who have found their calling through precision curation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="text-xl font-black hover:scale-105 transition-all duration-700 px-12 py-6 rounded-2xl" style={{ backgroundColor: '#ffffff', color: '#0058c3', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)' }}>
                  Get Your Free Prediction
                </button>
                <button className="text-white text-xl font-black hover:scale-105 transition-all duration-700 px-12 py-6 rounded-2xl hover:bg-white/10" style={{ border: '2px solid #d8e2ff' }}>
                  Schedule a Demo
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer style={{ backgroundColor: '#f5f5f4' }}>
          <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-[1440px] mx-auto">
            <div className="flex flex-col gap-4 mb-8 md:mb-0">
              <div className="text-lg font-bold" style={{ color: '#292524' }}>ManzilTak</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: '#78716c' }}>© 2024 ManzilTak. The Academic Curator.</div>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-xs tracking-widest uppercase">
              <a className="opacity-80 hover:opacity-100 hover:underline transition-all duration-700" style={{ color: '#78716c' }} href="#">Privacy Policy</a>
              <a className="opacity-80 hover:opacity-100 hover:underline transition-all duration-700" style={{ color: '#78716c' }} href="#">Terms of Service</a>
              <a className="opacity-80 hover:opacity-100 hover:underline transition-all duration-700" style={{ color: '#78716c' }} href="#">Academic Integrity</a>
              <a className="opacity-80 hover:opacity-100 hover:underline transition-all duration-700" style={{ color: '#78716c' }} href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
