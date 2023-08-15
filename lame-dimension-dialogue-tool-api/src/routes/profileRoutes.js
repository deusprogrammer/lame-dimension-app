import userController from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.route('/self').get(userController.getSelf);
router.route('/:id').put(userController.updateUser);
router.route('/:id').delete(userController.deleteUser);

export default router;
