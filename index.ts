#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs";

import type { Config, Options } from './types';

import generateChangelog from "./src/generator";
import { initializeConfig } from "./src/configUtils";

async function main() {
  const program = new Command();

  program
    .name('cchg')
    .option('-s, --start-tag <startTag>', 'Start tag/commit/ref for changelog generation', 'latest')
    .option('-v, --version <version>', 'New version', '')
    .option('-t, --title <title>', 'New version title', '')
    .option('-o, --output <output>', 'Changelog file', 'CHANGELOG.md')
    .option('-c, --config <config>', 'Configuration file', 'changelog.config.cjs')
    .option('-i, --init', 'Initialize configuration file', false)
    .parse(process.argv);

  if (program.opts().init) {
    initializeConfig();
  }

  try {
    let config = {} as Config;
    if (fs.existsSync(program.opts().config)) {
      const path = fs.realpathSync(program.opts().config);
      const module = await import(path);
      config = module.default || module;
    }
    config.options = {
      ...program.opts(),
      ...config.options,
    };
    generateChangelog(config);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
