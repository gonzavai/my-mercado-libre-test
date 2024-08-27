import React from 'react';
import styles from './Item.module.scss';
import { Product } from '../../interfaces/Product';

const Item: React.FC<Product> = ({ id, title, price, picture, location, free_shipping }) => {

  const showDecimals = ():boolean => {
    return Boolean(price?.decimals && price?.decimals > 0 );
  }

  return (
    <div className={styles.item} itemID={id}>
      <img src={picture} alt={title} className={styles.item__image} width="4" height="3" />
      <div className={styles.item__details}>
        <div className={styles.item__details__priceWithIcon}>
          <span className="title">{price.currency}{price.amount.toLocaleString()}{showDecimals() && '.'+price.decimals}</span>
          { free_shipping && <img src="/assets/ic_shipping.png" alt="icon shipping" width={14} height={14} />}
        </div>
        <h2 className="subtitle">{title}</h2>
      </div>
      <p className={styles.item__details__location}>{location}</p>
    </div>
  );
};

export default Item;
