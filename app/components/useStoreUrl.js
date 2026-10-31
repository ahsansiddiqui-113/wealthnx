'use client';

export const APPLE_STORE_URL = 'https://apps.apple.com/us/app/wealthnx-ai/id6753972698';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.inexor.wealthnx.ai&pcampaignid=web_share';

function getUserAgent() {
  if (typeof navigator === 'undefined') return '';
  return navigator.userAgent || '';
}

function isIOS() {
  const ua = getUserAgent();
  return /iPad|iPhone|iPod|Mac OS/.test(ua) && !/Windows|Linux|Android/.test(ua);
}

function isAndroid() {
  const ua = getUserAgent();
  return /Android|Adr/.test(ua);
}

function isTablet() {
  const ua = getUserAgent();
  return /iPad|Android|Tablet|Silk|Nexus 7|Nexus 10|PlayBook|Kindle|Galaxy Tab/.test(ua);
}

function isMobile() {
  const ua = getUserAgent();
  return /Mobile|Android|iPhone|iPad|iPod|Windows Phone|Tablet/.test(ua);
}

function isDesktop() {
  return !isMobile();
}

function isMacOS() {
  const ua = getUserAgent();
  return /Mac OS|Macintosh/.test(ua) && !/iPhone|iPad|iPod|Android/.test(ua);
}

function isWindows() {
  const ua = getUserAgent();
  return /Windows|Win32|Win64/.test(ua) && !/Phone|Mobile/.test(ua);
}

function isLinux() {
  const ua = getUserAgent();
  return /Linux|X11/.test(ua) && !/Android/.test(ua);
}

export function getStoreUrl() {
  if (typeof navigator === 'undefined') return APPLE_STORE_URL;

  // Priority: iOS > Android > Desktop
  if (isIOS()) {
    return APPLE_STORE_URL;
  }

  if (isAndroid()) {
    return GOOGLE_PLAY_URL;
  }

  if (isMobile()) {
    // Fallback for unrecognized mobile devices
    return APPLE_STORE_URL;
  }

  // Desktop platforms (macOS, Windows, Linux)
  if (isMacOS() || isWindows() || isLinux()) {
    return GOOGLE_PLAY_URL;
  }

  // Ultimate fallback
  return APPLE_STORE_URL;
}

export function getDeviceInfo() {
  return {
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isTablet: isTablet(),
    isMobile: isMobile(),
    isDesktop: isDesktop(),
    isMacOS: isMacOS(),
    isWindows: isWindows(),
    isLinux: isLinux(),
    userAgent: getUserAgent(),
  };
}

export function openStore(e) {
  if (e) {
    e.preventDefault();
  }
  try {
    const url = getStoreUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Failed to open store:', error);
  }
}
