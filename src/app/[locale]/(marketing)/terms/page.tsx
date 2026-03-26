import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'TermsPage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function TermsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-sm ring-1 ring-gray-200">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
        Terms of service
      </h1>
      <p className="mb-12 text-sm text-slate-500">Last updated: March 26, 2026</p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">1. Acceptance of terms</h2>
        <p className="leading-relaxed text-slate-600">
          By accessing or using the ManzilTak platform (&quot;Service&quot;), you agree to be bound
          by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may
          not use the Service. We reserve the right to modify these Terms at any time. Continued use
          of the Service after changes constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">2. Eligibility</h2>
        <p className="leading-relaxed text-slate-600">
          The Service is intended for users who are at least 13 years of age. If you are under 18,
          you must have the consent of a parent or legal guardian to use the Service. By registering,
          you represent that you meet these eligibility requirements.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">3. User accounts</h2>
        <p className="leading-relaxed text-slate-600">
          You are responsible for maintaining the confidentiality of your account credentials and for
          all activities that occur under your account. You agree to notify us immediately of any
          unauthorized use. We are not liable for any loss resulting from unauthorized access to your
          account.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">4. Acceptable use</h2>
        <p className="mb-3 leading-relaxed text-slate-600">You agree not to:</p>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>Use the Service for any unlawful purpose</li>
          <li>Attempt to reverse-engineer, decompile, or disassemble any part of the Service</li>
          <li>Interfere with or disrupt the integrity or performance of the Service</li>
          <li>Upload malicious code or content that infringes third-party rights</li>
          <li>Create multiple accounts to circumvent restrictions</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">5. Intellectual property</h2>
        <p className="leading-relaxed text-slate-600">
          All content, features, and functionality of the Service — including but not limited to
          text, graphics, logos, assessments, algorithms, and software — are the exclusive property
          of ManzilTak and are protected by copyright, trademark, and other intellectual property
          laws. You may not reproduce, distribute, or create derivative works without prior written
          consent.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">6. Disclaimer of warranties</h2>
        <p className="leading-relaxed text-slate-600">
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties
          of any kind, express or implied. Career predictions and recommendations are informational
          and do not constitute professional career counseling. We do not guarantee specific academic
          or employment outcomes.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">7. Limitation of liability</h2>
        <p className="leading-relaxed text-slate-600">
          To the maximum extent permitted by applicable law, ManzilTak shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising from your use of
          the Service, including but not limited to loss of data, revenue, or opportunity.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">8. Termination</h2>
        <p className="leading-relaxed text-slate-600">
          We may suspend or terminate your access at any time, with or without cause, and with or
          without notice. Upon termination, your right to use the Service ceases immediately. Any
          provisions of these Terms that by their nature should survive termination shall remain in
          effect.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">9. Governing law</h2>
        <p className="leading-relaxed text-slate-600">
          These Terms are governed by and construed in accordance with the laws of India. Any
          disputes arising under these Terms shall be subject to the exclusive jurisdiction of the
          courts in New Delhi, India.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-slate-800">10. Contact</h2>
        <p className="leading-relaxed text-slate-600">
          For questions about these Terms, contact us at{' '}
          <a href="mailto:legal@manziltak.com" className="font-medium text-blue-600 hover:underline">
            legal@manziltak.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
