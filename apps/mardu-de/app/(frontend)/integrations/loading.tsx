export default function IntegrationsLoading() {
  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-16 md:pb-24">
      <section className="section-hairline py-10 md:py-14">
        <div className="mardu-container animate-pulse">
          <div className="h-4 w-36 bg-black/8" />
          <div className="mt-3 h-12 w-72 bg-black/10" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 border border-black/8 bg-black/4" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
