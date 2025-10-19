import { join, resolve } from 'path';
import { writeFileSync, existsSync, unlinkSync } from 'fs';

import { defaultConfig } from './utils/default-config';

const projectRoot = process.env.INIT_CWD || resolve(process.cwd(), '../../..');
const filePath = join(projectRoot, 'verstep.json');

if (existsSync(filePath)) unlinkSync(filePath);

writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2) + '\n', 'utf-8');
