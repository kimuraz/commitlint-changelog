export type PostLineProcess = (line: string[]) => string[];

export interface Options {
    startTag: string;
    version: string;
    output: string;
    title: string;
    config: string;
}

export interface Config {
    options: Options;
    plugins: PostLineProcess[];
}
