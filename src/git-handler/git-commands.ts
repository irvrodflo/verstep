export const GIT_COMMANDS = {
  commit: 'git commit -m',
  add: 'git add .',
  push: 'git push',
  pull: 'git pull',
  tag: 'git tag',
  getName: 'git config user.name',
  readLastCommit: 'git log -1 --pretty=%s',
  rollbackForced: 'git reset --hard HEAD~1',
  readTag: 'git describe --tags',
};

export const GIT_OPTIONS = {
  pushForce: '--force-with-lease',
};
