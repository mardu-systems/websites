'use client';

import { useState } from 'react';
import { Button } from '@mardu/ui/components/button';
import { cn } from '@mardu/ui/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@mardu/ui/components/dialog';
import type { VariantProps } from '@mardu/ui/lib/cva';
import { buttonVariants } from '@mardu/ui/components/button';
import NewsletterSignupForm from './newsletter-signup-form';

export default function NewsletterButton({
  primaryButtonText,
  className,
  variant = 'default',
  size = 'default',
}: {
  primaryButtonText: string;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={cn('w-full sm:w-auto', className)}>
          {primaryButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Anmelden</DialogTitle>
          <DialogDescription>
            Unser kostenloser Newsletter informiert Sie regelmäßig über Produktneuheiten und
            Sonderaktionen.
          </DialogDescription>
        </DialogHeader>
        <NewsletterSignupForm onSuccess={() => window.setTimeout(() => setOpen(false), 1600)} />
      </DialogContent>
    </Dialog>
  );
}
