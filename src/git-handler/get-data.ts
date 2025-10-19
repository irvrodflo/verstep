import { GIT_COMMANDS } from './git-commands';
import { executeSync } from '../utils';

export function getGitUserName(): string {
  return executeSync(GIT_COMMANDS.getName) || '';
}

export function readLastCommit(): string {
  return executeSync(GIT_COMMANDS.readLastCommit) || '';
}

export function readTag(): string {
  return executeSync(GIT_COMMANDS.readTag) || '';
}
