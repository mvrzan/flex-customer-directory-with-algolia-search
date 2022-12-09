import algoliasearch from 'algoliasearch/lite';

// algolia search read-only connection details
export const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY
);
