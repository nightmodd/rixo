import React, { useState, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './product-media.module.scss';
import clsx from 'clsx';

interface productProps {
  images: string[];
}
const ProductMedia = ({ images }: productProps) => {
  //maybe all removed
  const showcaseRef = useRef<any>(null);
  const [activeImgID, setActiveImgID] = useState<number>(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const selectActiveImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const id = target.dataset.id;
    setActiveImgID(Number(id));
  };
  const handleShowcaseSwipper = (e: any) => {
    const id = e.activeIndex;
    setActiveImgID(Number(id));
  };

  return (
    <div className={styles.product_media_section}>
      <Swiper
        className={styles.images_slider}
        breakpoints={{
          1400: {
            slidesPerView: 5,
            spaceBetween: 5,
          },

          1200: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1000: {
            slidesPerView: 3.5,
            spaceBetween: 5,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
        }}
        direction="vertical"
        onSwiper={setThumbsSwiper}
        navigation={true}
        modules={[Navigation]}
      >
        {images.map((image: string, index: number) => (
          <SwiperSlide
            key={index}
            className={clsx({
              [styles.slider_item]: true,
              [styles.active]: index === activeImgID,
            })}
          >
            <button onClick={selectActiveImg}>
              <img src={image} alt={`img number ${index}`} data-id={index} />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.image_display}>
        <Swiper
          className={styles.images_showcase}
          slidesPerView={1}
          onSlideChange={handleShowcaseSwipper}
          pagination={{
            type: 'progressbar',
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Pagination, Thumbs]}
          ref={showcaseRef}
        >
          {images.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`img number ${index}`}
                className={index == 0 ? styles.active_display : ''}
                data-id={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductMedia;
