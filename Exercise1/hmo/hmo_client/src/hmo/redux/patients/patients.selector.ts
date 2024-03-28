import { RootState } from "../store";

export const selectPatients = (state: RootState) => state.patients.patients

export const isInitialized = (state:any) => state.patients.isInitialized;
