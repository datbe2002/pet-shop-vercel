import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";

import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Dashboard from "../AdminSection/Dashboard";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../Home/HomePage";
import PetDetailPage from "../Home/PetDetailPage";
import SearchPage from "../Home/SearchPage";
import PetCart from "../Cart/PetCart";
import ProfileSetting from "../UserSection/ProfileSetting";

export default function Router() {
  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <SearchPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/cart",
      element: <PetCart />,
    },
    {
      path: "/pet-detail/:id",
      element: <PetDetailPage />,
    },

    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <ProfileSetting />,
        },
      ],
    },
  ]);
  const location = useLocation();

  if (!element) return null;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}
