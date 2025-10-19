import { readFileSync, existsSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

import { VerstepConfig } from '../interfaces';
import { defaultConfig } from '../utils/default-config';

export class ConfigHandler {
  private defaultConfig: VerstepConfig = defaultConfig;

  public readVerstepConfig(folderPath: string = process.cwd()): VerstepConfig {
    const filePath = join(folderPath, 'verstep.json');

    if (!existsSync(filePath)) {
      this.createVerstepConfig();
      return this.defaultConfig;
    }

    try {
      const raw = readFileSync(filePath, 'utf-8');
      const config: VerstepConfig = JSON.parse(raw);
      return config;
    } catch (error) {
      console.error(`Error trying to read verstep.json: ${(error as Error).message}`);
      return this.defaultConfig;
    }
  }

  public updateVerstepConfig(
    updates: Partial<VerstepConfig>,
    madeBy: string,
    folderPath: string = process.cwd()
  ) {
    const filePath = join(folderPath, 'verstep.json');

    const currentConfig = existsSync(filePath)
      ? this.readVerstepConfig(folderPath)
      : this.defaultConfig;

    const newConfig: VerstepConfig = {
      ...currentConfig,
      ...updates,
      lastUpdated: {
        madeBy: updates.lastUpdated?.madeBy || currentConfig.lastUpdated.madeBy,
        date: new Date().toISOString(),
      },
    };

    this.buildConfig(newConfig);
  }

  public createVerstepConfig(folderPath: string = process.cwd()) {
    const currentData: VerstepConfig = {
      ...this.defaultConfig,
      lastUpdated: {
        madeBy: '',
        date: new Date().toISOString(),
      },
    };
    this.buildConfig(currentData, false, folderPath);
  }

  private buildConfig(
    config: VerstepConfig,
    showMessage: boolean = true,
    folderPath: string = process.cwd()
  ) {
    const filePath = join(folderPath, 'verstep.json');
    if (existsSync(filePath)) unlinkSync(filePath);
    writeFileSync(filePath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
    if (!showMessage) return;
    console.log(`verstep.json created successfully ${filePath}`);
  }
}
