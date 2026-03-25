'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/* ═══════════════════════════════════════════════════════════════════
   STEP DATA & ICONS
   ═══════════════════════════════════════════════════════════════════ */

const STEPS = [
  { 
    id: 1, 
    title: 'Profile Creation', 
    desc: 'Share your core interests and cognitive style. No grades, no pressure. Your journey begins with a complete mapping of your innate baseline.', 
    x: 50, y: 3.57, align: 'left' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    )
  },
  { 
    id: 2, 
    title: 'Interest Discovery', 
    desc: 'An intuitive assessment that uncovers what genuinely motivates you beyond expectations. We look past traditional metrics to find your true north.', 
    x: 85, y: 17.85, align: 'left' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="m16 16-3.87-3.87"/>
      </svg>
    )
  },
  { 
    id: 3, 
    title: 'Adaptive Gameplay', 
    desc: 'Gamified interactive challenges that measure your pure abilities and creative instincts in real-time complex scenarios.', 
    x: 15, y: 32.14, align: 'right' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 12h4l2 8 2-16 2 8h4"/>
      </svg>
    )
  },
  { 
    id: 4, 
    title: 'AI Trait Analysis', 
    desc: 'Our engine processes responses against 500+ pathways, finding correlations and behavioral patterns only advanced cognitive AI sees.', 
    x: 80, y: 46.42, align: 'left' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="8" y1="18" x2="8" y2="10"/><line x1="16" y1="18" x2="16" y2="14"/><line x1="2" y1="12" x2="22" y2="12"/>
      </svg>
    )
  },
  { 
    id: 5, 
    title: 'Personalized Predictions', 
    desc: 'A precision-curated list of careers perfectly matched to your cognitive profile, optimizing for both rapid success and deep fulfillment.', 
    x: 25, y: 60.71, align: 'right' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2"/><path d="M16.2 5.8 15 7"/><path d="M22 12h-2"/><path d="M16.2 18.2 15 17"/><path d="M12 22v-2"/><path d="M7.8 18.2 9 17"/><path d="M2 12h2"/><path d="M7.8 5.8 9 7"/><circle cx="12" cy="12" r="4"/>
      </svg>
    )
  },
  { 
    id: 6, 
    title: 'Academic Roadmap', 
    desc: 'Detailed step-by-step academic plans for every career path and necessary skills. We strip away the guesswork from your curriculum.', 
    x: 70, y: 75.00, align: 'left' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    )
  },
  { 
    id: 7, 
    title: 'Ecosystem Integration', 
    desc: 'Share results with mentors and parents. Align your localized support system to work as one unified launchpad for your future.', 
    x: 35, y: 89.28, align: 'right' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
];

const TROPHY_X = 50;
const TROPHY_Y = 96.42;

const PATH_D = [
  'M 500 100', 
  'C 500 300, 850 300, 850 500',   
  'C 850 700, 150 700, 150 900',   
  'C 150 1100, 800 1100, 800 1300',   
  'C 800 1500, 250 1500, 250 1700',   
  'C 250 1900, 700 1900, 700 2100',   
  'C 700 2300, 350 2300, 350 2500',   
  'C 350 2600, 500 2600, 500 2700' 
].join(' ');


export function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const dotOuterRef = useRef<SVGCircleElement>(null);
  const dotGlowRef = useRef<SVGCircleElement>(null);
  const waypointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trophyRef = useRef<HTMLDivElement>(null);
  const trophyCardRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pathRef.current || !dotRef.current || !dotOuterRef.current || !dotGlowRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    const resolution = 2000;
    const pathLengths = new Float32Array(resolution); 
    for(let i = 0; i < resolution; i++) {
        pathLengths[i] = path.getPointAtLength((i / (resolution - 1)) * totalLength)?.y || 0;
    }

    const getRatioForY = (targetY: number) => {
      let low = 0, high = resolution - 1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midVal = pathLengths[mid] as number;
        if (midVal < targetY) low = mid + 1;
        else if (midVal > targetY) high = mid - 1;
        else return mid / (resolution - 1);
      }
      return low / (resolution - 1);
    };

    // Set initial states
    gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
    gsap.set(waypointRefs.current, { filter: 'grayscale(1)', opacity: 0.5, borderColor: '#d4d4d4', backgroundColor: '#fafafa' });
    gsap.set(cardRefs.current, { autoAlpha: 0, y: 30, scale: 0.95 });
    gsap.set(trophyRef.current, { opacity: 0.4, filter: 'grayscale(1)', scale: 0.8, borderColor: '#d4d4d4', backgroundColor: '#fafafa' });
    gsap.set(trophyCardRef.current, { autoAlpha: 0, y: 30, scale: 0.95 });
    gsap.set(shaderRef.current, { opacity: 0, scale: 0.8 }); 

    // Paused timeline for the path drawing & dot movement
    const pathTl = gsap.timeline({ paused: true });
    pathTl.to(path, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0);
    pathTl.to([dotRef.current, dotOuterRef.current, dotGlowRef.current], {
      motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false },
      duration: 1, ease: 'none'
    }, 0);

    // ═══════════════════════════════════════════════════════
    // BUTTERY SMOOTH: RAF + LERP approach (like original code.html)
    // No per-frame GSAP tweens. Direct progress manipulation.
    // ═══════════════════════════════════════════════════════
    let currentProgress = 0;
    let targetProgress = 0;
    let animFrameId: number;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onUpdate: (self) => {
        const targetPixelY = self.progress * 2800;
        targetProgress = getRatioForY(targetPixelY);
      }
    });

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animate() {
      currentProgress = lerp(currentProgress, targetProgress, 0.08);
      if (Math.abs(currentProgress - targetProgress) < 0.0005) {
        currentProgress = targetProgress;
      }

      // Set path timeline progress directly — no tween overhead
      pathTl.progress(currentProgress);

      // Dot opacity
      const dotOpacity = Math.min(1, currentProgress * 15);
      if (dotRef.current) dotRef.current.style.opacity = String(dotOpacity);
      if (dotOuterRef.current) dotOuterRef.current.style.opacity = String(dotOpacity * 0.4);
      if (dotGlowRef.current) dotGlowRef.current.style.opacity = String(dotOpacity * 0.2);

      animFrameId = requestAnimationFrame(animate);
    }
    animate();

    // Card reveal triggers (independent)
    STEPS.forEach((_, i) => {
      const waypoint = waypointRefs.current[i];
      const card = cardRefs.current[i];
      if (!waypoint || !card) return;

      ScrollTrigger.create({
        trigger: waypoint,
        start: 'center 55%',
        onEnter: () => {
          gsap.to(waypoint, { filter: 'grayscale(0)', opacity: 1, borderColor: '#0070F3', backgroundColor: '#ffffff', duration: 0.5, ease: 'sine.out', overwrite: true });
          gsap.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', overwrite: true });
        },
        onLeaveBack: () => {
          gsap.to(waypoint, { filter: 'grayscale(1)', opacity: 0.5, borderColor: '#d4d4d4', backgroundColor: '#fafafa', duration: 0.4, ease: 'power2.inOut', overwrite: true });
          gsap.to(card, { autoAlpha: 0, y: 30, scale: 0.95, duration: 0.4, ease: 'power2.inOut', overwrite: true });
        }
      });
    });

    // Trophy trigger
    if (trophyRef.current) {
      ScrollTrigger.create({
        trigger: trophyRef.current,
        start: 'center 55%',
        onEnter: () => {
          gsap.to(trophyRef.current, { opacity: 1, filter: 'grayscale(0)', scale: 1, borderColor: 'rgba(255,224,131,0.6)', backgroundColor: '#ffffff', duration: 0.6, ease: 'back.out(1.5)' });
          gsap.to(shaderRef.current, { opacity: 1, scale: 1.2, duration: 1.2, ease: 'power2.out' });
          if (trophyCardRef.current) gsap.to(trophyCardRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' });
        },
        onLeaveBack: () => {
          gsap.to(trophyRef.current, { opacity: 0.4, filter: 'grayscale(1)', scale: 0.8, borderColor: '#d4d4d4', backgroundColor: '#fafafa', duration: 0.5, ease: 'sine.inOut' });
          gsap.to(shaderRef.current, { opacity: 0, scale: 0.8, duration: 0.6, ease: 'power2.inOut' });
          if (trophyCardRef.current) gsap.to(trophyCardRef.current, { autoAlpha: 0, y: 30, scale: 0.95, duration: 0.4, ease: 'power2.inOut' });
        }
      });
    }

    // Cleanup RAF on destroy
    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, { scope: containerRef });

  return (
    <div className="text-stone-900 antialiased overflow-x-clip relative pt-[15vh] pb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* ── Ambient shader blobs to fill empty white space alongside the path ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Top-left ambient blob */}
        <div style={{
          position: 'absolute', top: '5%', left: '-5%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0,112,243,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)', borderRadius: '50%',
          animation: 'shader-drift 18s ease-in-out infinite',
        }} />
        {/* Mid-right ambient blob */}
        <div style={{
          position: 'absolute', top: '30%', right: '-8%', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(254,149,114,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)', borderRadius: '50%',
          animation: 'shader-drift 22s ease-in-out infinite reverse',
        }} />
        {/* Bottom-left ambient blob */}
        <div style={{
          position: 'absolute', top: '55%', left: '-10%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(255,224,131,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)', borderRadius: '50%',
          animation: 'shader-drift 16s ease-in-out infinite 3s',
        }} />
        {/* Lower-right ambient blob */}
        <div style={{
          position: 'absolute', top: '75%', right: '-5%', width: '450px', height: '450px',
          background: 'radial-gradient(circle, rgba(0,112,243,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)', borderRadius: '50%',
          animation: 'shader-drift 20s ease-in-out infinite 5s',
        }} />
        {/* Bottom-center ambient glow */}
        <div style={{
          position: 'absolute', bottom: '5%', left: '30%', width: '700px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(255,224,131,0.08) 0%, rgba(254,149,114,0.04) 50%, transparent 80%)',
          filter: 'blur(100px)',
          animation: 'shader-drift 25s ease-in-out infinite 2s',
        }} />
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full max-w-[1400px] mx-auto px-4 md:px-12"
        style={{ height: '350vh', minHeight: '3000px' }}
      >
        {/* SVG Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <svg viewBox="0 0 1000 2800" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0070F3" />
                <stop offset="50%" stopColor="#fe9572" />
                <stop offset="100%" stopColor="#ffe083" />
              </linearGradient>
              <radialGradient id="dotGrad">
                <stop offset="0%" stopColor="#0070F3" stopOpacity={1} />
                <stop offset="100%" stopColor="#0070F3" stopOpacity={0} />
              </radialGradient>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2" />
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.15" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dotted Track — BLACK for high visibility */}
            <path 
              d={PATH_D} 
              stroke="rgba(0,0,0,0.12)" 
              strokeWidth="3" 
              strokeDasharray="6 18" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Glowing Neon Track */}
            <path 
              ref={pathRef}
              d={PATH_D} 
              stroke="url(#neonGradient)" 
              strokeWidth="5" 
              strokeLinecap="round" 
              filter="url(#neonGlow)"
              fill="none" 
            />

            {/* Tracker Dot — 3-layered glow */}
            <circle ref={dotGlowRef} cx="0" cy="0" r="28" fill="url(#dotGrad)" opacity="0" />
            <circle ref={dotOuterRef} cx="0" cy="0" r="16" fill="#0070F3" opacity="0" style={{ filter: 'blur(4px)' }} />
            <circle ref={dotRef} cx="0" cy="0" r="8" fill="#fff" stroke="#0070F3" strokeWidth="3" opacity="0" className="drop-shadow-[0_0_12px_rgba(0,112,243,0.6)]" />
          </svg>
        </div>

        {/* Waypoints & Cards */}
        {STEPS.map((step, i) => {
          const isLeft = step.align === 'left';
          return (
            <React.Fragment key={step.id}>
              <div 
                ref={el => { waypointRefs.current[i] = el; }}
                className="absolute w-14 h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-md"
                style={{ 
                  left: `${step.x}%`, 
                  top: `${step.y}%`,
                  marginLeft: '-28px',
                  marginTop: '-28px',
                  zIndex: 20,
                  borderColor: '#d4d4d4',
                  backgroundColor: '#fafafa',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <div className="text-current font-bold">{step.icon}</div>
              </div>

              <div 
                ref={el => { cardRefs.current[i] = el; }}
                className="absolute pointer-events-none invisible opacity-0"
                style={{
                  top: `${step.y}%`,
                  width: 'calc(48vw - 3rem)',
                  maxWidth: '500px',
                  ...(isLeft 
                    ? { right: `calc(${100 - step.x}% + 4rem)` } 
                    : { left: `calc(${step.x}% + 4rem)` }
                  ),
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}
              >
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  padding: '2.5rem',
                  borderRadius: '2rem',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
                  backdropFilter: 'blur(20px)',
                }}>
                  <div className="flex items-center gap-4 mb-4">
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#0070F3' }}>
                      Phase {String(step.id).padStart(2, '0')}
                    </span>
                    <div style={{ height: '1px', backgroundColor: '#e5e5e5', flex: 1 }} />
                  </div>
                  <h3 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#1c1917', marginBottom: '0.75rem', lineHeight: 1.2 }}>{step.title}</h3>
                  <p style={{ color: '#78716c', lineHeight: 1.7, fontSize: '16px' }}>{step.desc}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {/* Trophy Node */}
        <div 
          ref={trophyRef}
          className="absolute rounded-full border-2 flex items-center justify-center"
          style={{ 
            left: `${TROPHY_X}%`, 
            top: `${TROPHY_Y}%`,
            marginLeft: '-48px',
            marginTop: '-48px',
            width: '96px',
            height: '96px',
            zIndex: 30,
            borderColor: '#d4d4d4',
            backgroundColor: '#fafafa',
            boxShadow: '0 0 40px rgba(255,224,131,0.3)',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#eec200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
          </svg>
        </div>

        {/* Trophy Card */}
        <div 
          ref={trophyCardRef}
          className="absolute pointer-events-none invisible opacity-0"
          style={{
            top: `${TROPHY_Y}%`, left: `calc(${TROPHY_X}% + 5rem)`,
            width: 'calc(48vw - 3rem)', maxWidth: '500px',
            transform: 'translateY(-50%)', zIndex: 10,
          }}
        >
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.06)',
            padding: '2.5rem',
            borderRadius: '2rem',
            boxShadow: '0 24px 80px rgba(255,224,131,0.2), 0 4px 16px rgba(0,0,0,0.06)',
            backdropFilter: 'blur(20px)',
          }}>
            <div className="flex items-center gap-4 mb-4">
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#eec200' }}>
                The Final Milestone
              </span>
              <div style={{ height: '1px', backgroundColor: '#e5e5e5', flex: 1 }} />
            </div>
            <h3 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#1c1917', marginBottom: '0.75rem', lineHeight: 1.2 }}>Mastery Achieved</h3>
            <p style={{ color: '#78716c', lineHeight: 1.7, fontSize: '16px' }}>
              Enhance these suggestions to become highly successful in life. 
              This is your ultimate blueprint for continuous growth.
            </p>
          </div>
        </div>

        {/* Trophy shader glow */}
        <div 
          ref={shaderRef}
          className="absolute pointer-events-none opacity-0"
          style={{
            left: `${TROPHY_X}%`, top: `${TROPHY_Y}%`,
            width: '1000px', height: '1000px',
            marginLeft: '-500px', marginTop: '-500px',
            background: 'radial-gradient(circle at center, rgba(0,112,243,0.12) 0%, rgba(254,149,114,0.08) 40%, transparent 65%)',
            filter: 'blur(60px)', mixBlendMode: 'multiply',
            zIndex: 0,
          }}
        />
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes shader-drift {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(5%, 5%) scale(1.1); }
          66%  { transform: translate(-3%, 2%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
