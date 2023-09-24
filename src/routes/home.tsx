import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { HomeData, HomeSection, HomeSubHero } from '../types/listing';
import LoadingAnimation from '../components/loading-animation';
import SubHero from '../components/home-components/sub-hero';
import AvailableSections from '../components/home-components/avilable-sections';

import { db } from '../config/firebase-config';
import {
  collection,
  query,
  getDocs,
  Query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import styles from './home.module.scss';

//home page
const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subHeroData, setSubHeroData] = useState<Array<HomeSubHero>>([]);
  const [sectionsData, setSectionsData] = useState<Array<HomeSection>>([]);
  const homeData = useLoaderData() as HomeData;

  useEffect(() => {
    setTimeout(() => {
      if (homeData) {
        setSubHeroData(homeData.subHeroData);
        setSectionsData(homeData.sectionsData);
      }
      setIsLoading(false);
    }, 500);

    return () => {
      setIsLoading(true);
    };
  }, [homeData]);

  return (
    <div className={styles.container}>
      {isLoading && <LoadingAnimation />}
      {!isLoading && (
        <>
          <SubHero {...subHeroData[0]} />
          <AvailableSections sections={sectionsData} />
          <SubHero {...subHeroData[1]} />
          <SubHero {...subHeroData[2]} />
        </>
      )}
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

  return data;
};

export const getData = async () => {
  const subHeroData = await fetchData('home');
  const sectionsData = await fetchData('home-sections');

  const homeData = { subHeroData, sectionsData };
  return homeData;
};
