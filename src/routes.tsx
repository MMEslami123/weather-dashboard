/* eslint-disable react-refresh/only-export-components */
import { lazy, type JSX } from "react"
import PrivateRoute from "./PrivateRoute";

const Login = lazy(() => import("./pages/login/Login"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
interface RouteProps {
    path: string,
    element: JSX.Element
}

export const routes: RouteProps[] = [
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <PrivateRoute><Dashboard /></PrivateRoute> }
]