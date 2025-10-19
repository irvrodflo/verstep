import * as fs from 'fs';

export function writeFile(route: string, content: string): boolean {
  try {
    fs.writeFileSync(route, content, { encoding: 'utf8' });
    return true;
  } catch (error) {
    console.error('Error trying to write file:', error);
    return false;
  }
}

export function readFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.split(/\r?\n/);
}
