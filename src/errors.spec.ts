import { describe, it, expect } from 'vitest';
import { GitError } from "./errors";

describe('errors', () => {
    it('GitError', () => {
        const error = new GitError('error message');
        expect(error.message).toBe('error message');
        expect(error.name).toBe('GitError');
    });
});