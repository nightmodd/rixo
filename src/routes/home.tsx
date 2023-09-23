import { useLoaderData } from 'react-router-dom';

import { HomeSubHero } from '../types/listing';
import SubHero from '../components/home-components/sub-hero';

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
