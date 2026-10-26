import DataTable from './DataTable';

// List of downloadable filings: title (opens in a new tab) and file type.
export default function DocumentTable({ documents }) {
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
