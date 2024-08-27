import { Item } from './itemModel';

export interface Author {
    name: string;
    lastname: string;
}

export interface ItemsResponse {
    author: Author;
    categories: string[];
    items: Item[];
}

export interface ItemDetailResponse {
    author: Author;
    item: Item;
}
