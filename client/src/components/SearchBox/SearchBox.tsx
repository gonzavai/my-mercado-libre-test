import React, { useCallback, useEffect, useState } from 'react';
import styles from './SearchBox.module.scss';
import { useProductContext } from '../../hooks/useProductContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBox: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const { setItems, setBreadcrumbItems, setLoading } = useProductContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/items?search=${searchTerm}`);
      setSearchTerm('');  // Limpiar el input después de la búsqueda
    }
  }

  const handleSearch = useCallback(async (term: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/items?q=${term}`);
      const data = await response.json();
      setItems(data.items);
      setBreadcrumbItems(data?.categories);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }, [setItems, setBreadcrumbItems, setLoading]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query && query !== '') {
      handleSearch(query); // Realizar la búsqueda con el término de la URL
    }
  }, [location.search, handleSearch]); // Dependencia para ejecutar el efecto cuando la URL cambie


  return (
    <div className={styles.searchBoxContainer}>
      <form className={styles.searchBox} onSubmit={handleSubmit}>
        <div className={styles.searchBox}>
          <a className={styles.searchBox__iconLeft} href='/'>
            <img src="/assets/Logo_ML@2x.png.png.png" alt="Company Logo"  />
          </a>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Nunca dejes de buscar"
            className={styles.searchBox__input}
          />
          <button type='submit' className={styles.searchButton}>
            <img src="/assets/ic_Search.png" alt="Search Icon" className={styles.searchButton__icon} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
