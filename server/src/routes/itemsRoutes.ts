import { Router } from 'express';
import { getItems, getItemDetails } from '../controllers/itemsController';

const router = Router();

router.get('/items', getItems);
router.get('/items/:id', getItemDetails);

export default router;
