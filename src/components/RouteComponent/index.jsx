import React from "react";
import { Route, Routes } from "react-router-dom";

import { Dashboard, Login, Patient , Appointment , Doctor, ForgotPassword} from "pages";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/">

        <Route index element={
        
          <Dashboard />
        
        } />
      
        <Route path="patient" element={

              <Patient/>

        }/>

        <Route path="appointment" element={

              <Appointment/>

        }/>
          
        <Route path="doctor" element={
          
              <Doctor />
              
        }/>


        <Route path="login" element={<Login />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}
