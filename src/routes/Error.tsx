import React from 'react';
import MainNavigation from '../components/navbar';

import styles from './error.module.scss';

type pageContentProps = {
    title: string;
    children: React.ReactNode;
};
const PageContent: React.FC<pageContentProps> = (props) => {
    const { title, children } = props;
    return (
        <div className={styles.content}>
            <h1>{title}</h1>
            {children}
        </div>
    );
};

const ErrorPage = () => {
    const title = 'An Error Occurred';
    const errorMessage = 'Something went wrong!';

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{errorMessage}</p>
            </PageContent>
        </>
    );
};

export default ErrorPage;
