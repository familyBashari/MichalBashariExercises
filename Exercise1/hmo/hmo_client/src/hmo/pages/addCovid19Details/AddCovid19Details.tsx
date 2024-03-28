
import React from 'react';
import { useForm } from 'react-hook-form';
import { addCovid19Api } from '../../services/covid19Details.service';
import './addCovid19Details.scss';

export const AddCovid19 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data:any) => {
    // צור מערך של כל הזוגות של תאריך חיסון ויצירת חיסון
    const vaccines = [];
    for (let i = 0; i < 4; i++) {
      if (data[`vaccineDates[${i}].date`] && data[`vaccineDates[${i}].manufacturer`]) {
        vaccines.push({
          date: data[`vaccineDates[${i}].date`],
          manufacturer: data[`vaccineDates[${i}].manufacturer`]
        });
      }
    }

    data.vaccineData = vaccines;

    try {
      await addCovid19Api(data);
      alert("Covid-19 details added successfully!");
    } catch (error) {
      alert("Error occurred while adding Covid-19 details: " + error);
    }
  };

  return (
    <div className="add-covid19-form">
      <h2>Add Covid-19 Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="patientId">patientId:</label>
          <input id="patientId" type="text" {...register('patientId')} />
          {errors.patientId && <span className="error-message">patientId is required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="positiveTestDate">Positive Test Date:</label>
          <input id="positiveTestDate" type='date' {...register('positiveTestDate')} />
          {errors.positiveTestDate && <span className="error-message">Positive Test Date is required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="recoveryDate">Recovery Date:</label>
          <input id="recoveryDate" type='date' {...register('recoveryDate')} />
          {errors.recoveryDate && <span className="error-message">Recovery Date is required</span>}
        </div>

        {[...Array(4)].map((_, index) => (
          <div key={index} className="vaccine-details">
            <h3>Vaccine {index + 1} Details</h3>
            <div className="form-group">
              <label htmlFor={`vaccineDate${index + 1}`}>Vaccine Date:</label>
              <input id={`vaccineDate${index + 1}`} type='date' {...register(`vaccineDates[${index}].date`)} />
              {errors[`vaccineDates[${index}].date`] && <span className="error-message">Vaccine Date is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor={`vaccineManufacturer${index + 1}`}>Vaccine Manufacturer:</label>
              <input id={`vaccineManufacturer${index + 1}`} {...register(`vaccineDates[${index}].manufacturer`)} />
              {errors[`vaccineDates[${index}].manufacturer`] && <span className="error-message">Vaccine Manufacturer is required</span>}
            </div>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};