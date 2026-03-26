import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-sm ring-1 ring-gray-200">
      <h1 className="mb-10 text-4xl font-extrabold tracking-tight text-gray-900">
        About ManzilTak
      </h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Our mission</h2>
        <p className="mb-4 leading-relaxed text-slate-600">
          ManzilTak is an enterprise-grade EdTech platform built to redefine career guidance for
          students in the Indian educational ecosystem. We replace outdated career counseling with
          intelligent, gamified assessments that map each student&apos;s cognitive profile to
          precision-curated career pathways.
        </p>
        <p className="leading-relaxed text-slate-600">
          Our name, &quot;ManzilTak&quot; (meaning &quot;to the destination&quot; in Hindi/Urdu),
          captures our promise: guiding every student from uncertainty to a clear, achievable
          professional future.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">What we do</h2>
        <p className="mb-4 leading-relaxed text-slate-600">
          We combine adaptive gameplay, AI-driven trait analysis, and real-time industry data to
          deliver career predictions that go far beyond conventional aptitude tests. Our platform
          processes responses against 500+ career pathways, identifies behavioral patterns, and
          generates step-by-step academic roadmaps tailored to each student.
        </p>
        <ul className="list-inside list-disc space-y-2 text-slate-600">
          <li>Interactive cognitive assessments disguised as engaging challenges</li>
          <li>AI engine trained on thousands of career trajectories</li>
          <li>Real-time alignment with 40,000+ industry signals</li>
          <li>Personalized academic roadmaps with verified mentorship connections</li>
          <li>Ecosystem integration for parents, mentors, and counselors</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Our approach</h2>
        <p className="mb-4 leading-relaxed text-slate-600">
          Traditional career tests rely on self-reported preferences and rigid question banks.
          ManzilTak takes a fundamentally different approach — we measure what you
          <em> actually do</em>, not just what you say. Through carefully designed interactive
          scenarios, we observe cognitive style, creative instincts, and problem-solving patterns in
          real time.
        </p>
        <p className="leading-relaxed text-slate-600">
          The result is a career prediction rooted in data, not guesswork — optimized for both rapid
          professional success and deep personal fulfillment.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Our values</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="mb-2 text-lg font-bold text-slate-800">Precision over popularity</h3>
            <p className="text-sm text-slate-600">
              We recommend career paths based on data-driven fit, not trends or biases.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="mb-2 text-lg font-bold text-slate-800">Equity of access</h3>
            <p className="text-sm text-slate-600">
              Every student deserves world-class guidance regardless of socioeconomic background.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="mb-2 text-lg font-bold text-slate-800">Transparency</h3>
            <p className="text-sm text-slate-600">
              We explain how and why we arrive at our recommendations — no black boxes.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="mb-2 text-lg font-bold text-slate-800">Continuous learning</h3>
            <p className="text-sm text-slate-600">
              Our models evolve with the labor market so recommendations stay relevant.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Contact us</h2>
        <p className="leading-relaxed text-slate-600">
          Have questions, feedback, or partnership inquiries? Reach out to us at{' '}
          <a href="mailto:contact@manziltak.com" className="font-medium text-blue-600 hover:underline">
            contact@manziltak.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
