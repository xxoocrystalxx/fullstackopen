import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnose } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Array<Diagnose> = diagnoseService.getDiagnoses();
  return res.send(diagnoses);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
