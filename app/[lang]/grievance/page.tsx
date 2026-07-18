import type { Metadata } from 'next';
import { CONTACT_EMAIL, GRIEVANCE_OFFICER_NAME } from '@/lib/site-contact';

export const metadata: Metadata = { title: 'Grievance / Right to Reply' };

export default function GrievancePage() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Grievance / correction - Get Civic Sense')}`;
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Grievance &amp; Right to Reply</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated 19 July 2026</p>

      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
        <p>
          We publish only sourced, factual civic information, and we take accuracy seriously. This page is our grievance
          mechanism, aligned with India&apos;s Information Technology (Intermediary Guidelines and Digital Media Ethics Code)
          Rules, 2021.
        </p>

        <h2 className="pt-2 text-lg font-bold text-ink">Report an error or request a correction</h2>
        <p>Spotted a fact that is wrong, out of date, or poorly sourced? Write to us with the details and a link to an official source:</p>
        <p>
          <a href={mailto} className="font-semibold text-brand underline-offset-2 hover:underline">{CONTACT_EMAIL}</a>
        </p>
        <p>Please include the specific claim, why it is wrong or out of date, and a link to an official source for the correct information.</p>

        <h2 className="pt-2 text-lg font-bold text-ink">How we handle grievances</h2>
        <ul className="space-y-2">
          <li className="rounded-2xl border border-line bg-paper p-4">We acknowledge every grievance within <strong className="text-ink">24 hours</strong>.</li>
          <li className="rounded-2xl border border-line bg-paper p-4">We aim to resolve it within <strong className="text-ink">15 days</strong>.</li>
          <li className="rounded-2xl border border-line bg-paper p-4">Where a fact is corrected, we update it and keep a record of the change - with its source and the date we checked it.</li>
          <li className="rounded-2xl border border-line bg-paper p-4">A right-to-reply statement can be published alongside the relevant content.</li>
        </ul>

        <h2 className="pt-2 text-lg font-bold text-ink">Grievance Officer</h2>
        <p>In accordance with the IT Rules, 2021, grievances are handled by our Grievance Officer:</p>
        <ul className="space-y-1">
          <li><strong className="text-ink">Name:</strong> {GRIEVANCE_OFFICER_NAME}</li>
          <li><strong className="text-ink">Email:</strong> {CONTACT_EMAIL}</li>
          <li><strong className="text-ink">Based in:</strong> India</li>
        </ul>
      </div>
    </div>
  );
}
