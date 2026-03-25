'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════════════════ */

type Step = {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: string;
  accent: 'azure' | 'coral' | 'gold';
};

const STEPS: Step[] = [
  {
    id: 1,
    label: 'Profile Creation',
    title: 'Sign up and tell us about yourself',
    description:
      'Share your grade, school, and what sparks your curiosity. No grades, no pressure \u2014 just you being you.',
    icon: 'person_add',
    accent: 'azure',
  },
  {
    id: 2,
    label: 'Interest Discovery',
    title: 'A judgment-free exploration of your passions',
    description:
      'Take an intuitive, bias-free assessment that uncovers what genuinely motivates you \u2014 beyond what society expects.',
    icon: 'psychology',
    accent: 'coral',
  },
  {
    id: 3,
    label: 'Adaptive Gameplay',
    title: 'Interactive challenges that measure abilities, not marks',
    description:
      'Our gamified evaluation adapts in real-time to understand your cognitive strengths, problem-solving style, and creative instincts.',
    icon: 'sports_esports',
    accent: 'gold',
  },
  {
    id: 4,
    label: 'AI Trait Analysis',
    title: '500+ career pathways cross-referenced with your profile',
    description:
      'Our engine uses behavioral science models to process your responses against hundreds of career pathways, finding patterns only AI can see.',
    icon: 'query_stats',
    accent: 'azure',
  },
  {
    id: 5,
    label: 'Personalized Predictions',
    title: 'A curated list of careers uniquely matched to you',
    description:
      'Not generic suggestions \u2014 precision predictions ranked by compatibility with your abilities, interests, and personality traits.',
    icon: 'lightbulb',
    accent: 'coral',
  },
  {
    id: 6,
    label: 'Academic Roadmap',
    title: 'Step-by-step academic plans for every career path',
    description:
      'Dive into detailed roadmaps \u2014 which subjects to focus on, which exams to prepare for, which colleges to target, and what skills to build.',
    icon: 'map',
    accent: 'gold',
  },
  {
    id: 7,
    label: 'Ecosystem Integration',
    title: 'Parents, teachers, and mentors aligned on your journey',
    description:
      'Share your results with the people who matter. Get everyone on the same page so your support system works as one.',
    icon: 'family_restroom',
    accent: 'azure',
  },
];

const ACCENT = {
  azure: {
    badge: 'bg-[#0070F3]/10 text-[#0070F3]',
    label: 'text-[#0070F3]',
    iconBg: 'bg-[#0070F3]/10',
    iconTx: 'text-[#0070F3]',
  },
  coral: {
    badge: 'bg-[#fe9572]/10 text-[#fe9572]',
    label: 'text-[#fe9572]',
    iconBg: 'bg-[#fe9572]/10',
    iconTx: 'text-[#fe9572]',
  },
  gold: {
    badge: 'bg-[#ffe083]/20 text-[#735c00]',
    label: 'text-[#735c00]',
    iconBg: 'bg-[#ffe083]/20',
    iconTx: 'text-[#735c00]',
  },
};

/* ═══════════════════════════════════════════════════════════════════
   SVG PATH GEOMETRY
   ═══════════════════════════════════════════════════════════════════ */

const SVG_VB = '0 0 1200 4200';

/**
 * Winding S-curve that snakes left\u2192right through 7 waypoints,
 * converges to center, then drops a straight line to the trophy.
 */
const PATH_D = [
  'M 600 0',
  'C 600 150, 950 300, 950 500',   // \u2192 right  (card 1)
  'S 250 700,  250 1000',           // \u2192 left   (card 2)
  'S 950 1200, 950 1500',           // \u2192 right  (card 3)
  'S 250 1700, 250 2000',           // \u2192 left   (card 4)
  'S 950 2200, 950 2500',           // \u2192 right  (card 5)
  'S 250 2700, 250 3000',           // \u2192 left   (card 6)
  'S 950 3200, 950 3500',           // \u2192 right  (card 7)
  'S 600 3700, 600 3900',           // \u2192 center (converge)
  'L 600 4200',                     // straight to trophy
].join(' ');

/**
 * Progress fraction at which each card fades in.
 * Tuned so the dot is roughly beside the card when it appears.
 */
const CARD_THRESHOLDS = [0.09, 0.21, 0.33, 0.45, 0.57, 0.68, 0.80];

/* ═══════════════════════════════════════════════════════════════════
   TRACKER DOT
   Imperatively positioned via getPointAtLength \u2014 zero React state.
   ═══════════════════════════════════════════════════════════════════ */

function TrackerDot(props: {
  pathRef: React.RefObject<SVGPathElement | null>;
  progress: ReturnType<typeof useSpring>;
}) {
  const coreRef = useRef<SVGCircleElement>(null);
  const outerRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  useMotionValueEvent(props.progress, 'change', (v: number) => {
    const p = props.pathRef.current;
    if (!p || !coreRef.current) return;

    const pt = p.getPointAtLength(Math.min(v, 1) * p.getTotalLength());
    const cx = `${pt.x}`;
    const cy = `${pt.y}`;

    coreRef.current.setAttribute('cx', cx);
    coreRef.current.setAttribute('cy', cy);
    outerRef.current?.setAttribute('cx', cx);
    outerRef.current?.setAttribute('cy', cy);
    glowRef.current?.setAttribute('cx', cx);
    glowRef.current?.setAttribute('cy', cy);

    const a = Math.min(1, v * 15);
    coreRef.current.style.opacity = `${a}`;
    if (outerRef.current) outerRef.current.style.opacity = `${a * 0.5}`;
    if (glowRef.current) glowRef.current.style.opacity = `${a * 0.25}`;
  });

  return (
    <>
      <circle ref={glowRef} cx={600} cy={0} r={30} fill="url(#dotGrad)" opacity={0} />
      <circle ref={outerRef} cx={600} cy={0} r={18} fill="#0070F3" opacity={0} style={{ filter: 'blur(5px)' }} />
      <circle ref={coreRef} cx={600} cy={0} r={7} fill="#fff" stroke="#0070F3" strokeWidth={3} opacity={0} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MILESTONE CARD
   Reveals once when scroll dot crosses its threshold \u2014 then floats.
   ═══════════════════════════════════════════════════════════════════ */

function MilestoneCard(props: {
  step: Step;
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const isLeft = props.index % 2 !== 0;
  const s = ACCENT[props.step.accent];
  const threshold = CARD_THRESHOLDS[props.index] ?? 0;
  const revealedRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(props.progress, 'change', (v: number) => {
    if (revealedRef.current || !cardRef.current || v < threshold) return;
    revealedRef.current = true;
    cardRef.current.style.opacity = '1';
    cardRef.current.style.transform = 'translateY(0) scale(1)';
    // After the 1.2 s CSS reveal transition, start the float keyframe
    const floatClass = props.index % 2 === 0 ? 'roadmap-float-a' : 'roadmap-float-b';
    setTimeout(() => cardRef.current?.classList.add(floatClass), 1300);
  });

  return (
    <div className={`flex justify-center ${isLeft ? 'md:justify-start md:pl-[8%]' : 'md:justify-end md:pr-[8%]'}`}>
      <div
        ref={cardRef}
        className="roadmap-card relative w-full max-w-lg cursor-default rounded-[2rem] border border-white/60 p-10 backdrop-blur-xl"
        style={{ opacity: 0, transform: 'translateY(60px) scale(0.92)' }}
      >
        {/* connector dot bridging card \u2192 path */}
        <div
          className={`absolute top-1/2 hidden size-4 -translate-y-1/2 rounded-full bg-[#0070F3] md:block ${isLeft ? '-right-8' : '-left-8'}`}
          style={{ boxShadow: '0 0 20px rgba(0,112,243,.6), 0 0 40px rgba(0,112,243,.3)' }}
        />

        <div className="mb-6 flex items-center gap-4">
          <div className={`inline-flex size-8 items-center justify-center rounded-full text-xs font-extrabold ${s.badge}`}>
            {String(props.step.id).padStart(2, '0')}
          </div>
          <h4 className={`text-xs font-bold uppercase tracking-[0.2em] ${s.label}`}>{props.step.label}</h4>
        </div>

        <div className={`mb-5 flex size-12 items-center justify-center rounded-2xl ${s.iconBg}`}>
          <span className={`material-symbols-outlined text-2xl ${s.iconTx}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {props.step.icon}
          </span>
        </div>

        <p className="text-2xl font-black leading-tight text-stone-900">{props.step.title}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-500">{props.step.description}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TROPHY FINALE + SHADER
   ═══════════════════════════════════════════════════════════════════ */

function TrophyFinale(props: { progress: ReturnType<typeof useSpring> }) {
  const trophyRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(props.progress, 'change', (v: number) => {
    if (trophyRef.current) {
      if (v >= 0.92) {
        trophyRef.current.style.opacity = '1';
        trophyRef.current.style.transform = 'scale(1) translateY(0)';
      }
    }
    if (shaderRef.current) {
      shaderRef.current.style.opacity = v > 0.85 ? '1' : '0';
    }
  });

  return (
    <div className="relative flex justify-center pb-20 pt-60">
      {/* Pulsing radial-gradient shader blobs */}
      <div
        ref={shaderRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] overflow-hidden opacity-0"
        style={{ transition: 'opacity 2s ease' }}
      >
        <div className="roadmap-shader-blob absolute bottom-[-100px] left-[20%] size-[500px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle,#0070F3 0%,transparent 70%)', filter: 'blur(100px)', animation: 'shader-drift 12s ease-in-out infinite' }} />
        <div className="roadmap-shader-blob absolute bottom-[-50px] right-[15%] size-[400px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle,#fe9572 0%,transparent 70%)', filter: 'blur(100px)', animation: 'shader-drift 10s ease-in-out infinite reverse' }} />
        <div className="roadmap-shader-blob absolute bottom-[50px] left-[45%] size-[300px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle,#ffe083 0%,transparent 70%)', filter: 'blur(100px)', animation: 'shader-drift 14s ease-in-out infinite 2s' }} />
      </div>

      {/* Trophy */}
      <div
        ref={trophyRef}
        className="flex flex-col items-center text-center opacity-0"
        style={{ transform: 'scale(0.8) translateY(30px)', transition: 'opacity 1.5s cubic-bezier(.16,1,.3,1), transform 1.5s cubic-bezier(.16,1,.3,1)' }}
      >
        <div className="trophy-glow relative mb-10 flex size-28 items-center justify-center rounded-full bg-[#0070F3]/10">
          <svg className="size-20 text-[#0070F3]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 5H18V3C18 2.45 17.55 2 17 2H7C6.45 2 6 2.45 6 3V5H5C3.9 5 3 5.9 3 7V9C3 11.21 4.79 13 7 13H7.09C7.56 14.83 9.1 16.27 11 16.73V20H8V22H16V20H13V16.73C14.9 16.27 16.44 14.83 16.91 13H17C19.21 13 21 11.21 21 9V7C21 5.9 20.1 5 19 5ZM5 9V7H6V11C4.9 11 4 10.11 4 9H5ZM18 11V7H19V9C19 10.11 18.1 11 17 11H18Z" />
          </svg>
        </div>
        <h3 className="text-5xl font-black tracking-tight text-stone-900">Success is Yours</h3>
        <p className="mt-4 max-w-md text-xl font-medium leading-relaxed text-stone-500">
          The journey of a thousand miles ends with your true calling. Your ManzilTak awaits.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════ */

export function Roadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  /* ── Framer Motion scroll physics ────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0.08, 0.88], [0, 1]);
  const smooth = useSpring(pathLength, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      id="roadmap-section"
      className="relative overflow-hidden bg-[#fcf9f6] px-8 py-32"
    >
      <div className="relative mx-auto max-w-[1200px]">
        {/* ── Section header ────────────────────────────────────── */}
        <motion.div
          className="mb-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-[#99462a]">
            The Curated Process
          </span>
          <h2 className="mt-4 text-5xl font-black tracking-tight text-stone-900 md:text-7xl">
            The roadmap to mastery
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-500">
            Every step is designed to bring you closer to a career that truly
            fits who you are &mdash; not who you&apos;re told to be.
          </p>
        </motion.div>

        {/* ── SVG path overlay (absolute, stretches over card area) */}
        <div
          className="pointer-events-none absolute inset-x-0"
          style={{ top: 220, bottom: 100 }}
        >
          <svg
            className="size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox={SVG_VB}
          >
            <defs>
              <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor="#0070F3" floodOpacity="0.4" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="dotGrad">
                <stop offset="0%" stopColor="#0070F3" stopOpacity={1} />
                <stop offset="100%" stopColor="#0070F3" stopOpacity={0} />
              </radialGradient>
            </defs>

            {/* Faint background track */}
            <path d={PATH_D} stroke="rgba(0,112,243,.06)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />

            {/* Active drawn path \u2014 pathLength driven by scroll */}
            <motion.path
              ref={pathRef}
              d={PATH_D}
              stroke="#0070F3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              filter="url(#pathGlow)"
              style={{ pathLength: smooth }}
              initial={{ pathLength: 0 }}
            />

            {/* Glowing tracker dot */}
            <TrackerDot pathRef={pathRef} progress={smooth} />
          </svg>
        </div>

        {/* ── Milestone cards + trophy ──────────────────────────── */}
        <div className="relative z-10 space-y-16" style={{ paddingTop: 60 }}>
          {STEPS.map((step, i) => (
            <div key={step.id} style={{ paddingTop: i === 0 ? 240 : 280 }}>
              <MilestoneCard step={step} index={i} progress={smooth} />
            </div>
          ))}
          <TrophyFinale progress={smooth} />
        </div>
      </div>

      {/* ── Embedded keyframes (self-contained, no external CSS) ── */}
      <style>{`
        .roadmap-card {
          background: linear-gradient(135deg, rgba(255,255,255,.6) 0%, rgba(255,255,255,.3) 100%);
          box-shadow: 0 8px 32px rgba(0,112,243,.06), 0 2px 8px rgba(0,0,0,.04);
          transition: opacity 1.2s cubic-bezier(.16,1,.3,1),
                      transform 1.2s cubic-bezier(.16,1,.3,1),
                      box-shadow .8s ease;
          will-change: transform, opacity;
        }
        .roadmap-card:hover {
          box-shadow: 0 20px 60px rgba(0,112,243,.12), 0 4px 16px rgba(0,0,0,.06);
        }
        @keyframes float-a {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25%      { transform: translateY(-12px) rotate(.5deg); }
          50%      { transform: translateY(-6px) rotate(-.3deg); }
          75%      { transform: translateY(-14px) rotate(.2deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25%      { transform: translateY(-10px) rotate(-.4deg); }
          50%      { transform: translateY(-16px) rotate(.3deg); }
          75%      { transform: translateY(-8px) rotate(-.2deg); }
        }
        .roadmap-float-a { animation: float-a 6s ease-in-out infinite; }
        .roadmap-float-b { animation: float-b 7s ease-in-out infinite; }
        @keyframes shader-drift {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(5%,5%) scale(1.1); }
          66%  { transform: translate(-3%,2%) scale(.95); }
          100% { transform: translate(0,0) scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(0,112,243,.4)) drop-shadow(0 0 30px rgba(0,112,243,.2));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(0,112,243,.6)) drop-shadow(0 0 60px rgba(0,112,243,.3));
            transform: scale(1.05);
          }
        }
        .trophy-glow { animation: pulse-glow 2.5s infinite ease-in-out; }
      `}</style>
    </section>
  );
}
