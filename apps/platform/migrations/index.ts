import * as migration_20260402_200045 from './20260402_200045';

export const migrations = [
  {
    up: migration_20260402_200045.up,
    down: migration_20260402_200045.down,
    name: '20260402_200045'
  },
];

export default migrations;