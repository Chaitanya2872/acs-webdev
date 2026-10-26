import { useParams } from 'react-router-dom';

import DocumentTable from '../components/common/DocumentTable';
import { documentPages } from '../data/investorDocuments';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useSectionDocuments from '../hooks/useSectionDocuments';
import NotFoundPage from './NotFoundPage';

// Renders any investor document listing; the slug comes from the route or, for fixed routes, a prop.
// Documents come from the portal API (published filings); the bundled list is the offline fallback.
export default function DocumentListPage({ slug: fixedSlug }) {
  const params = useParams();
  const slug = fixedSlug ?? params.slug;
  const page = documentPages.find((p) => p.slug === slug);
  const { status, documents, section } = useSectionDocuments(slug, page?.documents);
  const title = page?.title ?? section?.title;
  useDocumentTitle(title);

  // Sections created in the portal after this build have no bundled entry; they exist only if the API knows them.
  if (!page && status !== 'loading' && status !== 'live') return <NotFoundPage />;

  return (
    <div className="container pb-5">
      <h5 className="bod-heading">{title}</h5>
      {status === 'loading' ? (
        <p className="text-muted documents-status" role="status">
          Loading documents…
        </p>
      ) : documents.length > 0 ? (
        <DocumentTable documents={documents} groupByFinancialYear={section?.groupByFinancialYear} />
      ) : (
        <p className="text-muted documents-status">No documents have been published in this section yet.</p>
      )}
    </div>
  );
}
