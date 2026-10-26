// Client for the document portal's public API (published investor filings).
// VITE_DOCUMENTS_API_URL is the API root, e.g. https://portal-api.acstechnologies.co.in/api/v1.
// When it is not set the site falls back to the bundled lists in src/data/investorDocuments.js.

const API_URL = (import.meta.env.VITE_DOCUMENTS_API_URL || '').replace(/\/+$/, '');
const TIMEOUT_MS = 8000;

export const documentsApiEnabled = Boolean(API_URL);

async function getJson(path, signal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort);
  try {
    const response = await fetch(`${API_URL}${path}`, { signal: controller.signal, headers: { Accept: 'application/json' } });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.success) {
      const error = new Error(payload?.error?.message || `Request failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return payload.data;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}

// Published documents for one listing page, shaped like the entries in investorDocuments.js.
export async function fetchSectionDocuments(slug, { signal } = {}) {
  const data = await getJson(`/public/sections/${encodeURIComponent(slug)}/documents?pageSize=500`, signal);
  return {
    section: data.section,
    documents: data.documents.map((doc) => ({
      id: doc.id,
      title: doc.title,
      href: doc.url,
      type: doc.type,
      financialYear: doc.financialYear,
    })),
  };
}

// Current URL of a document that used to live at /assets/docs/... on the web server.
export async function resolveLegacyDocument(legacyPath, { signal } = {}) {
  return getJson(`/public/legacy-documents?format=json&path=${encodeURIComponent(legacyPath)}`, signal);
}
