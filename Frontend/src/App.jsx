import React from "react";
import HomePage from './Component/HomePage';
import VideoEdit from "./Component/VideoEdit";
import AskAI from './Component/AskAI';
import Contact from "./Component/ContactUs";
import LogIn from "./Component/LogIn";
import ClassNine from './Component/ClassNine';
import ClassTen from "./Component/ClassTen";
import ClassEleven from "./Component/ClassEleven"
import ClassTwelve from "./Component/ClassTwelve";
import Error404 from "./Component/Error404";
import SignUp from './Component/SignUp'
import Profile from "./Component/Profile";
import PasswordUpdate from "./Component/PasswordUpdate";
import UpdateUser from './Component/UpdateUser';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Logout from "./Component/Logout";

function App() {
  const navbarRouter = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />
    },
    {
      path: "/home",
      element: <HomePage />
    },
    {
      path: '/editvideo',
      element: <VideoEdit />
    },
    {
      path: "/askai",
      element: <AskAI />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: '/classnine',
      element: <ClassNine />

    },
    {
      path: '/classten',
      element: <ClassTen />
    },
    {
      path: '/classeleven',
      element: <ClassEleven />
    },
    {
      path: '/classtwelve',
      element: <ClassTwelve />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/updatedata',
      element: <UpdateUser />
    },
    {
      path: '/forgotpas',
      element: <PasswordUpdate />
    },
    {
      path: '*',
      element: <Error404 />
    },
    {
      path: '/logout',
      element: <Logout />
    }
  ])
  return (
    <>
      <RouterProvider router={navbarRouter} />
    </>
  );
}

export default App;