import { Router} from 'express';
import filterController from '../controllers/filter.controller';

const router = Router();

// Search products endpoint
router.get('/', filterController.handelGetProductByCategories);

export default router;
