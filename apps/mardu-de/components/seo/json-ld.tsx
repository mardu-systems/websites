export type JsonLdData = Record<string, unknown>;

export interface JsonLdProps {
  data: JsonLdData;
}

/**
 * Renders server-generated JSON-LD and escapes HTML opening characters so
 * CMS-controlled strings cannot terminate the script element.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
