

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './UpdateForm.css'; // קובץ CSS עבור עיצוב הטופס
import { PatientType } from '../../types/patient.types';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePatient as updatePatientApi } from '../../services/patient.service';
import { updatePatient } from '../../redux/patients/patient.slice';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

type UpdatePatientProps = {
  patient: PatientType;
  onClose: () => void;
};

export default function UpdatePatient(props: UpdatePatientProps) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    address: yup.object().shape({
      city: yup.string(),
      street: yup.string(),
      buildingNumber: yup.number().positive().transform((value, originalValue) => {
        if (originalValue === "") return null;
        return value;
      }).nullable()
    }),
    birthDate: yup.date().nullable().transform((value, originalValue) => {
      if (!originalValue) return null;
      return value;
    }),
    tel: yup.string(),
    mobilePhone: yup.string()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleUpdate = async (data: any) => {
    try {
      const patientToUpdate: any = { id: props.patient.id };

      for (const [key, value] of Object.entries(data)) {
        if (value !== "" && value !== null) {
          if (key === 'address' && typeof value === 'object') {
            patientToUpdate.address = { ...value };
          } else {
            patientToUpdate[key] = value;
          }
        }
      }

      const response = await updatePatientApi(patientToUpdate);
      dispatch(await updatePatient(response));
      props.onClose(); // Close the dialog after successful update
    } catch (error) {
      console.error("Update error:", error);
      alert("error was according by update patients")
    }
  };

  return (
    <Dialog open={open} onClose={props.onClose}>
      <DialogTitle>Update Patient</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <input type="text" placeholder='First Name' {...register("firstName")} />
          <p>{errors.firstName?.message}</p>
          <input type="text" placeholder='Last Name' {...register("lastName")}  />
          <p>{errors.lastName?.message}</p>
          <input type="text" placeholder='City' {...register("address.city")} />
          <p>{errors.address?.city?.message}</p>
          <input type="text" placeholder='Street' {...register("address.street")}/>
          <p>{errors.address?.street?.message}</p>
          <input type="number" placeholder='Building Number' {...register("address.buildingNumber")} />
          <p>{errors.address?.buildingNumber?.message}</p>
          <input type="Date" placeholder='Birth Date' {...register("birthDate")}/>
          <p>{errors.birthDate?.message}</p>
          <input type="text" placeholder='Tel' {...register("tel")} />
          <p>{errors.tel?.message}</p>
          <input type="text" placeholder='Mobile Phone' {...register("mobilePhone")} />
          <p>{errors.mobilePhone?.message}</p>
          <input type="submit" />
        </form>
      </DialogContent>
    </Dialog>
  );
}