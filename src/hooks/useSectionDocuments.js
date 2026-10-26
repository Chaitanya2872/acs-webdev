import { useEffect, useState } from 'react';

import { documentsApiEnabled, fetchSectionDocuments } from '../lib/documentsApi';

// Documents for a listing page: live from the portal API, or the bundled list when the API is
// not configured or unreachable, so visitors always get working links.
export default function useSectionDocuments(slug, fallbackDocuments) {
  const [state, setState] = useState(() => initialState(fallbackDocuments));

  useEffect(() => {
    if (!documentsApiEnabled) {
      setState(initialState(fallbackDocuments));
      return undefined;
    }

    const controller = new AbortController();
    setState({ status: 'loading', documents: [], section: null });
    fetchSectionDocuments(slug, { signal: controller.signal })
      .then(({ section, documents }) => setState({ status: 'live', documents, section }))
      .catch((error) => {
        if (controller.signal.aborted && error.name === 'AbortError') return;
        setState({ status: fallbackDocuments ? 'fallback' : 'error', documents: fallbackDocuments ?? [], section: null, notFound: error.status === 404 });
      });
    return () => controller.abort();
  }, [slug, fallbackDocuments]);

  return state;
}

function initialState(fallbackDocuments) {
  return documentsApiEnabled
    ? { status: 'loading', documents: [], section: null }
    : { status: 'static', documents: fallbackDocuments ?? [], section: null };
}
