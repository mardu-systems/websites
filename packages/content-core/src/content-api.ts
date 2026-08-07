export type ContentApiErrorCode = 'NETWORK' | 'HTTP' | 'INVALID_PAYLOAD';

export class ContentApiError extends Error {
  readonly code: ContentApiErrorCode;
  readonly status?: number;
  readonly url: string;

  constructor(
    code: ContentApiErrorCode,
    message: string,
    options: { url: string; status?: number; cause?: unknown },
  ) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = 'ContentApiError';
    this.code = code;
    this.url = options.url;
    this.status = options.status;
  }
}

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

export type PayloadCollectionResult<T> = {
  docs: T[];
};

const DEFAULT_FETCH_TIMEOUT_MS = 3_000;
const DEFAULT_REVALIDATE_SECONDS = 60;

function isPayloadCollectionResult(value: unknown): value is PayloadCollectionResult<unknown> {
  return Boolean(value) && typeof value === 'object' && Array.isArray((value as { docs?: unknown }).docs);
}

export async function fetchPayloadCollection<T>(url: URL): Promise<PayloadCollectionResult<T>> {
  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(DEFAULT_FETCH_TIMEOUT_MS),
      next: {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      },
    } satisfies NextFetchInit);
  } catch (cause) {
    throw new ContentApiError('NETWORK', `Payload ist unter ${url.toString()} nicht erreichbar.`, {
      url: url.toString(),
      cause,
    });
  }

  if (!response.ok) {
    throw new ContentApiError(
      'HTTP',
      `Payload antwortete für ${url.toString()} mit HTTP ${response.status}.`,
      { url: url.toString(), status: response.status },
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch (cause) {
    throw new ContentApiError('INVALID_PAYLOAD', 'Payload lieferte kein gültiges JSON.', {
      url: url.toString(),
      status: response.status,
      cause,
    });
  }

  if (!isPayloadCollectionResult(payload)) {
    throw new ContentApiError(
      'INVALID_PAYLOAD',
      'Die Payload-Antwort entspricht nicht dem erwarteten Collection-Vertrag.',
      { url: url.toString(), status: response.status },
    );
  }

  return payload as PayloadCollectionResult<T>;
}

export function mapPayloadDocumentsStrict<TDocument, TDto>(
  documents: readonly TDocument[],
  mapper: (document: TDocument) => TDto | null,
  context: string,
): TDto[] {
  return documents.map((document, index) => {
    const mapped = mapper(document);

    if (mapped === null) {
      throw new ContentApiError(
        'INVALID_PAYLOAD',
        `Dokument ${index + 1} aus ${context} entspricht nicht dem öffentlichen DTO-Vertrag.`,
        { url: context },
      );
    }

    return mapped;
  });
}
