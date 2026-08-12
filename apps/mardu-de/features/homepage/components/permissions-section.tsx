'use client';

import { StickyStorySection } from '@mardu/sections';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { permissionsStory } from '../homepage-content';
import {
  PermissionsEmbeddedPreview,
  type PermissionsPreviewVariant,
} from './permissions-embedded-preview';

const previewVariants: Record<string, PermissionsPreviewVariant> = {
  identities: 'identities',
  events: 'events',
  'access-points': 'access-points',
};

export function PermissionsSection() {
  return (
    <StickyStorySection
      id="berechtigungen"
      eyebrow="[03] Identität und Berechtigung"
      title={
        <>
          Zentral geändert. <EditorialAccent>Am Zugang wirksam.</EditorialAccent>
        </>
      }
      intro={
        <p>
          Personen, Rollen und Qualifikationen zentral verwalten. Am Zugang wird daraus Freigabe
          oder Ablehnung.
        </p>
      }
      items={permissionsStory}
      nextSectionId="nutzen"
      compact
      motionMode="continuous"
      renderMedia={(item) => (
        <PermissionsEmbeddedPreview variant={previewVariants[item.id] ?? 'identities'} />
      )}
    />
  );
}
