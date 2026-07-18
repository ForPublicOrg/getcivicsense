'use client';
// The entire "movement" a visitor joins: a private mirror. Tapping "I do this
// too" writes ONE key to localStorage - on-device only, never transmitted,
// never aggregated, no server write. Clear your history and it's gone. Progressive
// enhancement: if JS or storage is unavailable, the rest of the card is unaffected.
import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function SameNa({ id, label }: { id: string; label: string }) {
  const [on, setOn] = useState(false);
  const key = `gcs:same:${id}`;

  useEffect(() => {
    try {
      setOn(localStorage.getItem(key) === '1');
    } catch {
      /* private mode - session-only, fine */
    }
  }, [key]);

  function toggle() {
    const next = !on;
    setOn(next);
    try {
      if (next) localStorage.setItem(key, '1');
      else localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        on ? 'bg-brand text-white' : 'border border-line text-ink-soft hover:border-brand hover:text-brand'
      }`}
    >
      <Icon name={on ? 'check' : 'spark'} size={14} />
      {label}
    </button>
  );
}
