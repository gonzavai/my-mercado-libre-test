// Modelos para estructurar los datos, puede contener validaciones, interfaces, etc.

export interface Price {
    currency: string;
    amount: number;
    decimals: number;
}

export interface Item {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity?: number;
    description?: string;
    categories?: string[];
}