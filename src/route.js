import React from "react";
import {Route, Routes } from "react-router-dom";
import MainLayout from "./main-layout";
import UserForm from "./users/user-form";
import UsersView from "./users/user-view";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/users/user-view" element={<UsersView />} />
        <Route path="/users/user-form" element={<UserForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
