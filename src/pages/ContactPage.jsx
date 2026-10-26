import { Fragment } from 'react';

import Tabs from '../components/common/Tabs';
import SectionTitle from '../components/common/SectionTitle';
import EnquiryForm from '../components/contact/EnquiryForm';
import { contactForms } from '../data/contactForms';
import { mapEmbedUrl, offices } from '../data/site';
import useDocumentTitle from '../hooks/useDocumentTitle';

function InfoItem({ icon, title, children, delay }) {
  return (
    <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={delay}>
      <i className={`bi ${icon} flex-shrink-0`} />
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

function Office({ office }) {
  const address = <InfoItem icon="bi-geo-alt" title="Address" delay="200">{office.address}</InfoItem>;
  const [firstPhone] = office.phones;

  return (
    <>
      <h5>{office.city}</h5>
      <div className="my-4">
        {office.mapUrl ? (
          <a href={office.mapUrl} target="_blank" rel="noreferrer" className="contact-link">
            {address}
          </a>
        ) : (
          address
        )}
        {office.phones.length === 1 ? (
          <a href={firstPhone.href} className="contact-link">
            <InfoItem icon="bi-telephone" title="Call Us" delay="300">
              {firstPhone.display}
            </InfoItem>
          </a>
        ) : (
          <InfoItem icon="bi-telephone" title="Call Us" delay="300">
            {office.phones.map((phone, i) => (
              <Fragment key={phone.href}>
                {i > 0 && ', '}
                <a href={phone.href} className="contact-link">
                  {phone.display}
                </a>
              </Fragment>
            ))}
          </InfoItem>
        )}
      </div>
    </>
  );
}

export default function ContactPage() {
  useDocumentTitle('Contact Us');
  const groups = [...new Set(offices.map((office) => office.group))];

  return (
    <section id="contact" className="contact section">
      <SectionTitle lead="Need Help?" emphasis="Contact Us" />

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row justify-content-between gy-4">
          <div className="col-lg-4">
            <iframe
              title="ACS Technologies on Google Maps"
              src={mapEmbedUrl}
              className="map-iframe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="col-lg-7">
            <p>
              Whether you&apos;re searching for a new product or a new solution, we want to hear from you! Fill out the form, and one
              of our team members will contact you shortly. You can also find our direct contact information here.
            </p>
            <div className="my-5">
              {groups.map((group) => {
                const groupOffices = offices.filter((office) => office.group === group);
                return (
                  <Fragment key={group}>
                    <h4>{group}</h4>
                    <div className="row justify-content-between">
                      {groupOffices.map((office, i) => {
                        // Two offices side by side, an odd one out spans the full row (as in the original layout).
                        const fullWidth = groupOffices.length === 1 || (i === groupOffices.length - 1 && groupOffices.length % 2 === 1);
                        return (
                          <div key={office.city} className={fullWidth ? 'col-lg-12' : 'col-lg-6'}>
                            <Office office={office} />
                          </div>
                        );
                      })}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Tabs tabs={contactForms} renderPanel={(form) => <EnquiryForm form={form} />} />
    </section>
  );
}
