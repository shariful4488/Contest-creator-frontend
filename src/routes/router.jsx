import { createBrowserRouter } from "react-router"; 
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Authlayout from "../layouts/Authlayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import ManageUsers from "../pages/Dashboard/ManageUsers";
// import AddContest from "../pages/Dashboard/AddContest";
// import MyParticipations from "../pages/Dashboard/MyParticipations";
// import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard/Dashboard";
import PrivateRoute from "../provider/PrivateRoute";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "all-contests",
                // element: <AllContests />
            }
        ]
    },
    {
        path: "/auth",
        element: <Authlayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "dashboard",
        element:  <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            // User Routes
            { 
                // path: "my-participated", 
                // element: <MyParticipations /> 
            },
            // Creator Routes
            { 
                // path: "add-contest", 
                // element: <AddContest /> 
            },
            // Admin Routes
            { 
                // path: "manage-users", 
                // element: <ManageUsers /> 
            },
        ]
    },
    {
        path: "*",
        element: (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-9xl font-black text-primary/20">404</h1>
                <p className="text-2xl font-bold text-secondary">Oops! Page not found.</p>
                <a href="/" className="btn btn-primary rounded-xl px-8">Go Back Home</a>
            </div>
        )
    }
]);

export default Router;