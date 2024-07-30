import * as fs from 'fs';
import {gitLogOneLine} from "./gitUtils";

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

        console.log('>>', changelog);
        changelog = changelog.replace('# Changelog \n\n', `# Changelog \n\n## ${newVersion} ${newVersionTitle} \n${logLines.join('\n')}\n`);

        console.log(changelog);
        fs.writeFileSync(changelogFile, changelog, { flag: 'w+', mode: 0o666, flush: true });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default generateChangelog;