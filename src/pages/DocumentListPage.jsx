import { useParams } from 'react-router-dom';

import DocumentTable from '../components/common/DocumentTable';
import { documentPages } from '../data/investorDocuments';
import useDocumentTitle from '../hooks/useDocumentTitle';
import NotFoundPage from './NotFoundPage';

// Renders any investor document listing; the slug comes from the route or, for fixed routes, a prop.
export default function DocumentListPage({ slug: fixedSlug }) {
  const params = useParams();
  const page = documentPages.find((p) => p.slug === (fixedSlug ?? params.slug));
  useDocumentTitle(page?.title);

  if (!page) return <NotFoundPage />;

  return (
    <div className="container pb-5">
      <h5 className="bod-heading">{page.title}</h5>
      <DocumentTable documents={page.documents} />
    </div>
  );
}
