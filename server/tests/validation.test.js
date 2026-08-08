"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const validation_1 = require("../src/utils/validation");
(0, vitest_1.describe)('URL Validation Utilities', () => {
    (0, vitest_1.it)('validates correct GitHub URLs', () => {
        (0, vitest_1.expect)((0, validation_1.isValidGithubUrl)('https://github.com/anurag/abtalks')).toBe(true);
        (0, vitest_1.expect)((0, validation_1.isValidGithubUrl)('https://www.github.com/anurag')).toBe(true);
    });
    (0, vitest_1.it)('rejects incorrect GitHub URLs', () => {
        (0, vitest_1.expect)((0, validation_1.isValidGithubUrl)('https://google.com')).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidGithubUrl)('github.com/anurag')).toBe(false); // missing protocol
        (0, vitest_1.expect)((0, validation_1.isValidGithubUrl)('')).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidGithubUrl)('https://github.com')).toBe(false); // missing repo/user
    });
    (0, vitest_1.it)('validates correct LinkedIn URLs', () => {
        (0, vitest_1.expect)((0, validation_1.isValidLinkedinUrl)('https://www.linkedin.com/posts/anurag')).toBe(true);
        (0, vitest_1.expect)((0, validation_1.isValidLinkedinUrl)('https://linkedin.com/in/anurag')).toBe(true);
    });
    (0, vitest_1.it)('rejects incorrect LinkedIn URLs', () => {
        (0, vitest_1.expect)((0, validation_1.isValidLinkedinUrl)('https://twitter.com/anurag')).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidLinkedinUrl)('linkedin.com/anurag')).toBe(false); // missing protocol
        (0, vitest_1.expect)((0, validation_1.isValidLinkedinUrl)('')).toBe(false);
    });
});
