import { VersionFormats, VerstepConfig } from '../interfaces';

export const DEFAULT_CONFIG: VerstepConfig = {
  version: 'v0.0.0',
  versionFormat: VersionFormats.VERSTEP,
  paths: [],
  gitConfig: {
    push: true,
    pull: true,
    remoteName: 'origin',
    developBranch: 'develop',
    productionBranch: 'main',
    forcePush: false,
    forcePull: false,
  },
  lastUpdated: {
    madeBy: '',
    date: new Date().toISOString(),
  },
};
