import express from 'express';

const router = express.Router();

router.post('/', async (req, res, next) => {
    return res.json({
        jwtToken: '12345'
    });
});

export default router;
