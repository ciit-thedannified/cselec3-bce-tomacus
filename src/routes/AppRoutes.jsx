import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
// import DashboardPage from "../pages/DashboardPage.jsx";
// import ScheduleInformation from "../components/ScheduleInformation.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";

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
]);

export default AppRoutes;