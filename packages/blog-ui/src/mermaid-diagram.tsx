"use client";

import { useEffect, useId, useState } from "react";

export interface MermaidDiagramProps {
  title: string;
  description: string;
  code: string;
  caption?: null | string;
}

type MermaidApi = (typeof import("mermaid"))["default"];

let mermaidApiPromise: Promise<MermaidApi> | undefined;

function loadMermaid(): Promise<MermaidApi> {
  if (!mermaidApiPromise) {
    mermaidApiPromise = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        suppressErrorRendering: true,
        theme: "base",
        themeVariables: {
          background: "#f4f4f4",
          primaryColor: "#f0ecff",
          primaryTextColor: "#19151f",
          primaryBorderColor: "#3b2c6f",
          lineColor: "#3b2c6f",
          secondaryColor: "#fff0e9",
          secondaryBorderColor: "#ff5a1f",
          tertiaryColor: "#ffffff",
          fontFamily: "inherit",
        },
      });

      return mermaid;
    });
  }

  return mermaidApiPromise;
}

export function MermaidDiagram({
  caption,
  code,
  description,
  title,
}: MermaidDiagramProps) {
  const reactId = useId();
  const diagramId = `mermaid-${reactId.replaceAll(":", "")}`;
  const [svg, setSvg] = useState<string>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    async function renderDiagram() {
      try {
        const mermaid = await loadMermaid();
        const result = await mermaid.render(diagramId, code);

        if (isCurrent) {
          setSvg(result.svg);
          setHasError(false);
        }
      } catch {
        if (isCurrent) {
          setSvg(undefined);
          setHasError(true);
        }
      }
    }

    void renderDiagram();

    return () => {
      isCurrent = false;
    };
  }, [code, diagramId]);

  return (
    <figure className="not-prose my-12 overflow-hidden rounded-[2rem] border border-foreground/10 bg-white/75 p-5 shadow-sm sm:p-8">
      <h3 className="mb-2 text-xl font-medium tracking-[-0.02em] text-foreground">
        {title}
      </h3>
      {hasError ? (
        <p className="rounded-2xl bg-mardu-orange/10 px-5 py-4 text-sm leading-relaxed text-foreground/75">
          Das Diagramm konnte nicht dargestellt werden. {description}
        </p>
      ) : svg ? (
        <div
          aria-label={description}
          className="mt-6 flex min-h-40 items-center justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
          role="img"
        />
      ) : (
        <div
          aria-label="Diagramm wird geladen"
          className="mt-6 min-h-40 animate-pulse rounded-2xl bg-foreground/5"
          role="status"
        />
      )}
      {caption ? (
        <figcaption className="mt-5 text-sm leading-relaxed text-foreground/60">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
