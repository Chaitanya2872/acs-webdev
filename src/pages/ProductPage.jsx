import { useParams } from 'react-router-dom';

import ScrollHint from '../components/common/ScrollHint';
import SectionTitle from '../components/common/SectionTitle';
import { products } from '../data/products';
import useDocumentTitle from '../hooks/useDocumentTitle';
import NotFoundPage from './NotFoundPage';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  useDocumentTitle(product?.heading);

  if (!product) return <NotFoundPage />;
  const { title, image, imageAlt, heading, paragraphs, features, link } = product;

  return (
    <section>
      <SectionTitle lead={title[0]} emphasis={title[1]} />
      <div className="container services-page-container">
        <div className="row">
          <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">
            <img src={image} alt={imageAlt} className="w-100" />
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h4>{heading}</h4>
            {paragraphs.map((text) => (
              <p key={text} className="text-justify">
                {text}
              </p>
            ))}
            {features && (
              <ul>
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}
            {link && (
              <a href={link.href} className="iotiq-btn" target="_blank" rel="noreferrer">
                {link.label}
              </a>
            )}
          </div>
        </div>
      </div>
      <ScrollHint />
    </section>
  );
}
