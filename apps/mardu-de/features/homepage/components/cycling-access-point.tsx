interface CyclingAccessPointProps {
  items: ReadonlyArray<string>;
}

export function CyclingAccessPoint({ items }: CyclingAccessPointProps) {
  return (
    <span
      className="homepage-access-cycle font-serif italic font-normal tracking-[-0.02em]"
      aria-hidden="true"
    >
      {items.map((item) => (
        <span key={item} className="homepage-access-cycle__item">
          {item}.
        </span>
      ))}
    </span>
  );
}
