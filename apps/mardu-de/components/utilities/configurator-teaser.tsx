'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Settings, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';

interface ConfiguratorTeaserProps {
  className?: string;
}

export default function ConfiguratorTeaser({ className }: ConfiguratorTeaserProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={cn('w-full py-20 px-4 md:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary/10 border border-secondary/20">
            
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-75 h-75 bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 p-8 md:p-12 lg:p-20 items-center">
              
              {/* Content Side */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider border border-accent/10">
                  <Settings className="w-3.5 h-3.5" />
                  Interaktiver Konfigurator
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  Planen Sie Ihr System <span className="text-primary">individuell</span>
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Ermitteln Sie in wenigen Schritten Ihren Bedarf. Wählen Sie Türen, Maschinen und Nutzeranzahl, um eine erste Kostenschätzung zu erhalten.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button asChild>
                    <Link href="/configurator">
                      Konfiguration starten
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex justify-center lg:justify-end relative">
                {/* Mockup of UI */}
                <motion.div 
                  className={cn(
                    'relative w-72 md:w-96 aspect-[4/3] bg-card rounded-xl shadow-2xl flex flex-col overflow-hidden -rotate-2 border border-border',
                    !shouldReduceMotion && 'hover:rotate-0 transition-all duration-500 ease-out',
                  )}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                >
                  {/* Header */}
                  <div className="h-12 border-b border-border bg-muted/30 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6 space-y-6 bg-background">
                    {/* Fake Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-muted-foreground">
                            <span>Anzahl Türen</span>
                            <span>5</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-primary rounded-full" />
                        </div>
                    </div>

                    {/* Fake Slider 2 */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-muted-foreground">
                            <span>Maschinen</span>
                            <span>12</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-primary rounded-full" />
                        </div>
                    </div>

                    {/* Fake Checkboxes */}
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckSquare className="w-4 h-4 text-primary" />
                            <span>RFID</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckSquare className="w-4 h-4 text-primary" />
                            <span>App</span>
                        </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements behind */}
                <div className="absolute -z-10 bottom-6 left-6 w-full h-full border-2 border-primary/5 rounded-xl rotate-3" />
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
