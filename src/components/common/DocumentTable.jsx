import DataTable from './DataTable';

// List of downloadable filings: title (opens in a new tab) and file type.
// With groupByFinancialYear, one table per financial year (in list order), undated filings last.
export default function DocumentTable({ documents, groupByFinancialYear = false }) {
  if (!groupByFinancialYear) return <DocumentRows documents={documents} />;

  const groups = new Map();
  for (const doc of documents) {
    const key = doc.financialYear ?? '';
    groups.set(key, [...(groups.get(key) ?? []), doc]);
  }
  const ordered = [...groups.entries()].sort(([a], [b]) => (a === '' ? 1 : b === '' ? -1 : 0));

  return ordered.map(([year, docs]) => (
    <div key={year || 'other'}>
      <h6 className="documents-year-heading">{year ? `FY ${year}` : 'Other documents'}</h6>
      <DocumentRows documents={docs} />
    </div>
  ));
}

function DocumentRows({ documents }) {
  const rows = documents.map((doc) => [doc, doc.type]);

  return (
    <DataTable
      rows={rows}
      renderCell={(cell, column) =>
        column === 0 ? (
          <a href={cell.href} target="_blank" rel="noreferrer">
            {cell.title}
          </a>
        ) : (
          cell
        )
      }
    />
  );
}
