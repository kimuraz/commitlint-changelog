import { exec } from 'child_process';
import {PostLineProcess} from "../types";
import {GitError} from "./errors";

export const gitLogOneLine = (fromTag: string, noDecorate: boolean = true, postLineProcess: PostLineProcess[] = []) => {
    return new Promise<string[]>(async (resolve, reject) => {
        let tag = fromTag;
        if (fromTag === 'latest') {
            tag = await gitGetLastTag();
        }
        let cmd = `git log --oneline`;
        if (noDecorate) {
            cmd += ' --no-decorate';
        }
        if (tag) {
            cmd += ` ${tag}..`;
        }
        exec(cmd, (error: any, stdout: string, _: any) => {
            if (error) {
                reject(new GitError(error.message));
            }

            let lines = stdout.split('\n').filter(l => !!l);

            postLineProcess.forEach((process) => {
                lines = process(lines);
            });

            resolve(lines);
        });
    });
}

export const gitGetLastTag = () => {
    return new Promise<string>((resolve, reject) => {
        exec(`git tag -l`, (error: any, stdout: string, _: any) => {
            if (error) {
                reject(new GitError(error.message));
            }

            const tags = stdout.split('\n');
            resolve(tags[0] || '');
        });
    });
}