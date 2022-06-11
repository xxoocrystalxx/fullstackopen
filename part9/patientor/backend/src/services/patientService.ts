import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';
// const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsById = (id: string): Patient | undefined => {
  return patients.find((p: Patient) => p.id === id);
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const id: string = uuid();
  const newEntry = {
    id,
    ...entry
  };
  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat(newEntry)
  };

  console.log(updatedPatient);
  return updatedPatient;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  getPatientsById,
  addEntry
};
