import React from 'react';
import styles from './pageContent.module.scss';

type Props = {
    title: string;
    children: React.ReactNode;
};
const PageContent: React.FC<Props> = (props) => {
    const { title, children } = props;
    return (
        <div className={styles.content}>
            <h1>{title}</h1>
            {children}
        </div>
    );
};

export default PageContent;
