import * as fs from "fs";

export const initializeConfig = () => {
    console.log('Initializing configuration file...');
    const config: string = `export default {
    options: {
        startTag: 'latest',
        version: '1.0.0',
        output: 'CHANGELOG.md',
        title: 'Awesome project release',
    },
    plugins: [],
};`;

    fs.writeFileSync('changelog.config.cjs', config, {
        encoding: 'utf-8',
        flag: 'w+',
        mode: 0o666,
        flush: true,
    });
    process.exit(0);
}
