import React, { useEffect, useState } from 'react';
import styles from './ProductDetail.module.scss';
import { Product } from '../../interfaces/Product';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../../hooks/useProductContext';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { setBreadcrumbItems } = useProductContext();

   const getDecimals = (): string => {
        const price = product?.price?.decimals;
        if (price && price > 0 ) {
            if (price < 10) {
                return (price+'0');
            }
            return price?.toString()
        }
        return '00';
    }

    useEffect(() => {
        const fetchProductDetail = async () => {
        const response = await fetch(`/api/items/${id}`);
        const data = await response.json();
        setProduct(data?.item);
        setBreadcrumbItems(data?.item?.categories);
        setLoading(false);
      };
  
      fetchProductDetail();
    }, [id, setBreadcrumbItems]);
  
    if (loading) return <div className={styles.loading}>Cargando...</div>;
  return (
    <section className={styles.sectionContainer}>
        <div className={styles.gridContainer}>
            <article className={styles.imageArea}>
                <div className={styles.imageArea__image}>
                    <img src={product?.picture} alt={product?.title} width="4" height="3" />
                </div>
            </article>
            <article className={styles.buyArea}>
                <div>
                    <p className={styles.buyArea__condition}>
                    {product?.condition} - {product?.sold_quantity?.toLocaleString()} vendidos
                    </p>
                    <h1 className={styles.buyArea__title}>{product?.title}</h1>
                </div>
                <span className="headline">
                    {product?.price?.currency}{product?.price?.amount?.toLocaleString()}<sup>{getDecimals()}</sup>
                </span>
                <button type='button' className={styles.buyButton}>Comprar</button>
            </article>
        </div>
        <article className={styles.descriptionArea}>
            <h2 className='title'>Descripción del producto</h2>
            <p>{product?.description || 'Sin descripción'}</p>
        </article>
    </section>
  );
};

export default ProductDetail;
