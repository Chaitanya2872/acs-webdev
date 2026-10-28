import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { clientLogos } from '../../data/home';
import { paths } from '../../routes/paths';
import HomeHeading from './HomeHeading';

const breakpoints = {
  0: { slidesPerView: 2.2, spaceBetween: 12 },
  576: { slidesPerView: 3.2, spaceBetween: 12 },
  992: { slidesPerView: 5, spaceBetween: 16 },
};

export default function ClientsCarousel() {
  const [swiper, setSwiper] = useState(null);

  return (
    <section id="clients" className="lp-section lp-clients">
      <div className="container">
        <HomeHeading title="Clients" text="Trusted by defence, government and enterprise.">
          <Link to={paths.clients} className="lp-link">
            All clients <i className="bi bi-arrow-right" />
          </Link>
          <div className="lp-carousel-nav">
            <button type="button" aria-label="Previous clients" onClick={() => swiper?.slidePrev()}>
              <i className="bi bi-arrow-left" />
            </button>
            <button type="button" aria-label="Next clients" onClick={() => swiper?.slideNext()}>
              <i className="bi bi-arrow-right" />
            </button>
          </div>
        </HomeHeading>

        <div data-aos="fade-up">
          <Swiper
            modules={[Autoplay]}
            onSwiper={setSwiper}
            loop
            speed={700}
            grabCursor
            autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={breakpoints}
          >
            {clientLogos.map((client) => (
              <SwiperSlide key={client.name}>
                <figure className="lp-client">
                  <div className="lp-client-logo">
                    <img src={client.image} alt={client.name} loading="lazy" />
                  </div>
                  <figcaption>{client.name}</figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
