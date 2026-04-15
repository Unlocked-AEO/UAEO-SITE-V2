/**
 * Mock auth state for design purposes.
 *
 * Toggle this to simulate logged-in vs logged-out states.
 * The integration developer will replace this with real auth.
 *
 * When `true`: user bypasses signup/signin and goes straight to /dashboard
 * When `false`: user is redirected to /signup when trying to access dashboard
 */
export const IS_LOGGED_IN = true;
