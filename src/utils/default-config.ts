import { VersionFormats, VerstepConfig } from '../interfaces';

export const defaultConfig: VerstepConfig = {
  version: 'v0.0.0',
  versionFormat: VersionFormats.VERSTEP,
  path: '',
  consolePath: '',
  scrapingPath: 'index.html',
  gitConfig: {
    push: true,
    pull: true,
    remoteName: 'origin',
    developBranch: 'main',
    mainBranch: 'main',
    forcePush: false,
    forcePull: false,
  },
  lastUpdated: {
    madeBy: '',
    date: new Date().toISOString(),
  },
};
