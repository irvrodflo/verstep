import { join, resolve } from 'path';
import { writeFileSync, existsSync, unlinkSync } from 'fs';

import { DEFAULT_CONFIG } from './utils/default-config';

const projectRoot = process.env.INIT_CWD || resolve(process.cwd(), '../../..');
const filePath = join(projectRoot, 'verstep.json');

if (existsSync(filePath)) unlinkSync(filePath);

writeFileSync(filePath, JSON.stringify(DEFAULT_CONFIG, null, 2) + '\n', 'utf-8');
