import { vi, describe, it, expect, Mock } from 'vitest';
import generateChangelog from '../generator';
import { readFileSync, writeFileSync, existsSync } from "fs";
import { gitLogOneLine } from '../gitUtils';
import { Config } from '../../types';

vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

vi.mock('../gitUtils', () => ({
  gitLogOneLine: vi.fn(),
}));

describe('generateChangelog', () => {
  it('should generate changelog', async () => {
    (existsSync as Mock).mockReturnValue(false);
    (gitLogOneLine as Mock).mockResolvedValue(['feat: add feature']);

    const config: Config = {
      options: {
        output: 'CHANGELOG.md',
        startTag: '1.0.0',
        version: '1.0.0',
        title: '2021-01-01',
      },
      plugins: [],
    }

    await generateChangelog(config);
    expect(writeFileSync).toHaveBeenCalledWith('CHANGELOG.md', expect.any(String), { encoding: 'utf-8', flag: 'w+', flush: true, mode: 0o666 });
  });
});
