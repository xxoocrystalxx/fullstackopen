import express from 'express';
import patientService from '../services/patientService';
import parseService from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = parseService.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientService.getPatientsById(id);
    if (!patient) {
      throw new Error('patient not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = parseService.toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(patient, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientsById(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({
      Error: 'id not found'
    });
  }
});

export default router;
