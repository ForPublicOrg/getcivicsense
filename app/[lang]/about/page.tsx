import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Civic sense isn&apos;t about them. It&apos;s about all of us.</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
        <p>
          &ldquo;These people have no civic sense&rdquo; is something we say <em>about</em> someone else - the next lane, the
          next seat, the next queue. We&apos;re taking the phrase back. Get Civic Sense is about the small, ordinary things
          every one of us does - the horn we lean on, the wrapper we drop, the spit on the stairwell, the shove at the gate,
          the seat we don&apos;t give up - and the surprisingly real ways they reach the people around us.
        </p>
        <p>
          It is not a lecture and not a scold. Each card shows the everyday thing warmly, then - one tap down - the actual
          science of why it matters, with the source and the date we checked it. The problem, it turns out, is always other
          people. And so, quietly, are we. You draw your own conclusion; we just hand you the mirror.
        </p>
        <p>
          It reaches from the road and the bus queue to the wrapper and the spit, from street dogs and trees to water, power
          and even the footprint of AI, and on to the languages and monuments we hand down - dozens of everyday things, every
          one cited. Different corners of a single idea: the street is a shared room with the walls taken out, and all of us
          live in it.
        </p>
        <p>
          <strong className="text-ink">Non-partisan, non-religious, and for everyone.</strong> No accounts, no login, and
          nothing collected about you. The same page serves a seven-year-old and their grandparent - the picture and
          the plain line up top, the evidence in the drawer.
        </p>
        <p>
          It is a sibling to <a href="https://www.rankyourpolitician.com" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">RankYourPolitician</a>,
          and built the same way: open source, cited, and fast on a cheap phone.
        </p>
      </div>
    </div>
  );
}
