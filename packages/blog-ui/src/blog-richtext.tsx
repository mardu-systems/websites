import type { SerializedBlockNode } from "@payloadcms/richtext-lexical";
import {
  RichText,
  type JSXConverterArgs,
} from "@payloadcms/richtext-lexical/react";

import { MermaidDiagram } from "./mermaid-diagram";

type MermaidDiagramBlockNode = SerializedBlockNode<{
  blockType: "mermaidDiagram";
  caption?: null | string;
  code: string;
  description: string;
  title: string;
}>;

export interface BlogRichTextProps {
  content: unknown;
}

export function BlogRichText({ content }: BlogRichTextProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:font-normal prose-headings:tracking-[-0.03em] prose-headings:text-foreground prose-h2:mt-14 prose-h2:text-[clamp(1.85rem,3vw,2.6rem)] prose-h2:leading-[1.05] prose-h3:mt-10 prose-h3:text-[clamp(1.4rem,2.2vw,1.7rem)] prose-h3:leading-tight prose-p:leading-relaxed prose-p:text-foreground/78 prose-li:text-foreground/78 prose-strong:text-foreground prose-a:text-mardu-purple prose-a:decoration-mardu-orange prose-a:underline prose-a:underline-offset-4 prose-blockquote:border-l-mardu-orange prose-blockquote:font-serif prose-blockquote:text-foreground/75 prose-blockquote:italic">
      <RichText
        converters={({ defaultConverters }) => ({
          ...defaultConverters,
          blocks: {
            ...defaultConverters.blocks,
            mermaidDiagram: ({
              node,
            }: JSXConverterArgs<MermaidDiagramBlockNode>) => (
              <MermaidDiagram
                caption={node.fields.caption}
                code={node.fields.code}
                description={node.fields.description}
                title={node.fields.title}
              />
            ),
          },
        })}
        data={content as never}
      />
    </div>
  );
}
