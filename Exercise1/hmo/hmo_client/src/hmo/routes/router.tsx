import { Navigate, createBrowserRouter } from 'react-router-dom';
import GetAllPatients from '../pages/getAllPatients/GetAllPatients';
import { AddPatientForm } from '../pages/addPatient/addPatient';
import { PATHS } from './paths';
import UpdatePatient from '../pages/UpdatePatient/UpdatePatient';
import ChartComponent from '../pages/Chart';
import AuthGuard from '../auth/authGuard';
import Layout from '../layouts/MainLayout';
import GuestGuard from '../auth/GuestGuard';
import LoginPage from '../pages/login/LoginPage';
import { Sign } from 'crypto';
import SignIn from '../pages/signIn/SignIn';
import { AddCovid19 } from '../pages/addCovid19Details/AddCovid19Details';

export const router = createBrowserRouter([
    {
        path: PATHS.main,
        element: <AuthGuard><Layout /></AuthGuard>,
        children: [       
            {
                path: PATHS.getAllPatients,
                element: <GetAllPatients />,
            },
            {
                path: PATHS.addPatient,
                element: <AddPatientForm />,
                index: true
            },
            {
                path: PATHS.chart,
                element: <ChartComponent />
            },
            {
                path: PATHS.addCovid19Details,
                element: <AddCovid19 />
            }
        ],
    },
    {
        path: PATHS.login,
        element: <GuestGuard><LoginPage /></GuestGuard>,
    },
    {
        path: PATHS.signIn,
        element: <GuestGuard><SignIn /></GuestGuard>,
    },
    {
        path: '*',
        element: <h1>404</h1>
    },
]);