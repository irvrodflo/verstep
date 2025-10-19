import { executeSync } from './excecuters';

export function npmUpgradeVersion(version: string) {
  const NODE_UPGRADE_COMMAND: string = 'npm version';

  const normalizedVersion = version.startsWith('v') ? version.slice(1) : version;

  try {
    executeSync(`${NODE_UPGRADE_COMMAND} ${normalizedVersion} --no-git-tag-version`);
    console.log('NPM version upgraded successfully');
  } catch (e) {
    console.error(`Error during npm version upgrade: ${e}`);
  }
}

export function getNpmVersion(): string | null {
  const NODE_GET_VERSION: string = 'npm pkg get version';
  return executeSync(NODE_GET_VERSION);
}
