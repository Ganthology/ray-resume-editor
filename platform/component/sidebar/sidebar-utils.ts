import { Cookies } from 'react-cookie';

export const SIDEBAR_COOKIE_NAME = "sidebar_state";

const cookies = new Cookies();

export function getSidebarStateFromCookie(): boolean {
  if (typeof window === "undefined") {
    return true; // SSR default
  }

  const sidebarState = cookies.get(SIDEBAR_COOKIE_NAME);
  
  if (sidebarState === undefined) {
    return true; // Default to open
  }

  return sidebarState === 'true' || sidebarState === true;
}

// Helper function to set cookie
export function setSidebarStateCookie(state: boolean) {
  if (typeof window === "undefined") {
    return; // Skip on SSR
  }

  const maxAge = new Date();
  maxAge.setTime(maxAge.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
  
  cookies.set(SIDEBAR_COOKIE_NAME, state.toString(), {
    path: '/',
    expires: maxAge,
    sameSite: 'lax'
  });
}
