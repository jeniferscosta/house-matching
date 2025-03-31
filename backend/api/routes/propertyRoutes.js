import express from 'express';
import { saveUserProperties } from '../../controllers/propertyController.js';

const router = express.Router();

router.post('/save', saveUserProperties);

export default router;
