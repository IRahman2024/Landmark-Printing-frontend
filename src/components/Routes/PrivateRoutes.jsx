import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const PrivateRoutes = ({ children }) => {

    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location.pathname);
    

    if(loader){
        return <span className="loading loading-spinner loading-md"></span>
    }

    if(user){
        return children;
    }

    return <Navigate state={location.pathname} to ='/login'></Navigate>;
};

export default PrivateRoutes;