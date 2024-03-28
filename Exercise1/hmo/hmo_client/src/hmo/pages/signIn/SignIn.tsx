import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './signIn.scss'; // קובץ CSS עבור עיצוב הטופס
import { addStaff } from "../../services/staff.service";
import { login } from "../../services/auth.service";
import { setStaff } from "../../redux/auth/auth.slice";
import { setSession } from "../../auth/auth.utils";
import { useAppDispatch } from "../../redux/store";
import { PATHS } from "../../routes/paths";

const schema = yup.object().shape({
  id: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
});

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const dispatch = useAppDispatch();

  const handleoNSubmit = async (data: any) => {
    try {
        const staffPerson = await addStaff(data);
        const authStaff = await login(data.id, data.password);
        dispatch(setStaff(authStaff.staff));
        setSession(authStaff);
    } catch (error:any) {
      if(error.response)
        alert(error.response.data)
      else
        alert("error accurding by SignIn")
      console.log(error);
    }
};

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(handleoNSubmit)} className="signin-form">
        <div className="input-container">
          <input {...register("id")} placeholder="ID" className="input-field" />
          {errors.id && <p className="error-message">{errors.id.message}</p>}
        </div>
        <div className="input-container">
          <input {...register("firstName")} placeholder="First Name" className="input-field" />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>
        <div className="input-container">
          <input {...register("lastName")} placeholder="Last Name" className="input-field" />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>
        <div className="input-container">
          <input {...register("password")} type="password" placeholder="Password" className="input-field" />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default SignIn;

