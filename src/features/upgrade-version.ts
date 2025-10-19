import { join } from 'path';

import { readFile, writeFile } from '../utils';
import { extractVersionNumber, findVersionLine, versionBump } from '../version-handler';
import { UpgradeType } from '../interfaces';

export function upgradeVersion(type: UpgradeType, path: string): string | null {
  const filePath: string = join(process.cwd(), path);
  const lines: string[] = readFile(filePath);
  const versionLine: string | null = findVersionLine(lines);

  if (!versionLine) {
    throw new Error(`Version line not found at ${filePath}`);
  }

  const versionLineIndex: number = lines.indexOf(versionLine);
  const version: string = extractVersionNumber(versionLine)!;
  const newVersion: string | null = versionBump(version, type);

  if (!newVersion) {
    throw new Error(`Error trying to make version bump from ${version}`);
  }

  console.log(`v${version} -> v${newVersion}`);

  const newLine: string = versionLine.replace(version, newVersion);
  lines[versionLineIndex] = newLine;
  const newContent = lines.join('\n');

  const success = writeFile(filePath, newContent);

  if (!success) {
    throw new Error('Local upgrade fails');
  }

  console.log('Local upgrader done successfully');

  return newVersion;
}
