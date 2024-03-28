import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitializePatients, setPatients} from '../../redux/patients/patient.slice'
import { isInitialized, selectPatients } from '../../redux/patients/patients.selector';
import { getPatients as getPatientsApi} from '../../services/patient.service';
import { getCovid19 as getCovid19Api} from '../../services/covid19Details.service';
export default function NumberOfNoVaccinated() {
  
  const patients = useSelector(selectPatients);
  const initialized = useSelector(isInitialized); 
  const [vaccinatedCount, setVaccinatedCount] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPatients = await getPatientsApi();
        dispatch(setPatients(fetchedPatients));
        // We will wait to ensure that the data is saved in redox before dispatching the `setInitialize` action
        dispatch(setInitializePatients());
      } catch (error) {
        console.error('Error fetching patients:', error);
        alert("There was an error while fetching patients")
      }
    }
    //If the redux is still not initialized
    if (!initialized) { 
      fetchData();
    }
    console.log(initialized)

  }, [dispatch, initialized]);

  
  useEffect(() => {
    async function vac() {
      try{
        if (initialized && patients.length > 0) {
          const res = await getCovid19Api();
          let count = 0;
          res.forEach((item: { vaccineDates: string | any[]; }) => {
            if (item.vaccineDates.length>0) {
              count++;
            }
          });
          setVaccinatedCount(count);
        }
      }catch(error){
        alert(error)
      }
    }
    vac();

  }, [patients, initialized]);


  return (
    <div>
      {initialized ? (
       <p>The number of no vaccinated members is: {patients.length-vaccinatedCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

