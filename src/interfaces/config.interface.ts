export interface VerstepConfig {
  version: string;
  versionFormat: VersionFormats;
  paths: string[];
  gitConfig: GitConfig;
  lastUpdated: {
    date: string;
    madeBy: string;
  };
}

export enum VersionFormats {
  SINGLE = 'X.X.X',
  VERSTEP = 'vX.X.X',
}

export interface GitConfig {
  push: boolean;
  pull: boolean;
  remoteName: string;
  developBranch: string;
  productionBranch: string;
  forcePush: boolean;
  forcePull: boolean;
}
