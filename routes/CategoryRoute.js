import express from 'express';
import { getAllCategories, saveCategory } from '../controllers/CategoryController.js';

const categoryRouter=express.Router();

categoryRouter.get('/',getAllCategories);
categoryRouter.post('/',saveCategory); 

export default categoryRouter;