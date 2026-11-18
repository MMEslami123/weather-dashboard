import type { ReactNode } from "react";
import { isLogin } from "./utils/isLogin";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: ReactNode }) {
    return (
        isLogin() ? children : <Navigate to={"/"} />
    );
}

export default PrivateRoute;