'use client';

import { Card, CardContent } from '@mardu/ui/components/card';
import type { State } from '../page';

export default function SummaryStep({ state }: { state: State }) {
  return (
    <section>
      <Card className="rounded-none border-black/10 bg-card shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
            Zusammenfassung
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Field label="Drehstrom‑Maschinen" value={`${state.triMachines.count}`} />
            <Field label="Schuko‑Maschinen" value={`${state.schukoMachines.count}`} />
            <Field label="Eingangstüren" value={`${state.doors.count}`} />
            <Field label="Elektrische Tore" value={`${state.gates.count}`} />
            <Field label="Kühlschränke" value={`${state.fridges.count}`} />
            <Field label="Zentrale Räume" value={`${state.centralRooms.count}`} />
          </div>

          <p className="mt-4 text-sm text-foreground/68">
            Kontaktdaten werden im nächsten Schritt abgefragt.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border border-black/10 bg-muted/20 p-4">
      <div className="mb-1 text-[11px] uppercase tracking-[0.14em] text-foreground/50">{label}</div>
      <div className="font-semibold break-words tabular-nums text-foreground">{value}</div>
    </div>
  );
}
