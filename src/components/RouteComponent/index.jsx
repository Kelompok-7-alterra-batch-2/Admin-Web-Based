import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "pages";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
