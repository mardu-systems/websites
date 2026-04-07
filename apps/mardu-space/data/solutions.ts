import type { SolutionDetailDto, SolutionListItemDto } from '@mardu/content-core';

export const solutions: SolutionDetailDto[] = [
  {
    id: 'unternehmenswerkstaetten',
    slug: 'unternehmenswerkstaetten',
    title: 'Unternehmenswerkstätten',
    tagline: 'Maschinen, Räume und Verantwortung so ordnen, dass Werkstattbetrieb nicht an Einzelabsprachen hängt.',
    summary:
      'Wenn mehrere Teams, Schichten und Maschinen zusammenkommen, reicht Schlüsselverwaltung nicht mehr. Mardu verbindet Zutritt, Freigabe und Nachweis zu einem belastbaren Werkstattbetrieb.',
    imageUrl: '/_A7_9094_quer.jpg',
    imageAlt: 'Werkstattumgebung mit digital gesteuerter Maschinenfreigabe',
    badge: 'Lösung',
    themeTone: 'forest',
    heroTitle: 'Werkstattbetrieb, der auch unter Last geordnet bleibt.',
    heroIntro:
      'Für Unternehmenswerkstätten, in denen mehrere Personen, Maschinen und Sicherheitsanforderungen gleichzeitig koordiniert werden müssen.',
    problemTitle: 'Zwischen Schlüsselausgabe und echter Betriebslogik liegt meist eine gefährliche Lücke.',
    problemBody:
      'In Unternehmenswerkstätten reicht es nicht, Räume nur aufzuschließen. Entscheidend ist, wer welche Maschine unter welchen Bedingungen nutzen darf, wie Verantwortung dokumentiert wird und wie sich Regeln im Alltag tatsächlich durchsetzen lassen.

Mardu verbindet diese operative Ebene mit einer technischen Freigabelogik. So werden Unterweisungen, Rollen und Maschinenzustände nicht getrennt verwaltet, sondern als zusammenhängender Betriebsablauf sichtbar.',
    heroImageUrl: '/_A7_9094_quer.jpg',
    heroImageAlt: 'Unternehmenswerkstatt mit Maschinen und geregeltem Zugang',
    contentBlocks: [
      {
        id: 'werkstatt-zutritt',
        eyebrow: 'Zutritt & Zonen',
        title: 'Zutritt endet nicht an der Tür.',
        body:
          'Werkstattbereiche, Materiallager und Maschinenzonen haben unterschiedliche Risiken. Deshalb müssen Freigaben nicht nur nach Person, sondern auch nach Ort und Zweck steuerbar sein.

Mardu macht daraus eine klare Zutrittslogik, die auf reale Verantwortlichkeiten statt auf lose Schlüsselausgabe reagiert.',
        imageUrl: '/configurator/tuer.jpg',
        imageAlt: 'Türsituation als Beispiel für zonierten Werkstattzutritt',
        imageSide: 'right',
      },
      {
        id: 'werkstatt-maschinen',
        eyebrow: 'Maschinen',
        title: 'Maschinenfreigaben werden nachvollziehbar statt improvisiert.',
        body:
          'Gerade in Unternehmenswerkstätten laufen Maschinen unterschiedlich kritischer Klassen nebeneinander. Manche brauchen nur eine einfache Freigabe, andere klare Voraussetzungen und belastbare Nachweise.

Mit Mardu lässt sich diese Logik direkt an der Maschine abbilden, statt sie nur organisatorisch zu erwarten.',
        imageUrl: '/configurator/32a.jpg',
        imageAlt: 'Leistungsstarke Maschine als Beispiel für kontrollierte Freigabe',
        imageSide: 'left',
      },
    ],
    ctaLabel: 'Werkstattlösung besprechen',
    ctaHref: '/configurator',
  },
  {
    id: 'labore',
    slug: 'labore',
    title: 'Labore',
    tagline: 'Zugang, Gerätefreigabe und Nutzergruppen in sensiblen Umgebungen kontrolliert zusammenführen.',
    summary:
      'Labore brauchen mehr als Raumzutritt. Entscheidend ist, dass Gerätezugang, Berechtigungen und dokumentierte Verantwortung sauber zusammenlaufen.',
    imageUrl: '/configurator/fridge.jpg',
    imageAlt: 'Labornahe Kühl- oder Gerätesituation als Beispiel für kontrollierten Zugriff',
    badge: 'Lösung',
    themeTone: 'mist',
    heroTitle: 'Laborzugang mit echter Betriebsdisziplin statt bloßer Raumöffnung.',
    heroIntro:
      'Für Labore, in denen sensible Geräte, wechselnde Nutzergruppen und nachvollziehbare Freigaben gemeinsam gedacht werden müssen.',
    problemTitle: 'Im Labor ist nicht nur wichtig, wer hinein darf, sondern wer welches Gerät verantwortbar bedienen darf.',
    problemBody:
      'Zwischen Hochschullabor, Unternehmenslabor und Prüfbereich unterscheiden sich Prozesse stark. Gleich bleibt aber die Anforderung, Zutritt, Gerätezugang und Verantwortlichkeit nicht voneinander zu trennen.

Mardu schafft dafür eine operative Struktur, in der Regeln vor Ort wirksam werden und Nachweise nicht erst nachträglich zusammengesucht werden müssen.',
    heroImageUrl: '/configurator/fridge.jpg',
    heroImageAlt: 'Laborgerät als Beispiel für kontrollierten Zugang und Freigabe',
    contentBlocks: [
      {
        id: 'labore-rollen',
        eyebrow: 'Rollen',
        title: 'Verschiedene Nutzergruppen lassen sich präzise abbilden.',
        body:
          'Studierende, Laborleitungen, technische Dienste und externe Partner brauchen oft nicht dieselben Rechte. Eine funktionierende Laborlösung muss diese Unterschiede im Betrieb tragen können.

Mardu hilft dabei, Zugänge, Qualifikation und Nutzungsszenarien sauber zu staffeln.',
        imageUrl: '/device/near.jpg',
        imageAlt: 'Nahaufnahme eines Zugriffspunktes für labornahe Identifikation',
        imageSide: 'right',
      },
      {
        id: 'labore-nachweis',
        eyebrow: 'Nachweise',
        title: 'Dokumentation entsteht aus dem Prozess statt aus Nacharbeit.',
        body:
          'Wenn Vorfälle, Audits oder Rückfragen auftreten, reicht es nicht zu wissen, dass ein Raum offen war. Relevant ist, welche Person zu welchem Zeitpunkt welche Freigabe tatsächlich genutzt hat.

Genau diese operative Sichtbarkeit ist für Labore entscheidend.',
        imageUrl: '/gateway/inside.jpg',
        imageAlt: 'Technikraum als Symbol für nachvollziehbare Laborinfrastruktur',
        imageSide: 'left',
      },
    ],
    ctaLabel: 'Laborlösung anfragen',
    ctaHref: '/contact?source=contact-form',
  },
  {
    id: 'hochschulen-und-universitaeten',
    slug: 'hochschulen-und-universitaeten',
    title: 'Hochschulen & Universitäten',
    tagline: 'Campusbetrieb, Fachbereiche und Spezialräume in einer handhabbaren Zugriffslogik zusammenführen.',
    summary:
      'Zwischen Hörsaal, Labor, Werkstatt und Technikfläche braucht ein Campus andere Regeln als ein einzelnes Gebäude. Mardu integriert sich tief in Ihre Hochschullandschaft.',
    imageUrl: '/_A7_9072_quer.jpg',
    imageAlt: 'Campusnahe Gebäudesituation als Symbol für Hochschullösungen',
    badge: 'Lösung',
    themeTone: 'sand',
    heroTitle: 'Campuszugriff, der mit Organisation und Realität Schritt hält.',
    heroIntro:
      'Für Hochschulen und Universitäten, die unterschiedliche Gebäude, Rollen und Spezialflächen nicht mehr getrennt verwalten wollen – mit Anbindung an bestehende Hochschulsysteme.',
    problemTitle: 'Ein Campus funktioniert nicht wie ein einzelner Standort.',
    problemBody:
      'Zwischen Bibliothek, Fachbereich, Labor, Werkstatt und Veranstaltungsfläche entstehen sehr unterschiedliche Nutzungsmodelle. Semesterwechsel, externe Partner und wechselnde Nutzergruppen machen eine zentrale Verwaltung zwingend erforderlich.

Mardu hilft, diese Komplexität zu bewältigen. Dank moderner APIs können wir Integrationen wie Single Sign-On (SSO), Hochschul-Apps (wie UniNow) oder andere universitäre Verzeichnisdienste nahtlos anbinden.',
    heroImageUrl: '/_A7_9072_quer.jpg',
    heroImageAlt: 'Campusartige Außenansicht als Symbol für Hochschulbetrieb',
    contentBlocks: [
      {
        id: 'hochschule-flaechen',
        eyebrow: 'Flächen & Labore',
        title: 'Spezialräume bleiben Teil desselben Systems.',
        body:
          'Makerspaces, Labore und Seminarräume brauchen unterschiedliche Regeln, sollten aber zentral administriert werden können. Mardu schafft eine gemeinsame Plattform-Grundlage, auf der Fachbereiche differenziert und sicher arbeiten können, ohne Insellösungen aufzubauen.',
        imageUrl: '/configurator/tuer.jpg',
        imageAlt: 'Gebäudezugang als Symbol für fachbereichsübergreifende Hochschullogik',
        imageSide: 'right',
      },
      {
        id: 'hochschule-wechsel',
        eyebrow: 'Betrieb & Integration',
        title: 'Nahtlose Integration in die Hochschul-IT.',
        body:
          'Neue Semester und Forschungsprojekte erzeugen laufend Änderungen. Mardu reduziert diesen Druck durch automatisierte Syncs: Single Sign-On Anbindungen und Schnittstellen zu Campus-Apps wie UniNow sorgen dafür, dass Studierende und Mitarbeiter ohne manuellen Aufwand immer die richtigen Rechte haben.',
        imageUrl: '/gateway/mounted.jpg',
        imageAlt: 'Montiertes Gateway als Symbol für campusweite Steuerung',
        imageSide: 'left',
      },
    ],
    ctaLabel: 'Campuslösung besprechen',
    ctaHref: '/contact?source=contact-form',
  },
  {
    id: 'schulen-und-ausbildungszentren',
    slug: 'schulen-und-ausbildungszentren',
    title: 'Schulen & Ausbildungszentren',
    tagline: 'Werkstätten, Fachräume und Außenzeiten ohne Schlüssellogik organisieren.',
    summary:
      'Schulen und Ausbildungszentren brauchen eine Lösung, die Sicherheit, Aufsicht und praktische Nutzung gleichzeitig trägt.',
    imageUrl: '/device/tor-2.jpg',
    imageAlt: 'Zutrittspunkt als Symbol für Schulen und Ausbildungszentren',
    badge: 'Lösung',
    themeTone: 'clay',
    heroTitle: 'Fachräume und Werkstätten bleiben nutzbar, ohne unklar zu werden.',
    heroIntro:
      'Für Schulen und Ausbildungszentren, die Räume, Werkstätten und Verantwortlichkeiten jenseits klassischer Schlüsselprozesse organisieren wollen.',
    problemTitle: 'Gerade in Bildungseinrichtungen treffen Offenheit und Aufsichtspflicht direkt aufeinander.',
    problemBody:
      'Räume sollen nutzbar bleiben, aber nicht beliebig offen sein. Werkstätten und Fachräume müssen zugänglich sein, ohne dass Verantwortung und Nachvollziehbarkeit verschwimmen.

Mardu hilft, diese Spannung nicht mit Improvisation, sondern mit klaren Regeln und technischer Durchsetzung zu lösen.',
    heroImageUrl: '/device/tor-2.jpg',
    heroImageAlt: 'Lokaler Zutrittspunkt als Symbol für geregelte Fachraumzugänge',
    contentBlocks: [
      {
        id: 'schule-fachraeume',
        eyebrow: 'Fachräume',
        title: 'Zugang folgt dem Nutzungskontext statt dem Schlüsselbund.',
        body:
          'Nicht jede Lerngruppe braucht zu jeder Zeit Zugriff auf denselben Bereich. Gleichzeitig sollen Lehrkräfte und Verwaltung nicht in Sonderabsprachen ersticken.

Mardu bildet diese Unterschiede in einer ruhigen, belastbaren Zugriffslogik ab.',
        imageUrl: '/configurator/tuer.jpg',
        imageAlt: 'Fachraumzugang als Beispiel für zeitlich und organisatorisch geregelten Zutritt',
        imageSide: 'left',
      },
      {
        id: 'schule-werkstatt',
        eyebrow: 'Werkstattbetrieb',
        title: 'Geräte und Maschinen lassen sich pädagogisch und technisch absichern.',
        body:
          'Gerade in Ausbildungswerkstätten genügt es nicht, nur Türen zu öffnen. Relevant ist, ob Personen eingewiesen sind, wer Verantwortung trägt und wie Freigaben vor Ort umgesetzt werden.

Damit wird Betrieb planbar, ohne unpraktisch zu werden.',
        imageUrl: '/configurator/device.jpg',
        imageAlt: 'Maschinennahe Situation als Symbol für Ausbildungswerkstätten',
        imageSide: 'right',
      },
    ],
    ctaLabel: 'Bildungslösung besprechen',
    ctaHref: '/contact?source=contact-form',
  },
  {
    id: 'makerspaces-und-offene-werkstaetten',
    slug: 'makerspaces-und-offene-werkstaetten',
    title: 'Makerspaces & Hochschul-Werkstätten',
    tagline: 'Sicherheit ohne ständige Aufsicht: Maschinenfreigaben technisch durchsetzen.',
    summary:
      'Makerspaces an Hochschulen und Vereinen leben vom praktischen Arbeiten. Mardu ermöglicht Offenheit und schützt gleichzeitig vor Unfällen und Schließungen.',
    imageUrl: '/_A7_9094_quer.jpg',
    imageAlt: 'Offene Werkstatt als Symbol für Makerspace-Betrieb',
    badge: 'Lösung',
    themeTone: 'forest',
    heroTitle: 'Sicherheit ist kein Widerspruch zu kreativer Entfaltung.',
    heroIntro:
      'Für Makerspaces, die ihre Maschinen pädagogisch wertvoll, aber technisch absolut sicher freigeben wollen – auch am Abend oder Wochenende.',
    problemTitle: 'Sicherheit ohne Aufsicht: Der Schlüssel zur Eigenverantwortung.',
    problemBody:
      'Werkzeugmaschinen wie Fräsen oder Lasercutter sind gefährlich. Die Verantwortung liegt am Ende oft bei der Aufsichtsperson – auch um 19 Uhr oder am Wochenende. Ein schwerer Ernstfall kann zur endgültigen Schließung des Ortes führen.

Anstatt auf manuelle Kontrolle durch ständig anwesendes Personal zu setzen, fokussiert sich Mardu auf technische Durchsetzung: Berechtigungen sind strikt personenbezogen. Einweisungen werden bei jedem Maschinenstart aktiv überprüft. Solange keine gültige Qualifikation vorliegt, startet die Maschine schlichtweg nicht.',
    heroImageUrl: '/_A7_9094_quer.jpg',
    heroImageAlt: 'Werkstattumgebung als Symbol für offene Werkstattstrukturen',
    contentBlocks: [
      {
        id: 'makerspace-trager',
        eyebrow: 'Erweiterte Öffnungszeiten',
        title: 'Zutritt auch außerhalb der Kernzeiten.',
        body:
          'Mit Mardu ist der Zutritt auch am Wochenende oder abends problemlos möglich. Personen mit entsprechender Freigabe betreten den Makerspace sicher, ohne dass jemand manuell aufschließen muss. Gastzugänge oder Semesterrollen lassen sich in Sekunden anlegen und entziehen.',
        imageUrl: '/device/near.jpg',
        imageAlt: 'Identifikation am Zugriffspunkt als Symbol für Mitgliederbetrieb',
        imageSide: 'right',
      },
      {
        id: 'makerspace-einweisung',
        eyebrow: 'Technische Durchsetzung',
        title: 'Einweisungen werden vor Ort zur harten Regel.',
        body:
          'Nicht jede eingewiesene Person darf jede Maschine jederzeit nutzen. Die Mardu Access Points (NFC/RFID) oder Smart Akteure (QR-Code) prüfen direkt an der Maschine die Qualifikation. Die Leitungsebene behält den vollen Überblick über Protokolle und Maschinenstatus, ohne permanent vor Ort sein zu müssen. So bleibt der Space sicher und offen.',
        imageUrl: '/configurator/schuko.jpg',
        imageAlt: 'Maschinennahe Stromfreigabe als Symbol für offene Werkstattprozesse',
        imageSide: 'left',
      },
    ],
    ctaLabel: 'Makerspace-Pilot anfragen',
    ctaHref: '/contact?source=contact-form',
  },
  {
    id: 'vereine-und-community-spaces',
    slug: 'vereine-und-community-spaces',
    title: 'Vereine & Community-Spaces',
    tagline: 'Gemeinschaftliche Nutzung organisieren, ohne dass Verwaltung an Ehrenamt und Einzelwissen hängt.',
    summary:
      'Wenn mehrere Personen Verantwortung teilen, braucht der Betrieb einfache Prozesse mit klaren Regeln. Mardu macht genau diese Mischung aus Offenheit und Ordnung tragfähig.',
    imageUrl: '/configurator/tor.jpg',
    imageAlt: 'Zugangsbereich als Symbol für gemeinschaftlich genutzte Räume',
    badge: 'Lösung',
    themeTone: 'mist',
    heroTitle: 'Gemeinschaftliche Nutzung bleibt handhabbar, wenn Zuständigkeiten nicht implizit bleiben.',
    heroIntro:
      'Für Vereine und Community-Spaces, die Räume, Geräte und Schlüsselprozesse aus dem Ehrenamtsmodus herausholen wollen.',
    problemTitle: 'Viele Community-Orte scheitern nicht an Technik, sondern an zu viel implizitem Wissen.',
    problemBody:
      'Wer darf wann hinein, wer gibt Träger aus, wer kann Räume freigeben und was passiert bei Schlüsselverlust? In vielen Vereinen liegen diese Antworten verteilt bei einzelnen Personen.

Mardu hilft, daraus eine klare, gemeinsame Betriebsgrundlage zu machen.',
    heroImageUrl: '/configurator/tor.jpg',
    heroImageAlt: 'Tor- und Zugangsbereich als Symbol für geregelte Vereinsbetrieb',
    contentBlocks: [
      {
        id: 'verein-zustaendigkeit',
        eyebrow: 'Organisation',
        title: 'Zuständigkeiten werden sichtbarer und damit entlastender.',
        body:
          'Wenn Freigaben, Rollen und Raumzugänge nicht nur im Kopf einzelner Personen liegen, wird der Betrieb resilienter. Gerade in ehrenamtlichen Strukturen ist das entscheidend.

Mardu macht daraus keinen Bürokratielayer, sondern einen ruhigeren Alltag.',
        imageUrl: '/gateway/inside.jpg',
        imageAlt: 'Technische Infrastruktur als Symbol für verlässliche Vereinsorganisation',
        imageSide: 'left',
      },
      {
        id: 'verein-zugang',
        eyebrow: 'Zugang',
        title: 'Räume bleiben nutzbar, ohne unkontrolliert offen zu sein.',
        body:
          'Community-Orte brauchen keine maximal komplizierte Security-Sprache. Sie brauchen eine verständliche, alltagstaugliche Lösung, die Regeln zuverlässig umsetzt.

Genau dort setzt Mardu an.',
        imageUrl: '/configurator/tuer.jpg',
        imageAlt: 'Raumzugang als Symbol für geregelte Nutzung in Community-Spaces',
        imageSide: 'right',
      },
    ],
    ctaLabel: 'Community-Lösung anfragen',
    ctaHref: '/contact?source=contact-form',
  },
  {
    id: 'industrie-und-technische-betriebsraeume',
    slug: 'industrie-und-technische-betriebsraeume',
    title: 'Industrie & technische Betriebsräume',
    tagline: 'Zugriff auf Infrastruktur, Technikflächen und Anlagen so steuern, dass Betrieb und Sicherheit zusammenpassen.',
    summary:
      'In technischen Betriebsräumen braucht Zugang eine andere Qualität. Nicht jeder Zutritt ist gleich relevant, und nicht jede Fläche darf wie ein normales Büro behandelt werden.',
    imageUrl: '/gateway/mounted.jpg',
    imageAlt: 'Montiertes Gateway in technischer Umgebung als Symbol für Industrieanwendungen',
    badge: 'Lösung',
    themeTone: 'ink',
    heroTitle: 'Technische Räume brauchen Zugriff mit Betriebslogik, nicht nur Schlossersatz.',
    heroIntro:
      'Für Industrieumgebungen und technische Betriebsräume, in denen Infrastruktur, Zuständigkeit und Nachvollziehbarkeit nicht getrennt betrachtet werden können.',
    problemTitle: 'Je kritischer die Fläche, desto weniger trägt pauschaler Zutritt.',
    problemBody:
      'In Technikräumen, Energieflächen oder anfrastrukturkritischen Bereichen reicht es nicht, nur zu dokumentieren, wer einen Schlüssel hat. Relevant ist, wer tatsächlich hinein durfte, unter welchen Bedingungen und mit welcher Verantwortung.

Mardu hilft, daraus eine nachvollziehbare und technisch umsetzbare Logik zu machen.',
    heroImageUrl: '/gateway/mounted.jpg',
    heroImageAlt: 'Technischer Betriebsraum mit installierter Infrastruktur',
    contentBlocks: [
      {
        id: 'industrie-infrastruktur',
        eyebrow: 'Infrastruktur',
        title: 'Geräte, Räume und Infrastruktur bleiben in einem Bild sichtbar.',
        body:
          'Technische Umgebungen zerfallen häufig in getrennte Zuständigkeiten. Das führt dazu, dass Security, Betrieb und Administration mit unterschiedlichen Informationen arbeiten.

Mardu zieht diese Sicht wieder zusammen.',
        imageUrl: '/gateway/inside.jpg',
        imageAlt: 'Innenansicht technischer Infrastruktur als Symbol für integrierte Steuerung',
        imageSide: 'right',
      },
      {
        id: 'industrie-freigabe',
        eyebrow: 'Freigaben',
        title: 'Freigaben werden sauber umgesetzt, ohne dass lokale Praxis ignoriert wird.',
        body:
          'Gerade in technischen Betriebsräumen scheitern Systeme oft daran, dass sie nur Theorie abbilden. Mardu orientiert sich stattdessen an der tatsächlichen Betriebslogik und bringt sie in eine belastbare Form.',
        imageUrl: '/configurator/device.jpg',
        imageAlt: 'Gerätenahe Installation als Symbol für lokale Freigabe an Infrastruktur',
        imageSide: 'left',
      },
    ],
    ctaLabel: 'Industrie-Lösung besprechen',
    ctaHref: '/configurator',
  },
  {
    id: 'kommunale-einrichtungen',
    slug: 'kommunale-einrichtungen',
    title: 'Kommunale Einrichtungen',
    tagline: 'Gebäude, Flächen und wechselnde Verantwortlichkeiten in eine verlässliche Zugriffsstruktur bringen.',
    summary:
      'Kommunale Einrichtungen vereinen unterschiedliche Nutzungsmodelle unter einem organisatorischen Dach. Mardu hilft, daraus keine Sammlung von Sonderfällen werden zu lassen.',
    imageUrl: '/configurator/tuer.jpg',
    imageAlt: 'Gebäudezugang als Symbol für kommunale Einrichtungen',
    badge: 'Lösung',
    themeTone: 'sand',
    heroTitle: 'Öffentliche Räume brauchen Klarheit im Betrieb, nicht mehr Ausnahmelisten.',
    heroIntro:
      'Für kommunale Einrichtungen, bei denen mehrere Gebäude, Nutzergruppen und Zuständigkeiten unter einem organisatorischen Rahmen zusammenlaufen.',
    problemTitle: 'Kommunale Realität besteht selten aus einem einzigen Nutzungsszenario.',
    problemBody:
      'Zwischen Verwaltung, Technik, Bildung, Vereinsnutzung und öffentlichen Flächen entstehen viele Übergänge. Genau dort geraten Schlüssel- und Sonderprozessmodelle schnell an ihre Grenzen.

Mardu hilft, diese Vielfalt als klare Zugriffsstruktur zu organisieren, ohne den Betrieb unnötig zu verkomplizieren.',
    heroImageUrl: '/configurator/tuer.jpg',
    heroImageAlt: 'Öffentlicher Gebäudezugang als Symbol für kommunale Zugriffslogik',
    contentBlocks: [
      {
        id: 'kommune-standorte',
        eyebrow: 'Standorte',
        title: 'Mehrere Gebäude bleiben organisatorisch zusammenhängend.',
        body:
          'Kommunale Einrichtungen verlieren schnell Übersicht, wenn jede Fläche anders administriert wird. Eine Lösung muss Unterschiede zulassen und trotzdem auf einem gemeinsamen Rahmen beruhen.

Genau dafür ist Mardu gedacht.',
        imageUrl: '/configurator/tor.jpg',
        imageAlt: 'Tor- und Geländeübergang als Symbol für standortübergreifende Verwaltung',
        imageSide: 'left',
      },
      {
        id: 'kommune-betrieb',
        eyebrow: 'Betrieb',
        title: 'Wechselnde Verantwortlichkeiten bleiben nachvollziehbar.',
        body:
          'Hausdienst, Verwaltung, externe Dienstleister und lokale Teams arbeiten oft nacheinander oder parallel. Deshalb braucht es eine Lösung, die Verantwortung sichtbar macht und lokale Entscheidungen technisch stützt.

So wird der Alltag ruhiger und belastbarer.',
        imageUrl: '/device/tor-2.jpg',
        imageAlt: 'Zutrittspunkt als Symbol für geregelte Betrieb in kommunalen Einrichtungen',
        imageSide: 'right',
      },
    ],
    ctaLabel: 'Kommunale Lösung anfragen',
    ctaHref: '/contact?source=contact-form',
  },
];

export function getSolutionListItems(): SolutionListItemDto[] {
  return solutions;
}

export function getSolutionBySlug(slug: string): SolutionDetailDto | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export function getSolutionSlugs(): string[] {
  return solutions.map((solution) => solution.slug);
}
