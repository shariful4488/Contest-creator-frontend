import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
// import AllContests from "../pages/AllContests/AllContests";
// import ContestDetails from "../pages/ContestDetails/ContestDetails";

// import PrivateRoute from "./PrivateRoute";
import Authlayout from "../layouts/Authlayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
                element: <AllContests />
            },
            {
                path: "contest/:id",
                element: (
                    <PrivateRoute>
                        <ContestDetails />
                    </PrivateRoute>
                ),
                // TanStack Query ব্যবহার করলে লোডার না দিলেও চলে, 
                // তবে রিকোয়ারমেন্ট অনুযায়ী ডাটা ফেচিং পরে সেট করা যাবে।
            },
            {
                path: "leaderboard",
                element: <div className="py-20 text-center text-3xl">Leaderboard Coming Soon...</div>
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
        element: (
            <PrivateRoute>
                <div className="py-20 text-center text-3xl font-black">Dashboard Layout (Step 4 এ করব)</div>
            </PrivateRoute>
        ),
        children: [
            // এখানে অ্যাডমিন, ক্রিয়েটর এবং ইউজার রুটগুলো আসবে
        ]
    },
    {
        path: "*",
        element: (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-9xl font-black text-primary/20">404</h1>
                <p className="text-2xl font-bold text-secondary">Oops! Page not found.</p>
                <button className="btn btn-primary rounded-xl px-8">Go Back Home</button>
            </div>
        )
    }
]);

export default Router;