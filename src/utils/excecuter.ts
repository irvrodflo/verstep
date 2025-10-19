import { exec, execSync } from 'child_process';

export function executeAsync(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`${command} > /dev/null 2>&1`, (err, stdout, stderr) => {
      if (err || stderr) {
        reject(err || stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

export function executeSync(command: string): string | null {
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    return output.trim();
  } catch (error) {
    console.log(`Error into excecute "${command}":`, (error as Error).message);
    return null;
  }
}
