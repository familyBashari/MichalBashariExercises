import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientType } from '../../types/patient.types';
import { stat } from 'fs';
import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';

type PatientStateType = {
  [x: string]: any;
  patients: PatientType[]
}

const initialState: PatientStateType = {
  patients: [],
  isInitialized: false
}

const patientSlice = createSlice({
  name: 'patients',
  initialState: initialState,
  reducers: {
    addPatient: (state: PatientStateType, action: PayloadAction<PatientType>) => {
      state.patients.push(action.payload)
      return state;
    },
    updatePatient: (state: PatientStateType, action: PayloadAction< PatientType>) => {
      for (let i = 0; i < state.patients.length; i++) {
        if (state.patients[i].id == action.payload.id) {
          state.patients[i] = action.payload
        }
      }
      return state
    },
    deletePatient: (state: PatientStateType, action: PayloadAction<String>) => {
      state.patients = state.patients.filter(patient => patient.id !== action.payload)
      return state;
      },
    setPatients: (state: PatientStateType, action: PayloadAction<PatientType[]>) => {
      state.patients = action.payload; // Update the favorites array with the payload data
      return state;
    },
    setInitializePatients: (state: PatientStateType) => {
      state.isInitialized = true
  }
  }
})


// Export actions and reducer
export const { addPatient,updatePatient, setPatients, deletePatient, setInitializePatients } = patientSlice.actions;
export default patientSlice.reducer;