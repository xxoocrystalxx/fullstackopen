('@material-ui/core');
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from '../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const healthCheckColor = {
  0: { color: '#32CD32' },
  1: { color: '#FFFF33' },
  2: { color: '#FF9A33' },
  3: { color: '#FF3333' }
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => (
  <div>
    <div>
      {entry.date} <MedicalServicesIcon />
    </div>
    <div>
      <i>{entry.description}</i>
    </div>
    <div>
      <FavoriteIcon sx={healthCheckColor[entry.healthCheckRating]} />
    </div>
    <div>diagnose by {entry.specialist}</div>
  </div>
);

const OccupationalHealthcare = ({
  entry
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <div>
    <div>
      {entry.date} <WorkIcon /> <i>{entry.employerName}</i>
    </div>
    <div>
      <i>{entry.description}</i>
    </div>
    <div>diagnose by {entry.specialist}</div>
  </div>
);

const Hospital = ({ entry }: { entry: HospitalEntry }) => (
  <div>
    <div>
      {entry.date} <LocalHospitalIcon />
    </div>
    <div>
      <i>{entry.description}</i>
    </div>
    <div>
      {entry.discharge.date} {entry.discharge.criteria}
    </div>
    <div>diagnose by {entry.specialist}</div>
  </div>
);

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'Hospital':
      return <Hospital entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
