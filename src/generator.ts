import * as fs from 'fs';
import {gitLogOneLine} from "./gitUtils";
import {getCommitMessagesObjByType} from "./commitLintUtils";

export const appendReleaseChanges = (logLines: string[], changelog: string, newVersion: string, newVersionTitle: string) => {
    const logTypeMap = getCommitMessagesObjByType(logLines);
    const sections: string[] = [];
    Object.keys(logTypeMap).sort().forEach((type) => {
        sections.push(`### ${type} \n\n- ${logTypeMap[type].join('\n- ')}`);
    });
    return changelog.replace(
        '# Changelog \n\n', `# Changelog \n\n## ${newVersion} ${newVersionTitle} \n${sections.join('\n\n')}\n`
    );
}

const generateChangelog = async (changelogFile: string, newVersion: string, newVersionTitle: string, fromTag: string = 'latest') => {

    let changelog = '# Changelog \n\n';

    if (fs.existsSync(changelogFile)) {
        const content = fs.readFileSync(changelogFile, {
            encoding: 'utf-8',
            flag: 'w+',
        });

        if (content) {
            changelog = content;
        }
    }

    try {
        const logLines: string[] = await gitLogOneLine(fromTag);
        changelog = appendReleaseChanges(logLines, changelog, newVersion, newVersionTitle);

        fs.writeFileSync(changelogFile, changelog, {
            encoding: 'utf-8',
            flag: 'w+',
            mode: 0o666,
            flush: true,
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default generateChangelog;