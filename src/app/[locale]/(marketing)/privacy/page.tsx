import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function PrivacyPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-sm ring-1 ring-gray-200">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
        Privacy policy
      </h1>
      <p className="mb-12 text-sm text-slate-500">Last updated: March 26, 2026</p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">1. Information we collect</h2>
        <p className="mb-3 leading-relaxed text-slate-600">
          We collect information that you provide directly when you create an account, complete
          assessments, or contact us. This may include:
        </p>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>Name, email address, and date of birth</li>
          <li>Educational background and academic records (when voluntarily provided)</li>
          <li>Assessment responses, interaction patterns, and cognitive profile data</li>
          <li>Device information, IP address, and browser type (collected automatically)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">2. How we use your information</h2>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>To generate personalized career predictions and academic roadmaps</li>
          <li>To improve our AI models and assessment accuracy</li>
          <li>To communicate service updates and relevant notifications</li>
          <li>To comply with legal obligations and enforce our Terms of Service</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">3. Data sharing</h2>
        <p className="leading-relaxed text-slate-600">
          We do not sell your personal data. We may share information with trusted third-party
          service providers who assist in operating the platform (e.g., hosting, analytics,
          authentication) under strict confidentiality agreements. We may also disclose information
          when required by law or to protect our legal rights.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">4. Cookies and tracking</h2>
        <p className="leading-relaxed text-slate-600">
          We use essential cookies to maintain your session and preferences. We may use analytics
          cookies to understand how the Service is used. You can control cookie preferences through
          your browser settings, though disabling essential cookies may affect functionality.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">5. Data retention</h2>
        <p className="leading-relaxed text-slate-600">
          We retain your personal data for as long as your account is active or as needed to provide
          the Service. You may request deletion of your account and associated data at any time by
          contacting us. Certain data may be retained to comply with legal obligations.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">6. Data security</h2>
        <p className="leading-relaxed text-slate-600">
          We implement industry-standard security measures including encryption in transit and at
          rest, access controls, and regular security audits. However, no method of transmission over
          the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">7. Your rights</h2>
        <p className="mb-3 leading-relaxed text-slate-600">
          Depending on your jurisdiction, you may have the right to:
        </p>
        <ul className="list-inside list-disc space-y-1 text-slate-600">
          <li>Access, correct, or delete your personal data</li>
          <li>Object to or restrict processing of your data</li>
          <li>Withdraw consent for data collection at any time</li>
          <li>Request a portable copy of your data</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-slate-800">8. Children&apos;s privacy</h2>
        <p className="leading-relaxed text-slate-600">
          Our Service is designed for students aged 13 and above. For users under 18, we obtain
          parental or guardian consent before processing personal data. We take special care to limit
          data collection for minor users to what is strictly necessary for the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-slate-800">9. Contact</h2>
        <p className="leading-relaxed text-slate-600">
          For privacy-related inquiries, contact our Data Protection Officer at{' '}
          <a href="mailto:privacy@manziltak.com" className="font-medium text-blue-600 hover:underline">
            privacy@manziltak.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
