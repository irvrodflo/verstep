import { writeFileSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';

import { defaultConfig } from './default-config';
import { VerstepConfig } from '../interfaces';
import { getGitUserName } from '../git-handler';

export function createVerstepConfig() {
  const filePath = join(process.cwd(), 'verstep.json');

  const currentData: VerstepConfig = {
    ...defaultConfig,
    lastUpdated: {
      madeBy: getGitUserName(),
      date: new Date().toISOString(),
    },
  };

  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }

  writeFileSync(filePath, JSON.stringify(currentData, null, 2) + '\n', 'utf-8');
  console.log(`verstep.json created successfully ${filePath}`);
}

export function buildConfig(config: VerstepConfig) {
  const filePath = join(process.cwd(), 'verstep.json');

  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }

  writeFileSync(filePath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  console.log(`verstep.json created successfully ${filePath}`);
}
