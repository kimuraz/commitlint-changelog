import { Command } from "commander";
import * as fs from "fs";

import type {Config, Options} from './types';

import generateChangelog from "./src/generator";
import { initializeConfig } from "./src/configUtils";

const program = new Command();

program
    .option('-s, --start-tag <startTag>', 'Start tag/commit/ref for changelog generation', 'latest')
    .option('-v, --version <version>', 'New version', '')
    .option('-t, --title <title>', 'New version title', '')
    .option('-o, --output <output>', 'Changelog file', 'CHANGELOG.md')
    .option('-c, --config <config>', 'Configuration file', 'changelog.config.js')
    .option('-i, --init', 'Initialize configuration file', false)
    .parse(process.argv);

if (program.opts().init) {
    initializeConfig();
}

try {
    let config = {} as Config;
    if (fs.existsSync(program.opts().config)) {
        config = require(program.opts().config);
    }
    const options: Options = {...program.opts(), ...(config?.options || {})};

    generateChangelog(options.output, options.version, options.title, options.startTag);
} catch (err) {
    console.error(err);
    process.exit(1);
}