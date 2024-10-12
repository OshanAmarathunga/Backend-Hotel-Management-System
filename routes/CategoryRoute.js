import express from 'express';
import { deleteCategory, getAllCategories, getCategoryByName, saveCategory } from '../controllers/CategoryController.js';

const categoryRouter=express.Router();

categoryRouter.get('/',getAllCategories);
categoryRouter.post('/',saveCategory); 
categoryRouter.delete('/:categoryName',deleteCategory)
categoryRouter.get('/:requiredName',getCategoryByName)

export default categoryRouter;