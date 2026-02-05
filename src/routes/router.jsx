import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Authlayout from "../layouts/Authlayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Dashboard Pages

import ManageUsers from "../pages/AdminDashboard/ManageUsers"; 
import Dashboard from "../layouts/Dashboardlayout/Dashboardlayout";
// import AddContest from "../pages/Dashboard/AddContest";
// import MyParticipations from "../pages/Dashboard/MyParticipations";

// Protection Routes

import AdminRoute from "./AdminRoute";
import PrivateRoute from "../provider/PrivateRoute";
import ManageContests from "../pages/AdminDashboard/ManageContests";
import AddContest from "../pages/ManagerDashboard/AddContest";
import MyCreatedContests from "../pages/ManagerDashboard/MyCreatedContests";
import MyParticipated from "../pages/UserDashboard/MyParticipated";
import MyWinnings from "../pages/UserDashboard/MyWinnings";
import MyProfile from "../pages/UserDashboard/MyProfile";



const Router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "all-contests", element: <div className="py-20 text-center">All Contests Coming Soon...</div> }
        ]
    },
    {
        path: "/auth",
        element: <Authlayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            // Admin Only Route 
            { 
                path: "manage-users", 
                element: <AdminRoute><ManageUsers /></AdminRoute> 
            },
            { 
                path: "manage-contests", 
                element: <AdminRoute><ManageContests /></AdminRoute> 
            },
            {
                path:"myCreated-contests",
                element:<MyCreatedContests/>
            },
            
            // Creator Routes
            {
                path: "add-contest",
                element:<AddContest/>

            },
           
            // User Routes
            {
                path: "my-participated",
                role:"user",
                element:<MyParticipated/>
            },
            {
                path: "my-winnings",
                element:<MyWinnings/>
            },
            {
                path: "profile",
                element:<MyProfile/>
            }
            
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