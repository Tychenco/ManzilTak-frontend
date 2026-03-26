import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'AcademicIntegrityPage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function AcademicIntegrityPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-sm ring-1 ring-gray-200">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
        Academic integrity policy
      </h1>
      <p className="mb-12 text-sm text-slate-500">Last updated: March 26, 2026</p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">1. Our commitment</h2>
        <p className="leading-relaxed text-slate-600">
          ManzilTak is committed to maintaining the highest standards of academic integrity. Our
          assessments are designed to measure authentic cognitive abilities and genuine interests. The
          accuracy of our career predictions depends on honest, unassisted participation in every
          assessment module.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">2. Expected conduct</h2>
        <p className="mb-3 leading-relaxed text-slate-600">
          When using ManzilTak assessments, you are expected to:
        </p>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>Complete all assessments independently without external assistance</li>
          <li>Provide honest and genuine responses that reflect your true abilities</li>
          <li>Refrain from sharing assessment content, questions, or strategies with others</li>
          <li>Use only your own account and not impersonate another person</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">3. Prohibited actions</h2>
        <p className="mb-3 leading-relaxed text-slate-600">
          The following actions are strictly prohibited:
        </p>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>Having another person complete an assessment on your behalf</li>
          <li>Using automated tools, scripts, or AI assistants to generate responses</li>
          <li>Attempting to access, copy, or distribute assessment content</li>
          <li>Exploiting technical vulnerabilities to alter scores or results</li>
          <li>Collaborating with others during individual assessments</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">4. Detection measures</h2>
        <p className="leading-relaxed text-slate-600">
          Our platform employs behavioral analysis, response-pattern monitoring, and anomaly
          detection algorithms to identify potential violations. These systems analyze timing
          patterns, interaction consistency, and response authenticity to maintain the integrity of
          all assessments.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">5. Consequences of violations</h2>
        <p className="mb-3 leading-relaxed text-slate-600">
          Violations of this policy may result in:
        </p>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>Invalidation of assessment results and career predictions</li>
          <li>Requirement to retake assessments under monitored conditions</li>
          <li>Temporary or permanent suspension of your account</li>
          <li>Notification to associated educational institutions or guardians (for minors)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">6. Appeals process</h2>
        <p className="leading-relaxed text-slate-600">
          If you believe a violation has been flagged in error, you may submit an appeal within 14
          days of notification. Appeals are reviewed by our Academic Integrity Review Board and you
          will receive a decision within 10 business days.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">7. Why this matters</h2>
        <p className="leading-relaxed text-slate-600">
          Academic integrity is not just a policy — it is foundational to the value ManzilTak
          provides. Our career predictions are only as accurate as the data they are built on. When
          you participate honestly, you receive recommendations that genuinely reflect your strengths
          and potential. Dishonest participation ultimately harms only the participant.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-slate-800">8. Reporting concerns</h2>
        <p className="leading-relaxed text-slate-600">
          If you suspect a violation of this policy, please report it confidentially to{' '}
          <a href="mailto:integrity@manziltak.com" className="font-medium text-blue-600 hover:underline">
            integrity@manziltak.com
          </a>
          . All reports are investigated thoroughly and reporter identities are kept confidential.
        </p>
      </section>
    </div>
  );
}
