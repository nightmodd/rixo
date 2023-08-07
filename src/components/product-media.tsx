import React, { useState, useRef, useEffect } from 'react';
import styles from './product-media.module.scss';

interface productProps {
  images: string[];
}
const ProductMedia = ({ images }: productProps) => {
  const [showUpButton, setShowUpButton] = useState<boolean>(false);
  const [showDownButton, setShowDownButton] = useState<boolean>(true);
  const [activeImgID, setActiveImgID] = useState<number>(0);
  const sliderRef = useRef<HTMLUListElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const handleActiveImage = (id: string) => {
    //get all the images items
    const sliderItems = sliderRef.current?.children;
    const sliderItemsArray = Array.from(sliderItems!);
    //get all the images in the display area
    const imagesShowcase = showcaseRef.current?.children;
    const imagesShowcaseArray = Array.from(imagesShowcase!);
    //add active class to the clicked img and remove it from the others
    if (sliderItemsArray) {
      sliderItemsArray.forEach((item) => {
        if (item.getAttribute('data-id') === id) {
          item.classList.add(styles.active);
        } else {
          item.classList.remove(styles.active);
        }
      });
    }

    if (imagesShowcaseArray) {
      imagesShowcaseArray.forEach((item) => {
        if (item.getAttribute('data-id') === id) {
          item.classList.add(styles.active_display);
        } else {
          item.classList.remove(styles.active_display);
        }
      });
    }
  };
  const scrollMobileView = (id: number) => {
    const display = displayRef.current;
    const displayWidth = display?.clientWidth;
    const showcase = showcaseRef.current;

    showcase!.scrollTo({
      left: id * displayWidth!,
      behavior: 'smooth',
    });
  };

  const selectActiveImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    //get the id of the clicked img
    const target = e.target as HTMLButtonElement;
    const id = target.dataset.id;
    setActiveImgID(Number(id));
    handleActiveImage(id!);
  };

  useEffect(() => {
    scrollMobileView(activeImgID);
    handleActiveImage(activeImgID.toString());
  }, [activeImgID]);

  //scroll handlers
  const scrollSliderUp = () => {
    const slider = sliderRef.current;
    slider?.scrollBy(0, -100);
    if (slider!.scrollTop < 30) {
      setShowUpButton(false);
    } else {
      setShowUpButton(true);
    }
    setShowDownButton(true);
  };

  const scrollSliderDown = () => {
    const slider = sliderRef.current;
    slider?.scrollBy(0, 100);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (slider!.scrollTop === slider!.scrollHeight - slider!.clientHeight) {
      setShowDownButton(false);
    } else {
      setShowDownButton(true);
    }
    setShowUpButton(true);
  };

  showcaseRef.current?.addEventListener('scroll', () => {
    const display = displayRef.current;
    const showcase = showcaseRef.current;
    //will be used to fill the progress bar
    //const numberOfImages = images.length;
    const displayWidth = display?.clientWidth;
    const id = Math.round(showcase!.scrollLeft / displayWidth!);
    setActiveImgID(id);
  });

  return (
    <div className={styles.product_media_section}>
      <div className={styles.images_slider_container}>
        {showUpButton && (
          <button
            className={`${styles.arrow_btn_up} ${styles.arrow_btn}`}
            onClick={scrollSliderUp}
          >
            <i className="fa-solid fa-angle-up"></i>
          </button>
        )}
        <ul className={styles.images_slider} ref={sliderRef}>
          {images.map((image: string, index: number) => (
            <li key={index} data-id={index}>
              <button data-id={index} onClick={selectActiveImg}>
                <img
                  src={image}
                  alt={`img number ${index}`}
                  className={styles.image}
                  data-id={index}
                />
              </button>
            </li>
          ))}
        </ul>
        {showDownButton && (
          <button
            className={`${styles.arrow_btn_down} ${styles.arrow_btn}`}
            onClick={scrollSliderDown}
          >
            <i className="fa-solid fa-angle-down"></i>
          </button>
        )}
      </div>
      <div className={styles.image_display} ref={displayRef}>
        <div className={styles.images_showcase} ref={showcaseRef}>
          {images.map((image: string, index: number) => (
            <img
              src={image}
              alt={`img number ${index}`}
              key={index}
              className={index == 0 ? styles.active_display : ''}
              data-id={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductMedia;
