import express from 'express';
import { saveUserLocation } from '../../controllers/locationController.js';

const router = express.Router();

router.post('/save', saveUserLocation);

export default router;
