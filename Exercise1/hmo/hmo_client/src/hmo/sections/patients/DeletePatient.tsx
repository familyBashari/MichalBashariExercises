
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deletePatient as deletePatientApi } from '../../services/patient.service';
import { deletePatient } from '../../redux/patients/patient.slice';
import { PatientType } from '../../types/patient.types';

type DeletePatientProps = {
  patient: PatientType;
};

const DeletePatient: React.FC<DeletePatientProps> = ({ patient }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
          await deletePatientApi(patient.id);
          dispatch(deletePatient(patient.id));
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert("error was according by delete patient")
      }
    };

    fetchData();
  }, [dispatch, patient.id]);

  return null;
};

export default DeletePatient;