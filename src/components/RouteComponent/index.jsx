import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../../pages/Login'
import Dashboard from '../../pages/Dashboard'

export default function RouteComponent() {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<Dashboard/>}/>
            <Route path='login' element={<Login/>}/>
        </Route>
    </Routes>
  )
}
