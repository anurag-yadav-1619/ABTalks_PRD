import { describe, it, expect } from 'vitest';
import { isValidGithubUrl, isValidLinkedinUrl } from '../src/utils/validation';

describe('URL Validation Utilities', () => {
  it('validates correct GitHub URLs', () => {
    expect(isValidGithubUrl('https://github.com/anurag/abtalks')).toBe(true);
    expect(isValidGithubUrl('https://www.github.com/anurag')).toBe(true);
  });

  it('rejects incorrect GitHub URLs', () => {
    expect(isValidGithubUrl('https://google.com')).toBe(false);
    expect(isValidGithubUrl('github.com/anurag')).toBe(false); // missing protocol
    expect(isValidGithubUrl('')).toBe(false);
    expect(isValidGithubUrl('https://github.com')).toBe(false); // missing repo/user
  });

  it('validates correct LinkedIn URLs', () => {
    expect(isValidLinkedinUrl('https://www.linkedin.com/posts/anurag')).toBe(true);
    expect(isValidLinkedinUrl('https://linkedin.com/in/anurag')).toBe(true);
  });

  it('rejects incorrect LinkedIn URLs', () => {
    expect(isValidLinkedinUrl('https://twitter.com/anurag')).toBe(false);
    expect(isValidLinkedinUrl('linkedin.com/anurag')).toBe(false); // missing protocol
    expect(isValidLinkedinUrl('')).toBe(false);
  });
});
