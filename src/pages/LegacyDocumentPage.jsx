import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { documentsApiEnabled, resolveLegacyDocument } from '../lib/documentsApi';
import NotFoundPage from './NotFoundPage';

// Old filing URLs (/assets/docs/<folder>/<file>) are served straight from the web server while the files exist.
// Apache only hands the request to the app once a file has been retired; then the portal resolves it to the
// migrated document and the visitor is forwarded to its current version.
export default function LegacyDocumentPage() {
  const { pathname } = useLocation();
  const [failed, setFailed] = useState(!documentsApiEnabled);

  useEffect(() => {
    if (!documentsApiEnabled) return undefined;
    const controller = new AbortController();
    resolveLegacyDocument(pathname, { signal: controller.signal })
      .then(({ url }) => window.location.replace(url))
      .catch(() => !controller.signal.aborted && setFailed(true));
    return () => controller.abort();
  }, [pathname]);

  if (failed) return <NotFoundPage />;
  return (
    <div className="container pb-5">
      <p className="text-muted documents-status" role="status">
        Opening document…
      </p>
    </div>
  );
}
