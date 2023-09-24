import { Link } from 'react-router-dom';
import { HomeSection } from '../../types/listing';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import styles from './avilable-sections.module.scss';

interface AvilableSectionsProps {
  sections: Array<HomeSection>;
}

const AvilableSections = (props: AvilableSectionsProps) => {
  const sections = props.sections;

  return (
    <div className={styles.sections_container}>
      <span className={styles.title}>Styles Inspired by Vintage</span>
      <div className={styles.avilable_sections}>
        <Swiper
          breakpoints={{
            1000: {
              slidesPerView: 4,
              loop: false,
            },
            700: {
              slidesPerView: 3,
              loop: false,
            },
          }}
          slidesPerView={2}
          loop={true}
          pagination={{
            type: 'progressbar',
          }}
          navigation={true}
          spaceBetween={25}
          modules={[Navigation, Pagination]}
        >
          {sections.map((section: HomeSection, index: number) => (
            <SwiperSlide key={index}>
              <div className={styles.section_card}>
                <Link to={`/collections/${section.id}`}>
                  <img
                    src={section.img}
                    alt={section.description}
                    data-id={index}
                  />
                  <div className={styles.card_bottom}>
                    <span>{section.title}</span>
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AvilableSections;
