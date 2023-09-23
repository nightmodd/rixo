import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeSubHero } from '../../types/listing';

import styles from './sub-hero.module.scss';

//components for home page
const SubHero = (item: HomeSubHero) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    //cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let renderedImg = '';
  if (windowWidth > 760) {
    renderedImg = item.imgs[0];
  } else {
    renderedImg = item.imgs[1];
  }

  return (
    <div className={styles.subhero_card}>
      <img src={renderedImg} alt={item.id} />
      <div className={styles.inner_subhero}>
        <span className={styles.subhero_title}>{item.title}</span>
        <button>
          <Link to={`/collections/${item.id}`}>
            <span>Shop Now</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SubHero;
