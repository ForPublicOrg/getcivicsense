import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy' };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">We know nothing about you</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
        <p>That is a feature, and - since this is a service used by children - a legal duty we take seriously under the DPDP Act, 2023.</p>
        <ul className="space-y-2">
          <li className="rounded-2xl border border-line bg-paper p-4"><strong className="text-ink">No accounts, no login.</strong> Everything works for an anonymous visitor.</li>
          <li className="rounded-2xl border border-line bg-paper p-4"><strong className="text-ink">No analytics, no trackers, no ad beacons.</strong> We do not count you.</li>
          <li className="rounded-2xl border border-line bg-paper p-4"><strong className="text-ink">Your &ldquo;I do this too&rdquo; taps stay on your device.</strong> They live in your browser&apos;s local storage, are never sent anywhere, and vanish when you clear your history.</li>
          <li className="rounded-2xl border border-line bg-paper p-4"><strong className="text-ink">Search never leaves your browser.</strong> The index is a static file; what you type is answered on your device and never logged.</li>
        </ul>
        <p>There is simply nothing to store, nothing to leak, and nothing to sell.</p>
      </div>
    </div>
  );
}
