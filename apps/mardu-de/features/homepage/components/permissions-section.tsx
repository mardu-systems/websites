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
          Eine Identität. <EditorialAccent>Klare Berechtigungen.</EditorialAccent> Viele Zugänge.
        </>
      }
      intro={
        <p>
          Verantwortliche ordnen Personen, Rollen, Qualifikationen und Bereiche zentral zu.{' '}
          <strong className="font-medium text-foreground/82">
            Am Zugangspunkt wird daraus eine verständliche Entscheidung
          </strong>{' '}
          – passend zur jeweiligen Ressource und zum vereinbarten Betriebsmodell.
        </p>
      }
      items={permissionsStory}
      nextSectionId="nutzen"
      compact
    />
  );
}
