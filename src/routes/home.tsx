import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { HomeSubHero } from '../types/listing';

import { db } from '../config/firebase-config';
import {
  collection,
  query,
  getDocs,
  Query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import styles from './home.module.scss';

const SubHero = (item: HomeSubHero) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

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

const HomePage: React.FC = () => {
  const subHeroData = useLoaderData() as HomeSubHero[];

  return (
    <div className={styles.container}>
      <SubHero {...subHeroData[0]} />
      <SubHero {...subHeroData[1]} />
      <SubHero {...subHeroData[2]} />
    </div>
  );
};

export default HomePage;

const fetchData = async (fetchedData: string) => {
  const resolvedQuery = query(collection(db, fetchedData) as Query);
  const querySnapshot = await getDocs(resolvedQuery);
  const data = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return data as HomeSubHero[];
};

export const getData = async () => {
  const data = await fetchData('home');
  return data as HomeSubHero[];
};
