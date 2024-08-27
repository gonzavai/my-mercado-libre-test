// Servicios para manejar la lógica de negocio, como la interacción con APIs externas

import axios from "axios";
import { currencySymbols } from "../utils/currencySymbols";
import { productStatusTranslations } from "../utils/productStatusTranslations";
import { Item } from "../models/itemModel";
import { ItemDetailResponse, ItemsResponse } from "../models/responseModel";

const ITEMS_URL = "https://api.mercadolibre.com/sites/MLA/search";
const ITEM_DETAIL_URL = "https://api.mercadolibre.com/items";
const CATEGORIES_URL = "https://api.mercadolibre.com/categories";

/* Endpoint para obtener el listado de productos en base a un termino buscado */
export const fetchItems = async (query: string): Promise<ItemsResponse> => {
  const { data } = await axios.get(`${ITEMS_URL}?q=${query}`);
  const items: Item[] = data.results.slice(0, 4).map((item: any) => {
    const amount = Math.floor(item.price);
    const decimals = (item.price % 1)?.toFixed(2)?.split(",")?.[1] || "";
    const newItem: Item = {
      id: item.id,
      title: item.title,
      price: {
        currency: currencySymbols[item?.currency_id],
        amount: Math.floor(amount) || 0,
        decimals: parseInt(decimals) || 0,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    };
    return newItem;
  });

  const responseItems: ItemsResponse = {
    author: {
      name: "Gonzalo",
      lastname: "Vai",
    },
    categories:
      data.filters
        .find((filter: any) => filter.id === "category")
        ?.values[0].path_from_root.map((cat: any) => cat.name) || [],
    items,
  };
  return responseItems;
};

/* Endpoint para obtener el detalle de un producto */
export const fetchItemDetails = async (id: string): Promise<ItemDetailResponse> => {
  const [itemResponse, descriptionResponse] = await Promise.all([
    axios.get(`${ITEM_DETAIL_URL}/${id}`),
    axios.get(`${ITEM_DETAIL_URL}/${id}/description`)
  ]);

  const categoriesResponse = await axios.get(`${CATEGORIES_URL}/${itemResponse.data.category_id}`)

  const amount = Math.floor(itemResponse?.data?.price);
  const decimals =
    (itemResponse?.data?.price % 1)?.toFixed(2)?.split(",")?.[1] || "";

  const item: Item = {
    id: itemResponse.data.id,
    title: itemResponse.data.title,
    price: {
      currency: currencySymbols[itemResponse?.data?.currency_id],
      amount: amount || 0,
      decimals: parseInt(decimals) || 0,
    },
    picture: itemResponse.data.pictures[0].url,
    condition: productStatusTranslations?.[itemResponse?.data?.condition] || "",
    free_shipping: itemResponse.data.shipping.free_shipping,
    sold_quantity: itemResponse.data.initial_quantity,
    description: descriptionResponse.data.plain_text,
    categories: categoriesResponse.data.path_from_root.map(
      (categ: { name: string }) => categ.name
    ),
  };

  const itemDetailResponse: ItemDetailResponse = {
    author: {
      name: "Gonzalo",
      lastname: "Vai",
    },
    item,
  };
  return itemDetailResponse;
};
