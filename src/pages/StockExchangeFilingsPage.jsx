import { useState } from 'react';
import { Link } from 'react-router-dom';

import { filingGroups } from '../data/navigation';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { paths } from '../routes/paths';

export default function StockExchangeFilingsPage() {
  useDocumentTitle('Stock Exchange Filings');
  const [openId, setOpenId] = useState(filingGroups[0].id);

  return (
    <>
      <div className="page-title">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Stock Exchange Filings</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={paths.home}>Home</Link>
              </li>
              <li>Investors</li>
              <li className="current">Stock Exchange Filings</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <p className="text-muted mb-4 filings-intro">
            All regulatory filings submitted to the stock exchanges in compliance with SEBI LODR and other applicable regulations.
          </p>

          <div className="accordion ir-accordion">
            {filingGroups.map((group) => {
              const isOpen = group.id === openId;
              const half = Math.ceil(group.links.length / 2);
              return (
                <div key={group.id} className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      type="button"
                      className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? null : group.id)}
                    >
                      <i className={`bi ${group.icon} me-2 accent-icon`} />
                      {group.title}
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse${isOpen ? ' show' : ''}`}>
                    <div className="accordion-body">
                      <div className="row">
                        {[group.links.slice(0, half), group.links.slice(half)].map((column, i) => (
                          <div key={i} className="col-md-6">
                            <ul>
                              {column.map((link) => (
                                <li key={link.to}>
                                  <Link to={link.to}>
                                    <i className="bi bi-file-earmark-text" /> {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
