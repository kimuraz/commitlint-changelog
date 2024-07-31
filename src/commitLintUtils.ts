export const commitLintTypes = {
    feat: 'Features',
    fix: 'Bug Fixes',
    docs: 'Documentation',
    style: 'Styles',
    refactor: 'Code Refactoring',
    perf: 'Performance Improvements',
    test: 'Tests',
    build: 'Build',
    ci: 'Continuous Integration',
} as { [key: string]: string };

export const getTypeByCommitMessage = (message: string): string => {
    for (const type in commitLintTypes) {
        const rgx = new RegExp(`(${type})(\\([^\\)]+\\))?:`, 'i');
        if (rgx.test(message)) {
            return commitLintTypes[type];
        }
    }
    return 'Others';
}

export const getCommitMessagesObjByType = (commits: string[]): { [key: string]: string[] } => {
    const messages: { [key: string]: string[] } = {};
    commits.forEach((commit) => {
        const type = getTypeByCommitMessage(commit);
        if (!messages[type]) {
            messages[type] = [];
        }
        messages[type].push(commit);
    });

    return messages;
}