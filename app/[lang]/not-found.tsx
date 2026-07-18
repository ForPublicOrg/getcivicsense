import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-4 py-24 text-center">
      <p className="text-5xl font-extrabold text-brand">404</p>
      <h1 className="mt-3 text-2xl font-bold text-ink">No card for that yet.</h1>
      <p className="mt-2 max-w-md text-ink-soft">
        But good one - India&apos;s civic life has range. Try a place from the home page.
      </p>
      <Link href="/" className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep">
        Back to places
      </Link>
    </div>
  );
}
