

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitializePatients, setPatients } from '../../redux/patients/patient.slice';
import { getPatients } from '../../services/patient.service';
import { isInitialized, selectPatients } from '../../redux/patients/patients.selector';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './getAllPatients.scss';
import { PatientType } from '../../types/patient.types';
import ImageComponent from '../../components/Image/ImageComponent';
import UpdatePatient from '../UpdatePatient/UpdatePatient';
import DeletePatient from '../../components/DeletePatient';
import ShowDetails from '../ShowDetails';

const CombinedComponent = () => {
  const dispatch = useDispatch();
  const patients = useSelector(selectPatients);
  const initialized = useSelector(isInitialized);
  const [loading, setLoading] = useState(true);
  const [selectedForUpdate, setSelectedForUpdate] = useState<PatientType | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<PatientType | null>(null);
  const [selectedForShowCovid19, setSelectedForShowCovid19] = useState<PatientType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPatients = await getPatients();
        dispatch(setPatients(fetchedPatients));
        dispatch(setInitializePatients())
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setLoading(false);
      }
    }

    if (!initialized) { 
      fetchData();
    }

  }, [dispatch, initialized]);

  const handleUpdateClick = (patient: PatientType) => {
    setSelectedForUpdate(patient);
  };

  const handleDeleteClick = (patient: PatientType) => {
    setSelectedForDelete(patient);
  };

  const handleClickShow = (patient: PatientType) => {
    setSelectedForShowCovid19(patient);
  };

  const handleUpdateClose = () => {
    setSelectedForUpdate(null);
  };

  const handleUpdateCloseForShow = () => {
    setSelectedForShowCovid19(null);
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Patients Information</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">City</th>
            <th scope="col">Street</th>
            <th scope="col">Building Number</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Tel</th>
            <th scope="col">MobilePhone</th>
            <th scope="col">Profile Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(patients) && patients && patients.map((p) => (
            <tr key={p.id}>
              <td onClick={() => handleClickShow(p)}>{p.id}</td>
              <td onClick={() => handleClickShow(p)}>{p.firstName}</td>
              <td onClick={() => handleClickShow(p)}>{p.lastName}</td>
              <td onClick={() => handleClickShow(p)}>{p.address && p.address.city ? p.address.city : 'N/A'}</td>
              <td onClick={() => handleClickShow(p)}>{p.address && p.address.street ? p.address.street : 'N/A'}</td>
              <td onClick={() => handleClickShow(p)}>{p.address && p.address.buildingNumber ? p.address.buildingNumber.toString() : 'N/A'}</td>
              <td onClick={() => handleClickShow(p)}>{p.birthDate ? new Date(p.birthDate).toLocaleDateString() : 'N/A'}</td>
              <td onClick={() => handleClickShow(p)}>{p.tel ? p.tel : 'Nan'}</td>              
              <td onClick={() => handleClickShow(p)}>{p.mobilePhone}</td>
              <td><ImageComponent userId={p.id} /></td>
              <td>
                <button onClick={() => handleUpdateClick(p)}>Update Patient</button>
                <button onClick={() => handleDeleteClick(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedForShowCovid19 && <ShowDetails patient={selectedForShowCovid19} onClose={handleUpdateCloseForShow} />}
      {selectedForUpdate && <UpdatePatient patient={selectedForUpdate} onClose={handleUpdateClose} />}
      {selectedForDelete && <DeletePatient patient={selectedForDelete} />}
    </div>
  );
};

export default CombinedComponent;
