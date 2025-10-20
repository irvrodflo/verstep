import { GitConfig } from '../interfaces';

import { executeSync } from '../utils';

export class GitHandler {
  private config: GitConfig;

  constructor(config: GitConfig) {
    this.config = config;
  }

  public completeFlow(
    commit: string,
    withTag: boolean,
    environment: 'dev' | 'prod'
  ): void {
    const { pull, push } = this.config!;

    if (pull) {
      this.pull(environment);
    }

    this.add();
    this.commit(commit);

    if (withTag) {
      this.tag(commit);
    }

    if (push) {
      this.push(environment);
    }

    console.log('Git protocol made successfully');
  }

  public pull(environment: 'dev' | 'prod'): void {
    const { developBranch, productionBranch, remoteName } = this.config!;
    const branch: string = environment === 'dev' ? developBranch : productionBranch;

    this.gitExcecute(`pull ${remoteName} ${branch}`);
  }

  public add(): void {
    this.gitExcecute('add .');
  }

  public commit(rawMessage: string): void {
    const message: string = rawMessage.replace(/'/g, "\\'");
    this.gitExcecute(`commit -m "${message}"`);
  }

  public tag(mark: string): void {
    this.gitExcecute(`tag ${mark}`);
  }

  public push(environment: 'dev' | 'prod'): void {
    const { remoteName, developBranch, productionBranch, forcePush } = this.config!;

    const forceFlag: string = forcePush ? '--force-with-lease' : '';
    const branch: string = environment === 'dev' ? developBranch : productionBranch;
    const command: string = `push ${remoteName} ${branch} ${forceFlag}`;

    this.gitExcecute(command);
  }

  public rollback(environment: 'dev' | 'prod', push: boolean = false) {
    this.gitExcecute('reset --hard HEAD~1');

    if (!push) return;

    this.push(environment);
  }

  public readLastCommit(): string {
    return this.gitExcecute('log -1 --pretty=%s') || '';
  }

  public getUsername(): string {
    return this.gitExcecute('config user.name') || '';
  }

  public readTag(): string {
    return this.gitExcecute('describe --tags') || '';
  }

  private gitExcecute(command: string): string | null {
    const gitCommand: string = `git ${command}`;
    return executeSync(gitCommand);
  }
}
