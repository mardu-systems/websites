import type { EmbeddableUserRow } from './table-presets';

export const embeddableDemoUsers = [
  ['admin', 'Admin', 'Admin', 'admin@localhost.de', 1],
  ['clara.stein@demo.mardu.local', 'Clara', 'Stein', 'clara.stein@demo.mardu.local', 0],
  ['jonas.vogel@demo.mardu.local', 'Jonas', 'Vogel', 'jonas.vogel@demo.mardu.local', 0],
  ['aylin.demir@demo.mardu.local', 'Aylin', 'Demir', 'aylin.demir@demo.mardu.local', 0],
  ['felix.hartmann@demo.mardu.local', 'Felix', 'Hartmann', 'felix.hartmann@demo.mardu.local', 0],
  ['mara.hoffmann@demo.mardu.local', 'Mara', 'Hoffmann', 'mara.hoffmann@demo.mardu.local', 0],
  ['lena.becker@demo.mardu.local', 'Lena', 'Becker', 'lena.becker@demo.mardu.local', 0],
  ['noah.wagner@demo.mardu.local', 'Noah', 'Wagner', 'noah.wagner@demo.mardu.local', 0],
  ['sofia.keller@demo.mardu.local', 'Sofia', 'Keller', 'sofia.keller@demo.mardu.local', 0],
  ['nia.bauer@demo.mardu.local', 'Nia', 'Bauer', 'nia.bauer@demo.mardu.local', 0],
  ['luis.neumann@demo.mardu.local', 'Luis', 'Neumann', 'luis.neumann@demo.mardu.local', 0],
  ['emma.schulz@demo.mardu.local', 'Emma', 'Schulz', 'emma.schulz@demo.mardu.local', 0],
].map(([userName, firstName, lastName, email, tagCount], index) => ({
  id: `demo-user-${index + 1}`,
  userName: String(userName),
  firstName: String(firstName),
  lastName: String(lastName),
  email: String(email),
  emailConfirmed: true,
  status: 'active' as const,
  tagCount: Number(tagCount),
})) satisfies readonly EmbeddableUserRow[];
