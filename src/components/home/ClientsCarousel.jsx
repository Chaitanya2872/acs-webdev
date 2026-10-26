import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { clientLogos } from '../../data/home';
import SectionTitle from '../common/SectionTitle';

const breakpoints = {
  320: { slidesPerView: 2, spaceBetween: 40 },
  480: { slidesPerView: 3, spaceBetween: 60 },
  640: { slidesPerView: 4, spaceBetween: 80 },
  992: { slidesPerView: 6, spaceBetween: 120 },
};

export default function ClientsCarousel() {
  return (
    <section id="clients" className="clients section my-4">
      <SectionTitle caption="Clients" lead="Our" emphasis="Clients" />
      <div className="container" data-aos="fade-up">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={600}
          autoplay={{ delay: 5000 }}
          slidesPerView="auto"
          breakpoints={breakpoints}
        >
          {clientLogos.map((client) => (
            <SwiperSlide key={client.name}>
              <img src={client.image} className="img-fluid" alt={client.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
