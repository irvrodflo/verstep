import { UpgradeType, CliOperations, Envronments } from './interfaces';
import { Verstep } from './verstep';

function main() {
  const args = process.argv.slice(2);
  const verstep: Verstep = new Verstep();

  if (args.length === 0) {
    console.log('Use: verstep <up|rollback|sync|reset|version>');
    process.exit(0);
  }

  const operation: CliOperations = args[0] as CliOperations;

  if (operation === CliOperations.version) {
    verstep.version();
    process.exit(0);
  }

  if (operation === CliOperations.reset) {
    verstep.reset();
    process.exit(0);
  }

  if (operation === CliOperations.rollback) {
    const environment: Envronments = (args[1] || Envronments.dev) as Envronments;
    verstep.rollback(environment);
    process.exit(0);
  }

  if (args.length === 1 && operation === CliOperations.upgrade) {
    console.log('Use: --patch (default) | --minor | --major');
    process.exit(0);
  }

  if (operation === CliOperations.upgrade) {
    const type: UpgradeType = args[1] as UpgradeType;
    console.log(type);
    verstep.versionBump(type);
    process.exit(0);
  }
}

main();
