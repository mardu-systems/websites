import type {FaqItem} from "@/components/utilities/faq";

export const faqItems: FaqItem[] = [
    {
        question: "Wie viele Geräte brauche ich?",
        answer: (
            <>
                Das hängt von eurer Einrichtung ab. Mit unserem{" "}
                <a
                    href="/configurator"
                    className="text-primary hover:underline"
                >
                    Konfigurator
                </a>{" "}
                könnt ihr schnell und einfach berechnen, wie viele Geräte für euch sinnvoll sind.
            </>
        ),
    },
    {
        question: "Wie bekomme ich die Geräte?",
        answer: (
            <>
                Aktuell befindet sich das System noch in der Erprobungsphase und ist deshalb
                noch nicht offiziell zertifiziert. Wir führen jedoch Testphasen mit ausgewählten
                Partnern durch. So helft ihr uns bei der Weiterentwicklung, während ihr
                vergünstigten Zugriff auf das <strong>mardu.space</strong>-System erhaltet.
                Meldet euch bei Interesse einfach unter{" "}
                <a
                    href="mailto:info@mardu.de"
                    className="text-primary hover:underline"
                >
                    info@mardu.de
                </a>
                .
            </>
        ),
    },
    {
        question: "Wir sind ein gemeinnütziger Verein – gibt es Vergünstigungen?",
        answer: (
            <>
                Ja! Da wir selbst aus einem gemeinnützigen Makerspace entstanden sind, wissen
                wir, wie knapp Budgets oft sind. Deshalb bieten wir das System für Vereine zu
                deutlich vergünstigten Konditionen an.
                Zusätzlich könnt ihr Gehäuse kostensparend auf euren eigenen 3D-Druckern fertigen.
            </>
        ),
    },
    {
        question: "Gibt es Datenblätter für die Geräte?",
        answer: (
            <>
                Ja, technische Datenblätter existieren bereits. Diese veröffentlichen wir jedoch
                erst, sobald die Geräte offiziell in den Verkauf gehen.
                Falls ihr vorab Interesse habt oder Fragen klären möchtet, schreibt uns gerne an{" "}
                <a
                    href="mailto:info@mardu.de"
                    className="text-primary hover:underline"
                >
                    info@mardu.de
                </a>
                .
            </>
        ),
    },
    {
        question: "Welche Komponenten umfasst das System?",
        answer: "Zum System gehören ein Gateway und mehrere Zugriffspunkte.",
    },
    {
        question: "Funktioniert das System ohne Internetverbindung?",
        answer: "Ja, alle Berechtigungen werden offline im Gateway gespeichert.",
    },
    {
        question: "Wann sind die Produkte verfügbar?",
        answer: "Die ersten Produkte sind demnächst erhältlich und können vorgemerkt werden.",
    },
    {
        question: "Kann ich meine Badges in anderen Makerspaces verwenden?",
        answer: (
            <>
                Ja, die Schulungsnachweise basieren auf Open Educational Badges, die europaweit anerkannt sind.
                Wenn ein anderer Makerspace ebenfalls mardu.space einsetzt, kannst du deine einmal erworbenen Badges
                dort weiterverwenden.
            </>
        ),
    },
];
