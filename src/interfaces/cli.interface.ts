export enum CliOperations {
  update = 'up',
  sync = 'sync',
  reset = 'reset',
  rollback = 'rollback',
  init = 'init',
}

export enum UpgradeType {
  PATCH = 'patch',
  MINOR = 'minor',
  MAJOR = 'major',
}
