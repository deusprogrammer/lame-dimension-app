import userController from '../controllers/userController';
import express from 'express';

const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/:id').get(userController.getUser);

export default router;
