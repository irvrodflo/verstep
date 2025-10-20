import { Envronments, UpgradeType, VerstepConfig } from './interfaces';
import { ConfigHandler } from './handlers/config-handler';
import { GitHandler } from './handlers/git-handler';
import { VersionHandler } from './handlers/version-handler';
import { npmUpgradeVersion } from './utils';

export class Verstep {
  private readonly configHandler: ConfigHandler;
  private readonly versionHandler: VersionHandler;
  private readonly gitHandler: GitHandler;

  private readonly config: VerstepConfig;

  constructor() {
    this.configHandler = new ConfigHandler();
    this.config = this.configHandler.readVerstepConfig();

    this.versionHandler = new VersionHandler(this.config);
    this.gitHandler = new GitHandler(this.config.gitConfig);
  }

  public versionBump(type: UpgradeType) {
    const newVersion: string = this.versionHandler.upgrade(type);
    const gitUser: string = this.gitHandler.getUsername();

    this.configHandler.updateVerstepConfig({ version: newVersion }, gitUser);
    npmUpgradeVersion(newVersion);
    this.gitHandler.completeFlow(newVersion, true, Envronments.dev);
  }

  public rollback(environment: Envronments): void {
    const lastCommit = this.gitHandler.readLastCommit();
    const wasVersionCommit = this.versionHandler.validateVersionFormat(lastCommit);

    if (!wasVersionCommit) {
      console.error(
        `The last commit wan not a version commit, rollback cannot be made. Last commit: ${lastCommit}`
      );
      return;
    }

    this.gitHandler.rollback(Envronments.dev);

    console.log('Rollback done sucessfully');
  }

  public reset(): void {
    this.configHandler.createVerstepConfig();
  }

  public version(): void {
    const version: string = this.versionHandler.getVersion();
    console.log(version);
  }
}
