import React, { createContext, useState } from 'react';
import { Product } from '../interfaces/Product';

interface ProductContextProps {
    items: Product[];
    setItems: (items: Product[]) => void;
    breadcrumbItems: string[];
    setBreadcrumbItems: (items: string[]) => void;
    loading: boolean;
    setLoading: (isLoading: boolean) => void
}

export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [items, setItems] = useState<Product[]>([]);
    const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <ProductContext.Provider value={{ items, setItems, breadcrumbItems, setBreadcrumbItems, loading, setLoading }}>
            {children}
        </ProductContext.Provider>
    );
};
