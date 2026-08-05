import * as React from 'react';
import type { State } from '../page';
import NumberStep from './number-step';
import SummaryStep from '@/app/configurator/steps/summary';
import ContactStep, { ContactSchema } from '@/app/configurator/steps/contact';

export const createSteps = (
  state: State,
  setState: React.Dispatch<React.SetStateAction<State>>,
) => [
  {
    id: 'tri',
    title: 'Wie viele Drehstrommaschinen sollen gesichert werden?',
    tip: 'Viele große Werkzeugmaschinen – wie Sägen, Fräsen, Bohrmaschinen, Drehbänke oder einige Kompressoren – laufen mit Drehstrom. Das ist ein spezielles Stromsystem mit drei Leitungen (Phasen), wie es in Werkstätten, Industriehallen oder auch in manchen Haushalten zu finden ist. Leicht erkennen lassen sich diese an den roten Stecker wie Rechts im Bild.',
    view: (
      <NumberStep
        value={state.triMachines.count}
        onChange={(v) => setState((p) => ({ ...p, triMachines: { ...p.triMachines, count: v } }))}
        ariaLabel="Anzahl Drehstrommaschinen"
      />
    ),
    hoverImg: '/configurator/32a.jpg',
    valid: (s: State) => s.triMachines.count >= 0,
  },
  {
    id: 'schuko',
    title: 'Wie viele Maschinen sind an Schuko (einphasig) angeschlossen?',
    tip: 'Eine Schukosteckdose ist die Standardsteckdose, die man aus jedem Haushalt kennt. Viele kleinere Maschinen und Werkzeuge – wie Handbohrmaschinen, Schleifer, Staubsauger oder mobile Geräte – laufen über Schuko. Diese Steckdosen liefern 230 Volt, was für Maschinen mit geringerem Strombedarf vollkommen ausreicht.',
    view: (
      <NumberStep
        value={state.schukoMachines.count}
        onChange={(v) =>
          setState((p) => ({ ...p, schukoMachines: { ...p.schukoMachines, count: v } }))
        }
        ariaLabel="Anzahl Schuko-Maschinen"
      />
    ),
    hoverImg: '/configurator/schuko.jpg',
    valid: (s: State) => s.schukoMachines.count >= 0,
  },
  {
    id: 'doors',
    title: 'Wie viele Eingangstüren sollen gesichert werden?',
    tip: 'Eingangstüren sind Hauptzugänge in ein Gebäude. Damit nur berechtigte Personen eintreten können, und das auch möglicherweise außerhalb der offiziellen Öffnungszeiten, lassen sich auch normale Türen mit unserer Hardware ausstatten. Das Elektrische Türschloss oder der Elektrische Türöffner muss dabei aber passend für die Tür gekauft werden.',
    view: (
      <NumberStep
        value={state.doors.count}
        onChange={(v) => setState((p) => ({ ...p, doors: { ...p.doors, count: v } }))}
        ariaLabel="Anzahl Eingangstüren"
      />
    ),
    hoverImg: '/configurator/tuer.jpg',
    valid: (s: State) => s.doors.count >= 0 && s.doors.cablePerDoorM >= 0,
  },
  {
    id: 'gates',
    title: 'Gibt es elektrische Tore zum Gelände?',
    tip: 'Elektrische Schiebetore schützen den äußeren Zugang zum Gelände. Um den Zugang zum Gelände für jeden Berechtigten gewährleisten zu können kann das mardu.space System auch mit diesen Verbunden werden. Hierzu muss in die Torsteuerung eingegriffen werden.',
    view: (
      <NumberStep
        value={state.gates.count}
        onChange={(v) => setState((p) => ({ ...p, gates: { ...p.gates, count: v } }))}
        ariaLabel="Anzahl elektrische Tore"
      />
    ),
    hoverImg: '/configurator/tor.jpg',
    valid: (s: State) => s.gates.count >= 0 && s.gates.cablePerGateM >= 0,
  },
  {
    id: 'fridges',
    title: 'Wie viele Getränkekühlschränke sollen mit einem Bezahlsystem ausgestattet werden?',
    tip: 'Getränkekühlschränke lassen sich mit einem elektronischen Bezahlsystem kombinieren. Nutzer können dann Getränke nur gegen genügend Geld auf dem eigenen Ausweis entnehmen.',
    view: (
      <NumberStep
        value={state.fridges.count}
        onChange={(v) => setState((p) => ({ ...p, fridges: { ...p.fridges, count: v } }))}
        note="Hinweis: Die Geräte-Integration ist aktuell noch nicht vollständig realisiert."
        ariaLabel="Anzahl Getränkekühlschränke"
      />
    ),
    hoverImg: '/configurator/fridge.jpg',
    valid: (s: State) => s.fridges.count >= 0,
  },
  {
    id: 'central',
    title: 'Wie viele Räume brauchen ein zentrales Freigabesystem?',
    tip: 'In manchen Fällen dürfen gewisse Maschinen nur unter Aufsicht bedient werden. Hierzu kann in der Nähe der Tür ein zentrales Gerät installiert werden, dass die untergeordneten Zugriffspunkte an den einzelnen Maschinen Freigegeben werden. Anwendung kann ein solches verhalten in einem Schülerlabor an einer Schule oder bei einem Kurs finden, bei dem die Schüler nur unter aufsicht eines Lehrers die Maschinen bedienen dürfen.',
    view: (
      <NumberStep
        value={state.centralRooms.count}
        onChange={(v) => setState((p) => ({ ...p, centralRooms: { ...p.centralRooms, count: v } }))}
        ariaLabel="Anzahl zentraler Freigabesysteme"
      />
    ),
    hoverImg: '/configurator/device.jpg',
    valid: (s: State) => s.centralRooms.count >= 0,
  },
  {
    id: 'summary',
    title: 'Zusammenfassung',
    tip: 'Bitte prüfen, dann absenden.',
    view: <SummaryStep state={state} />,
    valid: () => true,
  },
  {
    id: 'contact',
    title: 'Kontaktdaten für Angebot',
    tip: 'Wir verwenden die Daten ausschließlich zur Angebotserstellung.',
    view: (
      <ContactStep
        name={state.contact.name}
        email={state.contact.email}
        company={state.contact.company || ''}
        message={state.contact.message || ''}
        phone={state.contact.phone || ''}
        consent={state.contact.consent || false}
        onChange={(patch) => setState((p) => ({ ...p, contact: { ...p.contact, ...patch } }))}
      />
    ),
    valid: (s: State) => ContactSchema.safeParse(s.contact).success,
  },
];

export type Step = ReturnType<typeof createSteps>[number];
