import express from 'express';
import { saveCategory } from '../controllers/CategoryController.js';
import { deleteFeedback, getAllFeedbacks, getApprovedFeedbacks, saveFeedback, updateStatus } from '../controllers/FeedBackController.js';

const feedbackRouter=express.Router();

feedbackRouter.post('/',saveFeedback );
feedbackRouter.get('/getAll',getAllFeedbacks );
feedbackRouter.get('/getApprovedFeedbacks', getApprovedFeedbacks);
feedbackRouter.delete('/:id',deleteFeedback );
feedbackRouter.put('/:id', updateStatus);

export default feedbackRouter;   