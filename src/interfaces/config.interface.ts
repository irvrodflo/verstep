export interface VerstepConfig {
  consolePath: string;
  scrapingPath: string;
  gitProtocol: {
    add: boolean;
    commit: boolean;
    push: boolean;
    pull: boolean;
    tag: boolean;
    remoteName: string;
    branchName: string;
  };
  lastUpdated: {
    date: string;
    madeBy: string;
  };
}
