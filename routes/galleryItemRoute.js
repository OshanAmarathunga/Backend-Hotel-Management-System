import express from 'express';
import { createGalleryItem, getGallery } from '../controllers/galleryItemController.js';

const galleryItemRouter=express.Router();

galleryItemRouter.post('/',createGalleryItem);
galleryItemRouter.get('/',getGallery);

export default galleryItemRouter;
