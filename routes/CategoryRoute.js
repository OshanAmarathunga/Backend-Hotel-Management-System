import express from 'express';
import { deleteCategory, getAllCategories, getCategoryByName, saveCategory, updateCategory } from '../controllers/CategoryController.js';

const categoryRouter=express.Router();

categoryRouter.get('/',getAllCategories);
categoryRouter.post('/',saveCategory); 
categoryRouter.delete('/:categoryName',deleteCategory);
categoryRouter.get('/:requiredName',getCategoryByName);
categoryRouter.put('/:categoryName',updateCategory);

export default categoryRouter;