import { investorContacts } from '../data/investorInformation';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function InvestorInformationPage() {
  useDocumentTitle('Investor Information');

  return (
    <>
      <h5 className="bod-heading">Consultants Information</h5>
      <div className="container pb-5">
        {investorContacts.map((group) => (
          <div key={group.title} className="row my-3">
            <div className="col-lg-12">
              <h6 className="text-center">{group.title}</h6>
              {group.lines ? (
                <div className="ioc-table-style">
                  <p className="ps-4 investors-p">
                    {group.lines.map((line) => (
                      <span key={line} className="d-block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ) : (
                <table className="table ioc-table-style">
                  <tbody>
                    {group.rows.map(([label, value], i) => (
                      <tr key={label} className={i % 2 ? 'table-row-color' : undefined}>
                        <td className="table-column-1">{label}</td>
                        <td>:</td>
                        <td className="table-column-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
