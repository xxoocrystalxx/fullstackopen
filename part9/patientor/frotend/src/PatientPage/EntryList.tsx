('@material-ui/core');
import Box from '@mui/material/Box';
import { Entry } from '../types';
import { useStateValue } from '../state';
import EntryDetails from './EntryDetails';

const EntryList = ({ entries }: { entries: Entry[] }) => {
  const [{ diagnosis }] = useStateValue();
  if (Object.entries(diagnosis).length === 0) {
    return null;
  }
  return (
    <div>
      {entries.map((e) => (
        <Box
          key={e.id}
          sx={{
            border: 1,
            boxShadow: 1,
            borderRadius: 2,
            padding: 1,
            marginBottom: 1
          }}
        >
          <EntryDetails entry={e} />
          <ul>
            {e.diagnosisCodes?.map((d) => (
              <li key={d}>
                {d} {diagnosis[d].name}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </div>
  );
};

export default EntryList;
