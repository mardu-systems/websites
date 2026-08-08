export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-background pb-16 md:pb-24">
      <section className="section-hairline border-b border-black/15 py-12 md:py-20">
        <div className="mardu-container grid animate-pulse gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-5">
            <div className="h-3 w-24 bg-foreground/10" />
            <div className="h-32 max-w-xl bg-foreground/10" />
          </div>
          <div className="space-y-5 lg:border-l lg:border-black/15 lg:pl-8">
            <div className="h-3 w-40 bg-foreground/10" />
            <div className="aspect-[16/9] w-full bg-foreground/10" />
            <div className="h-16 w-3/4 bg-foreground/10" />
          </div>
        </div>
      </section>
    </main>
  );
}
