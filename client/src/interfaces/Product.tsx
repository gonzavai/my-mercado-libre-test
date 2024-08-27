export interface Product {
    id: string;
    title: string;
    price: {
        currency: string; 
        amount: number;
        decimals: number;
    };
    picture: string;
    location: string;
    condition: 'Nuevo' | 'Usado' | 'Reacondicionado';
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
}