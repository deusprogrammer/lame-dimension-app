import express from 'express';
import { checkRoles } from '../helpers/SecurityHelper.js';
import Scripts from '../models/script.js';
import { randomUUID } from 'crypto';
const router = express.Router();

router.post('/', async function (req, res, next) {
    
});

router.post('/:id/snapshot', async function (req, res, next) {

});

router.get('/', async function (req, res, next) {

});

router.get('/:id', async function (req, res, next) {
    
});

router.get('/:id/snapshot', async function (req, res, next) {
    
});

router.put('/:id', async function (req, res, next) {
    
});

router.put('/:id/snapshot', async function (req, res, next) {
    
});

export default router;
