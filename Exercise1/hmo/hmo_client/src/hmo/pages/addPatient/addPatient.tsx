
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addPatient as addPatientApi} from "../../services/patient.service";
import { addPatient, setPatients } from "../../redux/patients/patient.slice";
import { SyntheticEvent, useState } from "react";
import './addPatient.scss';

export const AddPatientForm = () => {
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        id: yup.string().matches(/^\d{9}$|^\d{1}-\d{2}-\d{7}$/, 'Invalid Israeli ID').required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        address: yup.object().shape({
            city: yup.string().required(),
            street: yup.string().required(),
            buildingNumber: yup.number().positive().required()
        }),
        birthDate: yup.date().max(new Date(), "Date must be less than or equal to today").min(new Date(new Date().setFullYear(new Date().getFullYear() - 120)), "Date must be within the last 120 years").required(),
        tel: yup.string().test('phone-number', 'Phone number is not valid', (value) => {
          if (!value || value.length === 0) return true; // אם הערך ריק, התקבל
          return /^\d{7}$/.test(value); // בדיקה שהערך מכיל 10 ספרות
      }),
        mobilePhone: yup.string().required().matches(/^\d{10}$/, 'Mobile phone number is not valid'),
        image: yup.mixed()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [imageUrl, setImageUrl] = useState('');

    const previewHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setImageUrl(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const handleRegistration = async (data:any) => {
        try{
          const formData=new FormData();
          formData.append("id",data.id)
          formData.append("firstName",data.firstName)
          formData.append("lastName",data.lastName)
          formData.append("address.city",data.address.city)
          formData.append("address.street",data.address.street)
          formData.append("address.buildingNumber",data.address.buildingNumber)
          formData.append("birthDate",data.birthDate)
          formData.append("tel",data.tel)
          formData.append("mobilePhone",data.mobilePhone)
          if (data.image[0]) {
            formData.append("image", data.image[0]);
          }
          const res = await addPatientApi(formData)
          debugger
          if(res) 
            dispatch(addPatient(data))

            // dispatch(setPatients(res))
          alert("you add patient successfully");
        }
        catch(error:any)
        {
          if(error.response)
          alert(error.response.data)
          console.log(error)
        }
    };

    return (
      <div className="register-form-container">
          <form onSubmit={handleSubmit(handleRegistration)}>            
              <h1 className="form-title">Register</h1>
  
              <input type="text" placeholder="id..." {...register("id")} className="form-input" />
              <p className="error-message">{errors.id?.message}</p>
  
              <input type="text" placeholder="firstName..." {...register("firstName")} className="form-input" />
              <p className="error-message">{errors.firstName?.message}</p>
  
              <input type="text" placeholder="lastName..." {...register("lastName")} className="form-input" />
              <p className="error-message">{errors.lastName?.message}</p>
  
              <input type="text" placeholder="City..." {...register("address.city")} className="form-input" />
              <p className="error-message">{errors.address?.city?.message}</p>
  
              <input type="text" placeholder="Street..." {...register("address.street")} className="form-input" />
              <p className="error-message">{errors.address?.street?.message}</p>
  
              <input type="number" placeholder="Building Number..." {...register("address.buildingNumber")} className="form-input" />
              <p className="error-message">{errors.address?.buildingNumber?.message}</p>
  
              <input type="Date" placeholder="birth date..." {...register("birthDate")} className="form-input" />
              <p className="error-message">{errors.birthDate?.message}</p>
  
              <input type="text" placeholder="tel..." {...register("tel")} className="form-input" />
              <p className="error-message">{errors.tel?.message}</p>
  
              <input type="text" placeholder="mobilePhone..." {...register("mobilePhone")} className="form-input" />
              <p className="error-message">{errors.mobilePhone?.message}</p>
  
              <input type="file" {...register("image")} onChange={previewHandler} className="form-input" />
              {imageUrl && <img src={imageUrl} alt="Preview Image" className="preview-image" />}
  
              <input type="submit" className="submit-button" />
          </form>
      </div>
  );
};

