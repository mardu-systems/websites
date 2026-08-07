'use client';

import * as React from 'react';
import { Input } from '@mardu/ui/components/input';

export default function NumberStep({
  value,
  onChange,
  note,
  ariaLabel = 'Anzahl',
}: {
  value: number;
  onChange: (v: number) => void;
  note?: string;
  ariaLabel?: string;
}) {
  const clamp = (input: number) => Math.max(0, Math.min(999, input));

  return (
    <>
      {note && (
        <div className="mb-4 w-fit border border-black/10 bg-muted/35 px-4 py-3 text-sm text-foreground/72">
          {note}
        </div>
      )}
      <div className="mx-auto w-full max-w-xl">
        <div className="flex flex-col items-stretch justify-center gap-4">
          <div className="border border-black/10 bg-background transition-colors focus-within:border-foreground/18">
            <Input
              type="text"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              aria-label={ariaLabel}
              value={value === 0 ? '' : String(value)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const raw = e.target.value;
                if (raw === '') {
                  onChange(0);
                  return;
                }
                if (/^\d+$/.test(raw)) {
                  const safe = clamp(Number(raw));
                  onChange(safe);
                }
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                const normalized = e.target.value.replace(/[^\d]/g, '');
                const parsed = normalized ? clamp(Number(normalized)) : 0;
                onChange(parsed);
              }}
              placeholder="z. B. 3…"
              className="h-24 border-0 rounded-none px-6 text-center text-4xl font-semibold tracking-[-0.03em] shadow-none focus-visible:ring-0 focus:outline-none touch-manipulation md:text-5xl"
            />
          </div>
        </div>
        <p className="mt-3 text-center text-xs uppercase tracking-[0.12em] text-foreground/45">
          Tipp: ↑/↓ ändern ebenfalls den Wert.
        </p>
      </div>
    </>
  );
}
