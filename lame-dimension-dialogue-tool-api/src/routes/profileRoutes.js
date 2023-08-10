import userController from '../controllers/userController';
import express from 'express';

const router = express.Router();

router.route('/self').get(userController.getSelf);

export default router;
