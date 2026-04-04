import * as migration_20260402_200045 from './20260402_200045';
import * as migration_20260404_161830_add_roadmap_items from './20260404_161830_add_roadmap_items';

export const migrations = [
  {
    up: migration_20260402_200045.up,
    down: migration_20260402_200045.down,
    name: '20260402_200045',
  },
  {
    up: migration_20260404_161830_add_roadmap_items.up,
    down: migration_20260404_161830_add_roadmap_items.down,
    name: '20260404_161830_add_roadmap_items',
  },
];

export default migrations;
