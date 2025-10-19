import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

import { defaultConfig } from './default-config';
import { createVerstepConfig } from './setup-config';
import { VerstepConfig } from '../interfaces';

export function readVerstepConfig(folderPath: string = process.cwd()): VerstepConfig {
  const filePath = join(folderPath, 'verstep.json');

  if (!existsSync(filePath)) {
    console.warn(`verstep.json not found at ${filePath}, one will be generate`);
    createVerstepConfig();
    return defaultConfig;
  }

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const config: VerstepConfig = JSON.parse(raw);
    return config;
  } catch (error) {
    console.error(`Error trying to read verstep.json: ${(error as Error).message}`);
    return defaultConfig;
  }
}
