import {
  NewPatient,
  Gender,
  NewEntry,
  HealthCheckRating,
  NewBaseEntry,
  Diagnose
} from './types';

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };

  return newEntry;
};

type EntryField = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  type: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  startDate: unknown;
  endDate: unknown;
  dischargeDate: unknown;
  criteria: unknown;
};

const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
  employerName,
  startDate,
  endDate,
  dischargeDate,
  criteria
}: EntryField): NewEntry => {
  const newEntry: NewBaseEntry = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: parseDiagnosis(diagnosisCodes)
  };
  switch (type) {
    case 'HealthCheck':
      const healthEntry: NewEntry = {
        ...newEntry,
        type,
        healthCheckRating: parseHealthRating(healthCheckRating)
      };
      return healthEntry;
    case 'OccupationalHealthcare':
      const occupationalEntry: NewEntry = {
        ...newEntry,
        type,
        employerName: parseString(employerName),
        sickLeave: {
          startDate: parseDate(startDate),
          endDate: parseDate(endDate)
        }
      };
      return occupationalEntry;
    case 'Hospital':
      const hospitalEntry: NewEntry = {
        ...newEntry,
        type,
        discharge: {
          date: parseDate(dischargeDate),
          criteria: parseString(criteria)
        }
      };
      return hospitalEntry;
    default:
      throw new Error('type error');
  }
};

const parseHealthRating = (health: unknown): HealthCheckRating => {
  if (health === undefined || !isHealthCheckRating(health)) {
    throw new Error('Incorrect or missing health rating: ' + health);
  }
  return health;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing comment');
  }

  return name;
};

const parseDiagnosis = (code: unknown): Array<Diagnose['code']> => {
  if (!code || !isDiagnosis(code)) {
    throw new Error('Incorrect or missing diagnosiscode' + code);
  }
  return code;
};

const isDiagnosis = (param: unknown): param is Array<Diagnose['code']> => {
  return (param as Diagnose) !== undefined;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default {
  toNewPatient,
  toNewEntry
};
