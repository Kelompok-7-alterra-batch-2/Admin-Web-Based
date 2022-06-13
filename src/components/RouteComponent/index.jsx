import React from "react";
import { Route, Routes } from "react-router-dom";

import { Dashboard, Login, Patient , Appointment , Doctor} from "pages";

import { DefaultLayout } from "components";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/">

        <Route index element={
        
        <DefaultLayout>
        
          <Dashboard />

        </DefaultLayout>
        
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
      </Route>
    </Routes>
  );
}
