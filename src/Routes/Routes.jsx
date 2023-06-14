import React from 'react';
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import Login from '../Pages/Login/Login';
import Classes from '../Pages/Classes/Classes';
import Instructors from '../Pages/Instructors/Instructors';
import Dashboard from '../Pages/Dashboard/Dashboard/Dashboard';
import SelectedClasses from '../Pages/Dashboard/SelectedClasses/SelectedClasses';
import EnrolledClasses from '../Pages/Dashboard/EnrolledClasses/EnrolledClasses';
import PrivateRoute from '../Hooks/PrivateRoute/PrivateRoute';
import ManageClasses from '../Pages/Dashboard/ManageClasses/ManageClasses';
import ManageUsers from '../Pages/Dashboard/ManageUsers/ManageUsers';
import AddAClass from '../Pages/Dashboard/Dashboard/AddAClass/AddAClass';
import MyClasses from '../Pages/Dashboard/MyClasses/MyClasses';
import ManageAllUsers from '../Pages/Dashboard/ManageAllUsers/ManageAllUsers';
import AllDashboard from '../Pages/Dashboard/AllDashboard/AllDashboard';
import UpdateClass from '../Pages/Dashboard/UpdateClass/Updateclass';
import Payment from '../Pages/Dashboard/Payment/Payment';
import AdminRoute from './AdminRoute';



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><AllDashboard></AllDashboard></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard/selectedclasses',
                        element: <SelectedClasses></SelectedClasses>
                    },
                    {
                        path: '/dashboard/enrolledclasses',
                        element: <EnrolledClasses></EnrolledClasses>
                    },
                    {
                        path: '/dashboard/manageclasses',
                        element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
                    },
                    {
                        path: '/dashboard/manageusers',
                        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
                    },
                    {
                        path: '/dashboard/manageallusers',
                        element: <ManageAllUsers></ManageAllUsers>
                    },
                    {
                        path: '/dashboard/addclass',
                        element: <AddAClass></AddAClass>
                    },
                    {
                        path: '/dashboard/myclasses',
                        element: <MyClasses></MyClasses>
                    },
                    {
                        path: '/dashboard/updateclass/:id',
                        element: <UpdateClass></UpdateClass>,
                        loader: ({ params }) => fetch(`http://localhost:5000/newclasses/${params.id}`)
                    },
                    {
                        path: '/dashboard/payment',
                        element: <Payment></Payment>
                    }
                ]
            }

        ]
    },
]);