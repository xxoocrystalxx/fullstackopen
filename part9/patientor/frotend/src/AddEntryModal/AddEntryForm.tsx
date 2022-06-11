import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  SelectField,
  HealthOption,
  EntryTypeOption,
  DiagnosisSelection
} from '../AddPatientModal/FormField';
import { HealthCheckRating, EntryFormValues } from '../types';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthOptions: HealthOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.Healthy, label: 'Healthy' }
];

const entryTypeOptions: EntryTypeOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'Hospital', label: 'Hospital' }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: entryTypeOptions[0].value,
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        startDate: '',
        endDate: '',
        dischargeDate: '',
        criteria: ''
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="TypeOfEntry"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            {values.type === 'HealthCheck' ? (
              <SelectField
                label="HealtchCheck"
                name="healthCheckRating"
                options={healthOptions}
              />
            ) : values.type === 'OccupationalHealthcare' ? (
              <div>
                <Field
                  label="EmployerName"
                  placeholder="EmployerName"
                  name="employerName"
                  component={TextField}
                />
                {!values.employerName && (errors.employerName = 'is required')}
                <Field
                  label="date start sick"
                  placeholder="YYYY-MM-DD"
                  name="startDate"
                  component={TextField}
                />
                <Field
                  label="date leave"
                  placeholder="YYYY-MM-DD"
                  name="endDate"
                  component={TextField}
                />
              </div>
            ) : (
              <div>
                <Field
                  label="date discharge"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                {!values.dischargeDate &&
                  (errors.dischargeDate = 'is required')}
                <Field
                  label="criteria discharge"
                  placeholder="criteria"
                  name="criteria"
                  component={TextField}
                />
                {!values.criteria && (errors.criteria = 'is required')}
              </div>
            )}

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right'
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
