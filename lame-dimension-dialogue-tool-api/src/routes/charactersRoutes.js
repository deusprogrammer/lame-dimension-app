import express from 'express';
import { processAssets } from '../data/assetProcessor.js';
const router = express.Router();

let characters = processAssets(process.env.LD_ASSET_DIRECTORY + '/assets');

router.get("/", (req, res) => {
    return res.json(characters);
});

export default router;