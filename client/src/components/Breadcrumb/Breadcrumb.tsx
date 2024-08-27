import React from 'react';
import styles from './Breadcrumb.module.scss';
import { useProductContext } from '../../hooks/useProductContext';

const Breadcrumb: React.FC = () => {
  const { breadcrumbItems, loading } = useProductContext();

  return (
    <nav className={styles.breadcrumb}>
      {!loading && breadcrumbItems?.map((item, index) => (
        <span key={index} className={styles.breadcrumb__item}>
            <span className={styles.breadcrumb__name}>{item}</span>
          {index < breadcrumbItems.length - 1 && (
            <span className={styles.breadcrumb__separator}> {'>'} </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
