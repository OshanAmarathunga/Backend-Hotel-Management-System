import express from 'express';
import { createGalleryItem, deleteGalleryItem, getGallery, updateGalleyItem } from '../controllers/galleryItemController.js';

const galleryItemRouter=express.Router();

galleryItemRouter.post('/',createGalleryItem);
galleryItemRouter.get('/',getGallery);
galleryItemRouter.delete('/:id',deleteGalleryItem);
galleryItemRouter.put('/', updateGalleyItem);

export default galleryItemRouter;
