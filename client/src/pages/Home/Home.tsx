// src/pages/Home/Home.tsx
import React from 'react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
    return (
        <div className={styles.home}>
          <h1>Bienvenido a Mercado Libre</h1>
          <p>Utiliza la barra de búsqueda para encontrar productos.</p>
        </div>
      );
};

export default Home;
