import { StickyStorySection } from '@mardu/sections';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { permissionsStory } from '../homepage-content';

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
    />
  );
}
