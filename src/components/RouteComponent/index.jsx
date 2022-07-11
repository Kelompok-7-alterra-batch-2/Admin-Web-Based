import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {
  Dashboard,
  Login,
  Patient,
  Appointment,
  Doctor,
  Schedule,
  EditPatient,
  History,
  ForgotPassword,
  NotFound
} from '@/pages'


import { DefaultLayout, PrivateRoute } from '@/components'

export default function RouteComponent() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />

      <Route path='forgotpassword' element={<ForgotPassword />} />
      
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />

          <Route path='patient/'>
            <Route index element={<Patient />} />
            <Route path='edit/:id' element={<EditPatient />} />
          </Route>

          <Route path='appointment' element={<Appointment />} />

          <Route path='doctor' element={<Doctor />} />

          <Route path='schedule' element={<Schedule />} />

          <Route path='history' element={<History />} />

        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    
    </Routes>
  )
}
