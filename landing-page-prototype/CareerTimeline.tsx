'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */

const NAVBAR_H = 56;
const CONTAINER_VH = 8;
const SVG_W = 1000;
const SVG_H = 8000;
const DWELL = 0.012;

/* ═══════════════════════════════════════════════════════════════════
   STEP DATA — all 7 original steps + trophy
   
   X positions create a PYRAMID: wide at top, converging to center.
   First circle at ~25% (slightly left of center, under the heading).
   ═══════════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    id: 1, title: 'Profile Creation',
    desc: 'Share your core interests and cognitive style. No grades, no pressure. Your journey begins with a complete mapping of your innate baseline.',
    xPct: 0.25, align: 'right' as const,
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
  },
  {
    id: 2, title: 'Interest Discovery',
    desc: 'An intuitive assessment that uncovers what genuinely motivates you beyond expectations. We look past traditional metrics to find your true north.',
    xPct: 0.85, align: 'left' as const,
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="m16 16-3.87-3.87"/></svg>),
  },
  {
    id: 3, title: 'Adaptive Gameplay',
    desc: 'Gamified interactive challenges that measure your pure abilities and creative instincts in real-time complex scenarios.',
    xPct: 0.15, align: 'right' as const,
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h4l2 8 2-16 2 8h4"/></svg>),
  },
  {
    id: 4, title: 'AI Trait Analysis',
    desc: 'Our engine processes responses against 500+ pathways, finding correlations and behavioral patterns only advanced cognitive AI sees.',
    xPct: 0.80, align: 'left' as const,
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="8" y1="18" x2="8" y2="10"/><line x1="16" y1="18" x2="16" y2="14"/><line x1="2" y1="12" x2="22" y2="12"/></svg>),
  },
  {
    id: 5, title: 'Personalized Predictions',
    desc: 'A precision-curated list of careers perfectly matched to your cognitive profile, optimizing for both rapid success and deep fulfillment.',
    xPct: 0.25, align: 'right' as const,
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="m16.2 5.8-1.4 1.4"/><path d="M22 12h-2"/><path d="m16.2 18.2-1.4-1.4"/><path d="M12 22v-2"/><path d="m7.8 18.2 1.4-1.4"/><path d="M2 12h2"/><path d="m7.8 5.8 1.4 1.4"/><circle cx="12" cy="12" r="4"/></svg>),
  },
  {
    id: 6, title: 'Academic Roadmap',
    desc: 'Detailed step-by-step academic plans for every career path and necessary skills. We strip away the guesswork from your curriculum.',
    xPct: 0.70, align: 'left' as const,
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>),
  },
  {
    id: 7, title: 'Ecosystem Integration',
    desc: 'Share results with mentors and parents. Align your localized support system to work as one unified launchpad for your future.',
    xPct: 0.35, align: 'right' as const,
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  },
];

const TROPHY = { xPct: 0.50, align: 'right' as const };

/** Number of intermediate zigzag points between each pair of circles (3 at top → 2 at bottom). */
const ZIGZAG_COUNTS = [3, 3, 2, 2, 2, 2, 2];

/** Zigzag X-spread (in SVG units) — wider at top, narrower at bottom. */
const ZIGZAG_SPREADS = [200, 180, 150, 130, 110, 80, 60];

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */

/** Generate intermediate zigzag points between two circle positions. */
function zigzagBetween(
  from: { x: number; y: number },
  to: { x: number; y: number },
  count: number,
  spread: number,
) {
  const pts: Array<{ x: number; y: number }> = [];
  const midX = (from.x + to.x) / 2;
  const dy = (to.y - from.y) / (count + 1);
  for (let j = 1; j <= count; j++) {
    const dir = j % 2 === 0 ? 1 : -1;
    pts.push({
      x: Math.max(50, Math.min(SVG_W - 50, midX + dir * spread)),
      y: from.y + j * dy,
    });
  }
  return pts;
}

/** Build a smooth SVG path through an ordered list of points. */
function buildSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) return '';
  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const c = points[i]!;
    const n = points[i + 1]!;
    const midY = (c.y + n.y) / 2;
    d += ` C ${c.x} ${midY}, ${n.x} ${midY}, ${n.x} ${n.y}`;
  }
  return d;
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dottedRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const dotGlowRef = useRef<SVGCircleElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trophyRef = useRef<HTMLDivElement>(null);
  const trophyCardRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const dotted = dottedRef.current;
    const dot = dotRef.current;
    const dotGlow = dotGlowRef.current;
    if (!container || !path || !dotted || !dot || !dotGlow) return;

    const vh = window.innerHeight;
    const containerH = container.offsetHeight;
    const scrollRange = containerH - vh;
    const visualCenter = NAVBAR_H + (vh - NAVBAR_H) / 2;

    /* ── STEP 1: Compute circle positions ── */
    const totalCircles = STEPS.length + 1; // 7 steps + trophy
    const circlePositions = [];

    for (let i = 0; i < totalCircles; i++) {
      const progress = (i + 1) / (totalCircles + 1);
      const containerY = visualCenter + progress * scrollRange;
      const topPct = (containerY / containerH) * 100;
      const xPct = i < STEPS.length ? STEPS[i]!.xPct : TROPHY.xPct;
      const leftPct = xPct * 100;
      const svgX = xPct * SVG_W;
      const svgY = (containerY / containerH) * SVG_H;
      circlePositions.push({ progress, topPct, leftPct, svgX, svgY });
    }

    /* ── STEP 2: Position DOM elements ── */
    circlePositions.forEach((pos, i) => {
      if (i < STEPS.length) {
        const circle = circleRefs.current[i];
        const card = cardRefs.current[i];
        const align = STEPS[i]!.align;
        if (circle) {
          gsap.set(circle, { top: `${pos.topPct}%`, left: `${pos.leftPct}%`, xPercent: -50, yPercent: -50 });
        }
        if (card) {
          gsap.set(card, {
            top: `${pos.topPct}%`, yPercent: -50,
            ...(align === 'right'
              ? { left: `calc(${pos.leftPct}% + 4rem)` }
              : { right: `calc(${100 - pos.leftPct}% + 4rem)` }),
          });
        }
      } else {
        // Trophy
        if (trophyRef.current) {
          gsap.set(trophyRef.current, { top: `${pos.topPct}%`, left: `${pos.leftPct}%`, xPercent: -50, yPercent: -50 });
        }
        if (trophyCardRef.current) {
          gsap.set(trophyCardRef.current, {
            top: `${pos.topPct}%`, yPercent: -50,
            left: `calc(${pos.leftPct}% + 5rem)`,
          });
        }
        if (shaderRef.current) {
          gsap.set(shaderRef.current, { top: `${pos.topPct}%`, left: `${pos.leftPct}%` });
        }
      }
    });

    /* ── STEP 3: Build the pyramidal SVG path ── */
    const svgCircleCoords = circlePositions.map(p => ({ x: p.svgX, y: p.svgY }));

    // Build all-points array: circles + intermediate zigzags
    const allPoints: Array<{ x: number; y: number }> = [svgCircleCoords[0]!];
    for (let i = 0; i < svgCircleCoords.length - 1; i++) {
      const from = svgCircleCoords[i]!;
      const to = svgCircleCoords[i + 1]!;
      const count = i < ZIGZAG_COUNTS.length ? ZIGZAG_COUNTS[i]! : 2;
      const spread = i < ZIGZAG_SPREADS.length ? ZIGZAG_SPREADS[i]! : 70;
      const intermediates = zigzagBetween(from, to, count, spread);
      allPoints.push(...intermediates, to);
    }

    const d = buildSmoothPath(allPoints);
    path.setAttribute('d', d);
    dotted.setAttribute('d', d);

    const totalLength = path.getTotalLength();

    /* ── STEP 4: Pre-compute path ratios for each circle ──
       Use closest-point (x+y) search instead of Y-only binary search,
       because zigzag intermediates make Y non-monotonic. */
    const SAMPLES = 5000;
    const pathRatios = svgCircleCoords.map(pt => {
      let bestDist = Infinity;
      let bestRatio = 0;
      for (let s = 0; s < SAMPLES; s++) {
        const ratio = s / (SAMPLES - 1);
        const p = path.getPointAtLength(ratio * totalLength);
        const dist = (p.x - pt.x) ** 2 + (p.y - pt.y) ** 2;
        if (dist < bestDist) {
          bestDist = dist;
          bestRatio = ratio;
        }
      }
      return bestRatio;
    });

    /* ── STEP 5: Initial state ── */
    gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
    gsap.set([dot, dotGlow], { opacity: 0 });
    circleRefs.current.forEach(c => {
      if (c) gsap.set(c, { opacity: 0.4, filter: 'grayscale(1)', borderColor: '#d4d4d4', backgroundColor: '#fafafa' });
    });
    cardRefs.current.forEach(c => {
      if (c) gsap.set(c, { autoAlpha: 0, y: 24, scale: 0.95 });
    });
    if (trophyRef.current) gsap.set(trophyRef.current, { opacity: 0.4, filter: 'grayscale(1)', scale: 0.8, borderColor: '#d4d4d4', backgroundColor: '#fafafa' });
    if (trophyCardRef.current) gsap.set(trophyCardRef.current, { autoAlpha: 0, y: 24, scale: 0.95 });
    if (shaderRef.current) gsap.set(shaderRef.current, { opacity: 0, scale: 0.8 });

    /* ── STEP 6: Master timeline ── */
    const masterTl = gsap.timeline({ paused: true });
    masterTl.to(path, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0);
    masterTl.to([dot, dotGlow], {
      motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false },
      duration: 1, ease: 'none',
    }, 0);

    /* ── STEP 7: Scroll → path mapping ── */
    const circleProgresses = circlePositions.map(p => p.progress);

    function scrollToPath(scrollProg: number) {
      if (scrollProg < circleProgresses[0]!) {
        return { pathRatio: 0, headVisible: false, dwellingAt: -1, dwellFrac: 0 };
      }

      for (let i = 0; i < totalCircles; i++) {
        const mProg = circleProgresses[i]!;
        const dwellEnd = mProg + DWELL;
        const nextProg = i < totalCircles - 1 ? circleProgresses[i + 1]! : mProg + DWELL + 0.05;

        if (scrollProg >= mProg && scrollProg < dwellEnd) {
          return { pathRatio: pathRatios[i]!, headVisible: true, dwellingAt: i, dwellFrac: (scrollProg - mProg) / DWELL };
        }

        if (scrollProg >= dwellEnd && scrollProg < nextProg && i < totalCircles - 1) {
          const t = (scrollProg - dwellEnd) / (nextProg - dwellEnd);
          const ratio = pathRatios[i]! + t * (pathRatios[i + 1]! - pathRatios[i]!);
          return { pathRatio: ratio, headVisible: true, dwellingAt: -1, dwellFrac: 0 };
        }
      }

      return { pathRatio: pathRatios[totalCircles - 1]!, headVisible: true, dwellingAt: totalCircles - 1, dwellFrac: 1 };
    }

    /* ── STEP 8: Animation loop ── */
    let currentProg = 0;
    let targetProg = 0;
    let rafId: number;
    const activated = new Set<number>();

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { targetProg = self.progress; },
    });

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    function tick() {
      currentProg = lerp(currentProg, targetProg, 0.08);
      if (Math.abs(currentProg - targetProg) < 0.0002) currentProg = targetProg;

      const result = scrollToPath(currentProg);
      masterTl.progress(result.pathRatio);

      // Head visibility
      dot.style.opacity = result.headVisible ? '1' : '0';
      dotGlow.style.opacity = result.headVisible ? '0.3' : '0';

      // Absorb dot scale
      if (result.dwellingAt >= 0) {
        const s = 1 - 0.7 * Math.sin(result.dwellFrac * Math.PI);
        dot.setAttribute('r', String(7 * s));
        dotGlow.setAttribute('r', String(22 * s));
      } else {
        dot.setAttribute('r', '7');
        dotGlow.setAttribute('r', '22');
      }

      // Step circle activation
      for (let i = 0; i < STEPS.length; i++) {
        const circle = circleRefs.current[i];
        const card = cardRefs.current[i];
        if (!circle || !card) continue;

        const reached = result.pathRatio >= pathRatios[i]! - 0.005;
        const dwelling = result.dwellingAt === i;

        if (reached && !activated.has(i)) {
          activated.add(i);
          gsap.to(circle, {
            opacity: 1, filter: 'grayscale(0)', borderColor: '#0070F3',
            backgroundColor: '#ffffff', scale: 1.15,
            duration: 0.3, ease: 'back.out(2)', overwrite: true,
            onComplete: () => { gsap.to(circle, { scale: 1, duration: 0.4 }); },
          });
          gsap.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', overwrite: true });
        } else if (!reached && activated.has(i)) {
          activated.delete(i);
          gsap.to(circle, { opacity: 0.4, filter: 'grayscale(1)', borderColor: '#d4d4d4', backgroundColor: '#fafafa', scale: 1, duration: 0.3, overwrite: true });
          gsap.to(card, { autoAlpha: 0, y: 24, scale: 0.95, duration: 0.3, overwrite: true });
        }

        if (dwelling) {
          const disappear = Math.sin(result.dwellFrac * Math.PI);
          gsap.set(circle, { scale: 1 - disappear * 0.8, opacity: 1 - disappear * 0.7 });
        } else if (reached && activated.has(i)) {
          gsap.set(circle, { scale: 1, opacity: 1 });
        }
      }

      // Trophy activation
      const trophyIdx = totalCircles - 1;
      const trophyReached = result.pathRatio >= pathRatios[trophyIdx]! - 0.005;
      const trophyDwelling = result.dwellingAt === trophyIdx;

      if (trophyReached && !activated.has(99)) {
        activated.add(99);
        gsap.to(trophyRef.current, {
          opacity: 1, filter: 'grayscale(0)', scale: 1,
          borderColor: 'rgba(255,224,131,0.6)', backgroundColor: '#ffffff',
          duration: 0.6, ease: 'back.out(1.5)',
        });
        gsap.to(shaderRef.current, { opacity: 1, scale: 1.2, duration: 1.2, ease: 'power2.out' });
        if (trophyCardRef.current) gsap.to(trophyCardRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' });
      } else if (!trophyReached && activated.has(99)) {
        activated.delete(99);
        gsap.to(trophyRef.current, { opacity: 0.4, filter: 'grayscale(1)', scale: 0.8, borderColor: '#d4d4d4', backgroundColor: '#fafafa', duration: 0.5 });
        gsap.to(shaderRef.current, { opacity: 0, scale: 0.8, duration: 0.6 });
        if (trophyCardRef.current) gsap.to(trophyCardRef.current, { autoAlpha: 0, y: 24, scale: 0.95, duration: 0.4 });
      }

      if (trophyDwelling && trophyRef.current) {
        const disappear = Math.sin(result.dwellFrac * Math.PI);
        gsap.set(trophyRef.current, { scale: 1 - disappear * 0.5, opacity: 1 - disappear * 0.4 });
      } else if (trophyReached && activated.has(99) && trophyRef.current) {
        gsap.set(trophyRef.current, { scale: 1, opacity: 1 });
      }

      rafId = requestAnimationFrame(tick);
    }
    tick();

    return () => cancelAnimationFrame(rafId);
  }, { scope: containerRef });

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div className="relative overflow-x-clip" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,112,243,0.06) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%', animation: 'shader-drift 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '25%', right: '-8%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(254,149,114,0.06) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%', animation: 'shader-drift 22s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', top: '50%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,224,131,0.07) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%', animation: 'shader-drift 16s ease-in-out infinite 3s' }} />
        <div style={{ position: 'absolute', top: '75%', right: '-5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(0,112,243,0.05) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%', animation: 'shader-drift 20s ease-in-out infinite 5s' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '30%', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(255,224,131,0.08) 0%, rgba(254,149,114,0.04) 50%, transparent 80%)', filter: 'blur(100px)', animation: 'shader-drift 25s ease-in-out infinite 2s' }} />
      </div>

      {/* Main container */}
      <div ref={containerRef} className="relative w-full max-w-[1400px] mx-auto px-4 md:px-12" style={{ height: `${CONTAINER_VH * 100}vh` }}>

        {/* SVG Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roadmapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0070F3" />
                <stop offset="50%" stopColor="#fe9572" />
                <stop offset="100%" stopColor="#ffe083" />
              </linearGradient>
              <radialGradient id="dotGrad">
                <stop offset="0%" stopColor="#0070F3" stopOpacity={1} />
                <stop offset="100%" stopColor="#0070F3" stopOpacity={0} />
              </radialGradient>
              <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b2" />
                <feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path ref={dottedRef} stroke="rgba(0,0,0,0.1)" strokeWidth="3" strokeDasharray="6 18" strokeLinecap="round" fill="none" />
            <path ref={pathRef} stroke="url(#roadmapGrad)" strokeWidth="4.5" strokeLinecap="round" filter="url(#pathGlow)" fill="none" />
            <circle ref={dotGlowRef} cx="0" cy="0" r="22" fill="url(#dotGrad)" opacity="0" />
            <circle ref={dotRef} cx="0" cy="0" r="7" fill="#fff" stroke="#0070F3" strokeWidth="2.5" opacity="0" className="drop-shadow-[0_0_10px_rgba(0,112,243,0.5)]" />
          </svg>
        </div>

        {/* Step circles & cards */}
        {STEPS.map((step, i) => (
          <React.Fragment key={step.id}>
            <div
              ref={el => { circleRefs.current[i] = el; }}
              className="absolute w-14 h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-md"
              style={{ zIndex: 20, borderColor: '#d4d4d4', backgroundColor: '#fafafa', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', top: 0, left: 0 }}
            >
              <div className="text-gray-600">{step.icon}</div>
            </div>
            <div
              ref={el => { cardRefs.current[i] = el; }}
              className="absolute pointer-events-none invisible opacity-0"
              style={{ width: 'min(460px, 40vw)', zIndex: 10, top: 0, left: 0 }}
            >
              <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 16px 48px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.03)', backdropFilter: 'blur(16px)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#0070F3' }}>Phase {String(step.id).padStart(2, '0')}</span>
                  <div style={{ height: '1px', backgroundColor: '#e5e5e5', flex: 1 }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem', lineHeight: 1.2 }}>{step.title}</h3>
                <p style={{ color: '#78716c', lineHeight: 1.7, fontSize: '15px' }}>{step.desc}</p>
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* Trophy */}
        <div
          ref={trophyRef}
          className="absolute rounded-full border-2 flex items-center justify-center"
          style={{ width: '96px', height: '96px', zIndex: 30, borderColor: '#d4d4d4', backgroundColor: '#fafafa', boxShadow: '0 0 40px rgba(255,224,131,0.3)', top: 0, left: 0 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#eec200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
            <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
          </svg>
        </div>

        {/* Trophy card */}
        <div
          ref={trophyCardRef}
          className="absolute pointer-events-none invisible opacity-0"
          style={{ width: 'min(460px, 40vw)', zIndex: 10, top: 0, left: 0 }}
        >
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 24px 80px rgba(255,224,131,0.2), 0 4px 16px rgba(0,0,0,0.06)', backdropFilter: 'blur(16px)' }}>
            <div className="flex items-center gap-3 mb-3">
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#eec200' }}>The Final Milestone</span>
              <div style={{ height: '1px', backgroundColor: '#e5e5e5', flex: 1 }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem', lineHeight: 1.2 }}>Mastery Achieved</h3>
            <p style={{ color: '#78716c', lineHeight: 1.7, fontSize: '15px' }}>Enhance these suggestions to become highly successful in life. This is your ultimate blueprint for continuous growth.</p>
          </div>
        </div>

        {/* Trophy shader glow */}
        <div
          ref={shaderRef}
          className="absolute pointer-events-none opacity-0"
          style={{ width: '1000px', height: '1000px', marginLeft: '-500px', marginTop: '-500px', background: 'radial-gradient(circle at center, rgba(0,112,243,0.12) 0%, rgba(254,149,114,0.08) 40%, transparent 65%)', filter: 'blur(60px)', mixBlendMode: 'multiply', zIndex: 0, top: 0, left: 0 }}
        />
      </div>

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
