import React, { useState } from 'react';
import axios from 'axios';
('@material-ui/core');
import Button from '@mui/material/Button';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import { updatePatient } from '../state';
import EntryList from './EntryList';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../types';

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams() as {
    id: string;
  };

  React.useEffect(() => {
    const fetchPatientbyId = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patient));
        setPatient(patient);
      } catch (e) {
        console.error(e);
      }
    };
    const find = Object.values(patients).find((p) => p.id === id);
    if ((find && !find.ssn) || !patients[id]) {
      void fetchPatientbyId();
    } else {
      setPatient(find);
    }
  }, [dispatch]);

  if (!patient) return null;

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      setPatient(updatedPatient);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>
        {patient.name}{' '}
        {patient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}
      </h2>
      <div> ssn: {patient.ssn} </div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries && <EntryList entries={patient.entries} />}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        ADD NEW ENTRY
      </Button>
    </div>
  );
};

export default PatientPage;
