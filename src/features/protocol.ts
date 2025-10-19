import { upgradeVersion } from './upgrade-version';
import { gitProtocol } from '../git-handler';
import { UpgradeType } from '../interfaces';
import { npmUpgradeVersion } from '../utils';
import { readVerstepConfig } from '../config-handler';

export function executeProtocol(type: UpgradeType) {
  const path: string = readVerstepConfig().path;

  if (path === '') {
    console.error('File path non specified');
    return;
  }

  const newVersion = upgradeVersion(type, path);

  if (!newVersion) return;

  npmUpgradeVersion(newVersion);

  const displayVersion: string = `v${newVersion}`;

  gitProtocol(displayVersion);
}
