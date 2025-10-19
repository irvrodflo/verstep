import * as fs from 'fs';
import * as path from 'path';

export function writeFile(relativePath: string, content: string): boolean {
  const fullPath = path.resolve(process.cwd(), relativePath);

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' });
    return true;
  } catch (error) {
    console.error('Error trying to write file:', error);
    return false;
  }
}

export function readFile(relativePath: string): string[] {
  const fullPath = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  return content.split(/\r?\n/);
}
