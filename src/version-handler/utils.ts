import { readFile } from '../utils';
import { VERSION_REGEX, testRegex, findLineByRegex } from '../utils/regex';

export function validateVersionFormat(version: string): boolean {
  return testRegex(version, VERSION_REGEX, 'total');
}

export function extractVersion(input: string): string | null {
  const match = input.match(VERSION_REGEX);
  return match ? match[0] : null;
}

export function extractVersionNumber(input: string): string | null {
  const versionComplete = extractVersion(input);
  return versionComplete ? versionComplete.replace('v', '') : null;
}

export function findVersionLine(lines: string[]): string | null {
  return findLineByRegex(lines, VERSION_REGEX, 'partial') || null;
}

export function getVersionLineFromFile(path: string): string | null {
  const lines: string[] = readFile(path);
  const versionLine: string | null = findVersionLine(lines);
  return versionLine;
}

export function getVersionFromFile(path: string) {
  const versionLine = getVersionLineFromFile(path);
  return versionLine ? extractVersionNumber(versionLine) : null;
}

export function buildVersionFromNumber(version: string): string {
  return version.startsWith('v') ? version : `v${version}`;
}
