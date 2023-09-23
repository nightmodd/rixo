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
    <Swiper
      className={styles.avilable_sections}
      breakpoints={{
        1000: {
          slidesPerView: 3,
        },
      }}
      slidesPerView={4}
      navigation={true}
      spaceBetween={35}
      modules={[Navigation, Pagination]}
    >
      {sections.map((section: HomeSection, index: number) => (
        <SwiperSlide key={index} className={styles.section_card}>
          <Link to={`/collections/${section.id}`}>
            <img src={section.img} alt={section.description} data-id={index} />
            <span>{section.title}</span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AvilableSections;
