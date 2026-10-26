import { Link, Navigate, useLocation } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';
import { legacyRedirects } from '../routes/legacyRedirects';
import { paths } from '../routes/paths';

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const legacyTarget = legacyRedirects[pathname.replace(/^\//, '')];
  useDocumentTitle(legacyTarget ? null : 'Page Not Found');

  // Old static-site URLs (e.g. /annual_reports.html) keep working after the move to React.
  if (legacyTarget) return <Navigate to={legacyTarget} replace />;

  return (
    <section className="section">
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold">404</h1>
        <p className="lead">The page you are looking for does not exist or has moved.</p>
        <Link to={paths.home} className="btn-hero-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
