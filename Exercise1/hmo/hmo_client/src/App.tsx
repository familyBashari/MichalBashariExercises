import React from 'react';
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Api from './hmo/pages/getAllPatients/GetAllPatients';
import { store } from './hmo/redux/store';
import { router } from './hmo/routes/router';
import InitializeAuth from './hmo/auth/InitializeAuth';

function App() {
  
  return (
    <>
    <Provider store={store}>
      <InitializeAuth>
        <RouterProvider router={router} />
      </InitializeAuth>
    </Provider>
    </>
  );
}

export default App;
