import * as migration_20260402_200045 from './20260402_200045';
import * as migration_20260404_161830_add_roadmap_items from './20260404_161830_add_roadmap_items';
import * as migration_20260421_085300_add_catalog_solutions from './20260421_085300_add_catalog_solutions';
import * as migration_20260602_080745 from './20260602_080745';
import * as migration_20260806_135157_retire_legacy_site from './20260806_135157_retire_legacy_site';

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
  {
    up: migration_20260421_085300_add_catalog_solutions.up,
    down: migration_20260421_085300_add_catalog_solutions.down,
    name: '20260421_085300_add_catalog_solutions',
  },
  {
    up: migration_20260602_080745.up,
    down: migration_20260602_080745.down,
    name: '20260602_080745',
  },
  {
    up: migration_20260806_135157_retire_legacy_site.up,
    down: migration_20260806_135157_retire_legacy_site.down,
    name: '20260806_135157_retire_legacy_site'
  },
];

export default migrations;
