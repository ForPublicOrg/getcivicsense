// The one public contact address. It is load-bearing under the law: the
// Grievance Officer channel of the IT Rules 2021 (/grievance) and the
// data-protection contact of the DPDP Act (/privacy) both point here, so the
// two statutory channels cannot drift apart. Keep it a real, monitored mailbox.
//
// NEXT_PUBLIC_* is inlined at BUILD time, so changing the env var in Vercel does
// not move an already-built page - it needs a redeploy. The fallback below is
// what actually ships whenever the var is unset.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_GRIEVANCE_EMAIL || 'shelock221bholmes@gmail.com';

// Named publicly on /grievance as required by IT Rules 2021 r.3(2)(a), which
// also requires the officer be resident in India.
export const GRIEVANCE_OFFICER_NAME = 'Vikas Singh';
