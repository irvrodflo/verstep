import { gitPush, gitRollbackForced, readLastCommit } from '../git-handler';

import { validateVersionFormat } from '../version-handler/utils';

export function rollback() {
  const lastCommit = readLastCommit();
  const wasVersionCommit = validateVersionFormat(lastCommit);

  if (!wasVersionCommit) {
    console.error('The last commit wan not a version commit, rollback cannot be made');
    return;
  }

  gitRollbackForced();
  gitPush({ force: true });

  console.log('Rollback done sucessfully');
}
