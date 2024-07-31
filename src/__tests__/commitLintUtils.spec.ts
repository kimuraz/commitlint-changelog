import { vi, describe, it, expect } from 'vitest';

import { getCommitMessagesObjByType, getTypeByCommitMessage, commitLintTypes } from "../commitLintUtils";

describe('commitLintUtils', () => {
    const testData = [
        'feat: add new feature',
        'fix: fix bug',
        'docs: update readme',
        'style: fix style',
        'refactor: refactor code',
        'perf: improve performance',
        'test: add test',
        'build: build',
        'chore: update dependencies',
        'ci: update ci',
        'others: others',
        'feat(scope): add new feature',
        'fix(scope): fix bug',
        'docs(scope): update readme',
        'style(scope): fix style',
        'refactor(scope): refactor code',
        'perf(scope): improve performance',
        'test(scope): add test',
        'build(scope): build',
        'chore(scope): update dependencies',
        'ci(scope): update ci',
        'others(scope): others',
        '12345 feat: add new feature',
        '12345 feat(scope): add new feature',
        'other: probably not valid',
        'other(scope): probably not valid',
        '12345 other: probably not valid',
        '12345 other(scope): probably not valid',
    ];
    const expectedTypes = [...testData].map(msg => {
        msg = msg.replace(/\(scope\)/g, '')
        msg = msg.replace(/(12345)/g, '')
        return msg.split(':')[0].trim();
    }).map(type => commitLintTypes[type] || 'Others');

    it('getTypeByCommitMessage', () => {
        for (let i = 0; i < testData.length; i++) {
            expect(getTypeByCommitMessage(testData[i])).toBe(expectedTypes[i]);
        }
    });

    it('getCommitMessagesObjByType', () => {
        const messages = getCommitMessagesObjByType(testData);
        expectedTypes.forEach((type, i) => {
            expect(messages[type]).toContain(testData[i]);
        });
    });
});