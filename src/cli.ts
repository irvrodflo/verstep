#!/usr/bin/env node

import { createVerstepConfig } from './config-handler/setup-config';
import { rollback, executeProtocol } from './features';
import { CliOperations, UpgradeType } from './interfaces/cli.interface';

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Use: verstep <up|rollback|sync|reset>');
    process.exit(1);
  }

  const operation: CliOperations = args[0] as CliOperations;

  if (operation === CliOperations.reset) {
    createVerstepConfig();
    process.exit(1);
  }

  if (operation === CliOperations.rollback) {
    rollback();
    process.exit(1);
  }

  if (args.length === 1 && operation === CliOperations.update) {
    console.log('Use: --patch (default) | --minor | --major');
    process.exit(1);
  }

  if (operation === CliOperations.update) {
    const type: UpgradeType = args[1] as UpgradeType;
    //executeProtocol(type);
    process.exit(1);
  }
}

main();
