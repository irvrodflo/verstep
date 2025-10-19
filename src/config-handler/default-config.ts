import { VerstepConfig } from '../interfaces';

export const defaultConfig: VerstepConfig = {
  consolePath: '',
  scrapingPath: 'index.html',
  gitProtocol: {
    add: true,
    commit: true,
    push: true,
    tag: true,
    pull: true,
    remoteName: 'origin',
    branchName: 'main',
  },
  lastUpdated: {
    madeBy: '',
    date: '',
  },
};
