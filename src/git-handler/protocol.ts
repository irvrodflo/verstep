import { gitAdd, gitCommit, gitPull, gitPush, gitTag } from './common';
import { readVerstepConfig } from '../config-handler/config-reader';

const { gitProtocol: gitConfig } = readVerstepConfig();

export function gitProtocol(version: string) {
  const { add, commit, push, pull, tag } = gitConfig;

  if (!add) {
    console.log('git  add disabled. Git protocol cannot be made');
  }

  if (pull) {
    gitPull();
  } else {
    console.log('git pull is disabled, it maybe can generate merge conflicts');
  }

  if (!add) return;

  console.log('Start of git protocol');

  gitAdd();

  if (!commit) {
    console.log('git commit is disabled');
    return;
  }

  gitCommit(version);

  if (tag) {
    gitTag(version);
  } else {
    console.log('git tag disabled');
  }

  if (!push) {
    console.log('git push disabled');
    return;
  }

  gitPush();

  console.log('Git protocol made successfully');
}
