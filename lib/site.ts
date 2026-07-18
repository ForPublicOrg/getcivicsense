// Single source of truth for cross-site links and identity.
export const SITE_NAME = 'Get Civic Sense';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://getcivicsense.org';

// The sibling site links here from its footer ("What is civic sense?"); we link
// back so the two cross-promote without either taking a runtime dependency.
export const SIBLING_URL = 'https://www.rankyourpolitician.com';
export const REPO_URL = 'https://github.com/ForPublicOrg/getcivicsense';
