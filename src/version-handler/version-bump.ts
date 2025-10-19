import { UpgradeType } from '../interfaces';

export function versionBump(lastVersion: string, type: UpgradeType): string {
  let [major, minor, patch] = lastVersion.split('.').map(Number);

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

  return `${major}.${minor}.${patch}`;
}
