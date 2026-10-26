// Striped table used across the investor pages. `rows` is an array of cell-value arrays.
export default function DataTable({ headers, rows, renderCell = (value) => value, className = 'table table-style' }) {
  return (
    <div className="d-flex justify-content-center table-responsive">
      <table className={className}>
        {headers && (
          <thead>
            <tr className={`table-head${headers.length > 2 ? ' director-details-thead' : ''}`}>
              {headers.map((header, i) => (
                <td key={header} className={i < 2 ? `table-column-${i + 1}` : undefined}>
                  <b>{header}</b>
                </td>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className={r % 2 ? 'table-row-color' : undefined}>
              {row.map((cell, i) => (
                <td key={i} className={i < 2 ? `table-column-${i + 1}` : undefined}>
                  {renderCell(cell, i, r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
