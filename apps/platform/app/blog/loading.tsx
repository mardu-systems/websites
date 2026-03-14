export default function BlogLoading() {
  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-16 md:pb-24">
      <section className="section-hairline py-10 md:py-14">
        <div className="mardu-container animate-pulse space-y-4">
          <div className="h-5 w-30 bg-foreground/10" />
          <div className="h-14 max-w-2xl bg-foreground/10" />
          <div className="h-12 max-w-xl bg-foreground/10" />
          <div className="h-72 w-full bg-foreground/10" />
        </div>
      </section>
    </main>
  );
}
