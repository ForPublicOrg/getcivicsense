'use client';
// Confession-first sharing. The text implicates the sharer ("Guilty? Same"),
// so forwarding it reads as self-aware, not preachy. Uses the native share
// sheet where available, else copies. No tracking, no counts, nothing logged.
import { useState } from 'react';
import Icon from './Icon';

export default function ShareButton({
  title,
  shareText,
  label,
  url,
}: {
  title: string;
  shareText: string;
  label: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);
  const text = `${title} - ${shareText}`;

  async function onShare() {
    const data = { title, text, url };
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* user dismissed or unsupported - no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-brand hover:text-brand"
    >
      <Icon name={copied ? 'check' : 'share'} size={14} />
      {copied ? 'Copied' : label}
    </button>
  );
}
