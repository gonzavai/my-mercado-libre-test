import React from 'react';
import { Link } from 'react-router-dom';

import Item from '../../components/Item/Item';
import styles from './SearchResults.module.scss';
import { useProductContext } from '../../hooks/useProductContext';

const SearchResults: React.FC = () => {

  const { items, loading } = useProductContext();

  if (loading) {
    return <div className={styles.empty}>Buscando...</div>;
  }

  if (items?.length === 0) {
      return <div className={styles.empty}>No se encontraron resultados</div>;
  }
  return (
    <section className={styles.itemList}>
      <ul role='list'>
        {items?.map(item => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>
              <Item {...item} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchResults;
