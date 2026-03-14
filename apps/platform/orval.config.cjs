/**
 * Twenty REST API code generation.
 * Source spec is refreshed before generation via `npm run api:twenty:pull-openapi`.
 */
const DEFAULT_FILTER_TAGS = ['people', 'companies', 'notes', 'noteTargets'];

function parseCsvEnv(value) {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getInputFilters() {
  const mode = process.env.TWENTY_OPENAPI_FILTER_MODE ?? 'include';
  const tagsRaw = process.env.TWENTY_OPENAPI_TAGS;
  const schemas = parseCsvEnv(process.env.TWENTY_OPENAPI_SCHEMAS);
  const useDefaultTagFilter = process.env.TWENTY_OPENAPI_USE_DEFAULT_TAG_FILTER !== 'false';

  const tags =
    tagsRaw === '*'
      ? []
      : tagsRaw !== undefined
        ? parseCsvEnv(tagsRaw)
        : useDefaultTagFilter
          ? DEFAULT_FILTER_TAGS
          : [];

  if (tags.length === 0 && schemas.length === 0) {
    return undefined;
  }

  return {
    mode: mode === 'exclude' ? 'exclude' : 'include',
    tags,
    schemas,
  };
}

const inputFilters = getInputFilters();

module.exports = {
  twenty: {
    input: {
      target: './twenty-mardu.json',
      validation: true,
      ...(inputFilters ? { filters: inputFilters } : {}),
      override: {
        transformer: './scripts/orval-twenty-transformer.cjs',
      },
    },
    output: {
      mode: 'tags-split',
      target: './lib/integrations/twenty/generated/endpoints',
      schemas: './lib/integrations/twenty/generated/model',
      client: 'fetch',
      clean: true,
      prettier: true,
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
};
