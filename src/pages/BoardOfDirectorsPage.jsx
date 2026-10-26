import { Fragment } from 'react';

import DataTable from '../components/common/DataTable';
import { boardSections } from '../data/board';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function BoardOfDirectorsPage() {
  useDocumentTitle('Board of Directors');

  return (
    <div className="container pb-5">
      {boardSections.map((section) => (
        <Fragment key={section.title}>
          <h5 className="bod-heading">{section.title}</h5>
          {section.tables.map((table, i) => (
            <Fragment key={table.title ?? i}>
              {table.title && <h6 className="table-heading">{table.title}</h6>}
              <DataTable headers={table.headers} rows={table.rows} />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
