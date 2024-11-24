import express from 'express';
import { saveCategory } from '../controllers/CategoryController.js';
import { getAllFeedbacks, getApprovedFeedbacks, saveFeedback } from '../controllers/FeedBackController.js';

const feedbackRouter=express.Router();

feedbackRouter.post('/',saveFeedback );
feedbackRouter.get('/getAll',getAllFeedbacks );
feedbackRouter.get('/getApprovedFeedbacks', getApprovedFeedbacks);

export default feedbackRouter;   