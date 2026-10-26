import Tabs from '../components/common/Tabs';
import { clientSectors } from '../data/clients';
import useDocumentTitle from '../hooks/useDocumentTitle';

const COLUMNS = 3;
const toColumns = (items) => {
  const size = Math.ceil(items.length / COLUMNS);
  return Array.from({ length: COLUMNS }, (_, i) => items.slice(i * size, (i + 1) * size));
};

function TwoToneHeading({ lead, emphasis }) {
  return (
    <div className="clients-title" data-aos="fade-up">
      <p>
        <span>{lead}</span>
        <br /> <span className="description-title">{emphasis}</span>
      </p>
    </div>
  );
}

export default function ClientsPage() {
  useDocumentTitle('Clients');
  const tabs = clientSectors.map((sector, i) => ({ ...sector, id: `sector-${i}` }));

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <TwoToneHeading lead="Our" emphasis="Clients" />
            </div>
            <div className="col-lg-8">
              <h5>What Sets Us Apart</h5>
              <div className="row">
                <div className="col-lg-6">
                  <p className="text-justify">
                    At ACS Technologies, we take pride in the strong partnerships we&apos;ve built over the years. Our clients are at the
                    heart of everything we do, and it&apos;s their trust in us that fuels our commitment to excellence. We serve a diverse
                    range of industries, from innovative startups to Fortune 500 companies, each with their own unique challenges and
                    goals.
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="text-justify">
                    We&apos;re honored to work with some of the most respected names in the industry and are grateful for the trust they
                    place in us. Our clients&apos; success is our success, and we look forward to continuing to build lasting
                    relationships and achieving remarkable results together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <TwoToneHeading lead="Our" emphasis="Partnerships" />
            </div>
            <div className="col-lg-8">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <img src="/assets/img/partners/trueconf_comp.png" alt="TrueConf" className="img-fluid" />
                </div>
                <div className="col-lg-6">
                  <h5>
                    At ACS Technologies, we are a product partner of{' '}
                    <a href="https://trueconf.in/" target="_blank" rel="noreferrer">
                      TrueConf
                    </a>{' '}
                    for providing enterprise video conferencing solution to our clientele.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Tabs
          tabs={tabs}
          renderPanel={(sector) => (
            <div className="container">
              <div className="row clients-list">
                {toColumns(sector.clients).map((column, i) => (
                  <div key={i} className="col-md-4">
                    <ul>
                      {column.map((client) => (
                        <li key={client}>{client}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        />
      </section>
    </>
  );
}
