import { Request, Response } from 'express';
import { fetchItems, fetchItemDetails } from '../services/itemsService';
import { ItemDetailResponse, ItemsResponse } from '../models/responseModel';

export const getItems = async (req: Request, res: Response) => {
  const { q } = req.query;
  try {
    const response: ItemsResponse = await fetchItems(q as string);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

export const getItemDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response: ItemDetailResponse = await fetchItemDetails(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error fetching item details" });
  }
};
