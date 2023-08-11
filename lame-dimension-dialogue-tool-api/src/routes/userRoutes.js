import userController from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/:id').get(userController.getUser);

export default router;
