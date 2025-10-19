import { gitPush } from '../git-handler';
import { executeSync } from './excecuter';

const NODE_UPGRADE_COMMAND: string = 'npm version';
const NODE_GET_VERSION: string = 'npm pkg get version';

export function npmUpgradeVersion(version: string) {
  try {
    executeSync(`${NODE_UPGRADE_COMMAND} ${version} --no-git-tag-version`);
    gitPush();
    console.log('NPM version upgraded successfully');
  } catch (e) {
    console.error(`Error during npm version upgrade: ${e}`);
  }
}

export function getNpmVersion(): string {
  return executeSync(NODE_GET_VERSION) || '0.0.0';
}
