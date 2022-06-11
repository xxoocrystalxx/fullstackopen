import diagnoseData from '../../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

const addDiary = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiary
};
