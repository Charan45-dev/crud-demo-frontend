import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserForm from "../src/users/user-form";
import UsersView from "./users/user-view";
import MainLayout from "./main-layout";
import AppRoutes from "./route";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
