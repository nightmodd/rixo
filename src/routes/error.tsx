import React from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '../components/navbar-components/navbar';

import styles from './error.module.scss';

const PageContent: React.FC = () => {
  const title = '<NOT_FOUND>';
  return (
    <div className={styles.content}>
      <img
        src="https://d33wubrfki0l68.cloudfront.net/4bb452ab9f63c172a3c418d733495bf7e6394b9e/ff073/doge_sad.jpg"
        alt="doge sad"
      />
      <span>{title}</span>
      <p>You just hit a route that doesn't exist... the sadness.</p>
      <Link to={'/'}>Go home</Link>
    </div>
  );
};

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <PageContent></PageContent>
    </>
  );
};

export default ErrorPage;
