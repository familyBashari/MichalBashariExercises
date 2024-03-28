// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Dialog, DialogContent, DialogTitle } from '@mui/material';
// import { getCovid19ById as getCovid19ByIdApi } from '../services/covid19Details.service';
// import { Covid19DetailsType } from '../types/covid19Details.type';
// import { PatientType } from '../types/patient.types';
// import ImageComponent from '../components/Image/ImageComponent';

// type UpdatePatientProps = {
//   patient: PatientType;
//   onClose: () => void;
// };

// const ShowDetails: React.FC<UpdatePatientProps> = (props) => {
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(true);
//   const [covid19Details, setCovid19Details] = useState<Covid19DetailsType | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data: Covid19DetailsType = await getCovid19ByIdApi(props.patient.id);
//         setCovid19Details(data);
//         console.log(data)
//       } catch (error) {
//         console.error('Error fetching Covid-19 details:', error);
//         console.log(error)
//         alert(error)
//       }
//     }
//     fetchData();
//   }, [props.patient.id]);

//   return (
//     <Dialog open={true} onClose={props.onClose} maxWidth="lg">
//       <DialogTitle>Covid19'details</DialogTitle>
//       <DialogContent>
//         <div className="patient-details-container">
//           <div className="patient-basic-details">
//             <div className="patient-image">
//               <ImageComponent userId={props.patient.id} />
//             </div>
//             <h3>Patient Details</h3>
//             <p>Id: {props.patient.id}</p>
//             <p>First Name: {props.patient.firstName}</p>
//             <p>Last Name: {props.patient.lastName}</p>
//             <p>Address: {props.patient.address.city}, {props.patient.address.street} {props.patient.address.buildingNumber.toString()}</p>
//             <p>Birth Date: {props.patient.birthDate.toString()}</p>
//             <p>Telephone: {props.patient.tel}</p>
//             <p>Mobile Phone: {props.patient.mobilePhone}</p>
//           </div>
//         </div>
//         {covid19Details && (
//           <div>
//             <h3>Covid-19 Details</h3>
//             {covid19Details.positiveTestDate && (
//               <p>Positive Test Date: {covid19Details.positiveTestDate.toString()}</p>
//             )}
//             {covid19Details.recoveryDate && (
//               <p>Recovery Date: {covid19Details.recoveryDate.toString()}</p>
//             )}
//             {covid19Details.vaccineDates.length > 0 && (
//               <div>
//                 <p>Vaccination Dates:</p>
//                 <ul>
//                   {covid19Details.vaccineDates.map((vaccine:any, index:any) => (
//                     <li key={vaccine}>
//                       <p>Date Received: {vaccine.dateReceived.toString()}</p>
//                       <p>Manufacturer: {vaccine.manufacturer}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ShowDetails;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { getCovid19ById as getCovid19ByIdApi } from '../services/covid19Details.service';
import { Covid19DetailsType } from '../types/covid19Details.type';
import { PatientType } from '../types/patient.types';
import ImageComponent from '../components/Image/ImageComponent';

type UpdatePatientProps = {
  patient: PatientType;
  onClose: () => void;
};

const ShowDetails: React.FC<UpdatePatientProps> = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [covid19Details, setCovid19Details] = useState<Covid19DetailsType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: Covid19DetailsType = await getCovid19ByIdApi(props.patient.id);
        setCovid19Details(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching Covid-19 details:', error);
        console.log(error)
        alert(error)
      }
    }
    fetchData();
  }, [props.patient.id]);

  return (
    <Dialog open={true} onClose={props.onClose} maxWidth="lg">
      <DialogTitle>Covid19 Details</DialogTitle>
      <DialogContent>
        <div className="patient-details-container">
          <div className="patient-basic-details">
            <div className="patient-image">
              <ImageComponent userId={props.patient.id} />
            </div>
            <h3>Patient Details</h3>
            <p>Id: {props.patient.id}</p>
            <p>First Name: {props.patient.firstName}</p>
            <p>Last Name: {props.patient.lastName}</p>
            <p>Address: {props.patient.address.city}, {props.patient.address.street} {props.patient.address.buildingNumber.toString()}</p>
            <p>Birth Date: {props.patient.birthDate.toString()}</p>
            <p>Telephone: {props.patient.tel}</p>
            <p>Mobile Phone: {props.patient.mobilePhone}</p>
          </div>
        </div>
        {covid19Details && (
          <div>
            <h3>Covid-19 Details</h3>
            {covid19Details.positiveTestDate && (
              <p>Positive Test Date: {covid19Details.positiveTestDate.toString()}</p>
            )}
            {covid19Details.recoveryDate && (
              <p>Recovery Date: {covid19Details.recoveryDate.toString()}</p>
            )}
            {covid19Details.vaccineDates.length > 0 && (
              <div>
                <p>Vaccination Dates:</p>
                <ul>
                  {covid19Details.vaccineDates.map((vaccine:any, index:any) => (
                    <li key={vaccine}>
                      {vaccine.dateReceived && <p>Date Received: {vaccine.dateReceived.toString()}</p>}
                      {vaccine.manufacturer && <p>Manufacturer: {vaccine.manufacturer}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowDetails;