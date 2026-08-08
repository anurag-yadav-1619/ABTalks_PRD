export function isValidGithubUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com' && parsed.hostname !== 'www.github.com') {
      return false;
    }
    // Very basic check: should have at least /username/repo
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    return pathParts.length >= 1; 
  } catch {
    return false;
  }
}

export function isValidLinkedinUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('linkedin.com')) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
