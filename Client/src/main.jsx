import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ErrorPage from "./pages/Errorpage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import ManageUser from "./pages/ManageUser.jsx";
import User from "./pages/User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/signup",
    element: <SignUp/>
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  {
    path:"/manage-users",
    element: <ManageUser/>
  },
  {
    path:"/admin/user/:id",
    element: <User/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
