import { readVerstepConfig } from '../config-handler/config-reader';
import { executeSync } from '../utils';
import { GIT_COMMANDS, GIT_OPTIONS } from './git-commands';

const { gitProtocol: gitConfig } = readVerstepConfig();

export function gitPull(
  remote: string = gitConfig.remoteName,
  branch: string = gitConfig.branchName
) {
  executeSync(`${GIT_COMMANDS.pull} ${remote} ${branch}`);
}

export function gitAdd() {
  executeSync(GIT_COMMANDS.add) || '';
}

export function gitCommit(message: string) {
  executeSync(`${GIT_COMMANDS.commit} "${message}"`);
}

export function gitPush(config?: { remote?: string; branch?: string; force?: boolean }) {
  const {
    remote = gitConfig.remoteName,
    branch = gitConfig.branchName,
    force = false,
  } = config || {};
  const forceFlag: string = force ? GIT_OPTIONS.pushForce : '';
  const command: string = `${GIT_COMMANDS.push} ${remote} ${branch} ${forceFlag}`;

  executeSync(command);
}

export function gitTag(version: string) {
  executeSync(`${GIT_COMMANDS.tag} ${version}`);
}

export function gitRollbackForced(): void {
  executeSync(GIT_COMMANDS.rollbackForced);
}
