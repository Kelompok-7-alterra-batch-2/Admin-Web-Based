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
} from '@/pages'

export default function RouteComponent() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Dashboard />} />

        <Route path='patient/'>
          <Route index element={<Patient />} />
          <Route path='edit/:id' element={<EditPatient />} />
        </Route>

        <Route path='appointment' element={<Appointment />} />

        <Route path='doctor' element={<Doctor />} />

        <Route path='schedule' element={<Schedule />} />

        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  )
}
