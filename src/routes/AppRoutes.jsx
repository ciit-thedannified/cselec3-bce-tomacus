import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import ScheduleInterface from "../components/ScheduleInterface.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import ScheduleSettings from "../components/ScheduleSettings.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        )
    },
    {
        path: "/login",
        element: (
            <LoginPage />
        )
    },
    {
        path: "/register",
        element: (
            <SignupPage />
        )
    },
    {
        path: "/dashboard",
        element: (
            <DashboardPage />
        ),
        children: [
            {
                path: "/dashboard/schedule/:scheduleId",
                element: (
                    <ScheduleInterface />
                )
            },
            {
                path: "/dashboard/schedule/new",
                element: <ScheduleSettings editMode={false} />
            },
            {
                path: "/dashboard/schedule/edit/:scheduleId",
                element: <ScheduleSettings editMode={true} />
            },
            {
                path: "/dashboard/profile",
                element: <ProfilePage />
            }
        ]
    }
]);

export default AppRoutes;