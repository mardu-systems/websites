'use client';

import React from 'react';
import { HelpCircle, Search, UserRound } from 'lucide-react';
import Link from 'next/link';

export const TOPBAR_HEIGHT = 36; // px, corresponds to Tailwind h-9

interface TopbarProps {
  showSearch?: boolean;
  showAccount?: boolean;
  showHelp?: boolean;
  salesPhone?: string;
}

export default function Topbar({
  showSearch = true,
  showAccount = true,
  showHelp = true,
  salesPhone = '+49 176 200 00 00',
}: TopbarProps) {
  return (
    <div
      className="dark bg-neutral-800 border-b border-border text-foreground"
      style={{ height: TOPBAR_HEIGHT }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-end gap-4 px-4 sm:px-6">
        {salesPhone && (
          <span className="hidden md:inline text-xs text-muted-foreground">
            Sales: {salesPhone}
          </span>
        )}
        <div className="flex items-center gap-1">
          {showHelp && (
            <Link
              aria-label="Help"
              className="p-2 -m-2 rounded hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
              href="/help"
            >
              <HelpCircle size={16} />
            </Link>
          )}
          {showSearch && (
            <Link
              aria-label="Search"
              className="p-2 -m-2 rounded hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
              href="/search"
            >
              <Search size={16} />
            </Link>
          )}
          {showAccount && (
            <Link
              aria-label="Account"
              className="p-2 -m-2 rounded hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
              href="/account"
            >
              <UserRound size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
