import { join } from 'path';

import { UpgradeType, VersionFormats, VerstepConfig } from '../interfaces';
import { findLineByRegex, readFile, testRegex, writeFile } from '../utils';

export class VersionHandler {
  private readonly VERSION_REGEX: RegExp = /v\d+\.\d+\.\d+/;
  private readonly config: VerstepConfig;

  constructor(config: VerstepConfig) {
    this.config = config;
  }

  public upgrade(type: UpgradeType): string {
    const currentVersion: string = this.formatVersion(this.config.version);
    const newVersion: string = this.bump(currentVersion, type);

    console.log(`${currentVersion} -> ${newVersion}`);

    return newVersion;
  }

  public searchAndUpgrade(type: UpgradeType, path: string): string | null {
    const filePath: string = join(process.cwd(), path);
    const lines: string[] = readFile(filePath);
    const versionLine: string | null = this.findVersionLine(lines);

    if (!versionLine) {
      throw new Error(`Version line not found at ${filePath}`);
    }

    const versionLineIndex: number = lines.indexOf(versionLine);
    const version: string = this.extractVersionNumber(versionLine)!;
    const newVersion: string | null = this.bump(version, type);

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

  public getVersion(): string {
    return this.formatVersion(this.config.version);
  }

  private formatVersion(version: string): string {
    const cleanVersion: string = version.startsWith('v') ? version.slice(1) : version;
    const isVerstepFormat: boolean = this.config.versionFormat === VersionFormats.VERSTEP;

    return isVerstepFormat ? `v${cleanVersion}` : cleanVersion;
  }

  private cleanVersion(version: string): string {
    return version.startsWith('v') ? version.slice(1) : version;
  }

  private bump(lastVersion: string, type: UpgradeType): string {
    const cleanLastVersion: string = this.cleanVersion(lastVersion);
    let [major, minor, patch] = cleanLastVersion.split('.').map(Number);

    switch (type) {
      case 'major':
        major += 1;
        minor = 0;
        patch = 0;
        break;
      case 'minor':
        minor += 1;
        patch = 0;
        break;
      case 'patch':
        patch += 1;
        break;
      default:
        throw new Error(`Invalid upgrade type: ${type}`);
    }

    const newVersion: string = `${major}.${minor}.${patch}`;

    return this.formatVersion(newVersion);
  }

  public validateVersionFormat(version: string): boolean {
    return testRegex(version, this.VERSION_REGEX, 'total');
  }

  public extractVersion(input: string): string | null {
    const match = input.match(this.VERSION_REGEX);
    return match ? match[0] : null;
  }

  public extractVersionNumber(input: string): string | null {
    const versionComplete = this.extractVersion(input);
    return versionComplete ? versionComplete.replace('v', '') : null;
  }

  public findVersionLine(lines: string[]): string | null {
    return findLineByRegex(lines, this.VERSION_REGEX, 'partial') || null;
  }

  public getVersionLineFromFile(path: string): string | null {
    const lines: string[] = readFile(path);
    const versionLine: string | null = this.findVersionLine(lines);
    return versionLine;
  }

  public getVersionFromFile(path: string) {
    const versionLine = this.getVersionLineFromFile(path);
    return versionLine ? this.extractVersionNumber(versionLine) : null;
  }

  public buildVersionFromNumber(version: string): string {
    return version.startsWith('v') ? version : `v${version}`;
  }
}
