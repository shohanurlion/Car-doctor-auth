import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProviders"
import { Navigate, useLocation } from 'react-router';
const PrivetRoute = ({children}) => {
    const {user , loading}= useContext(AuthContext);
    const location = useLocation();
    // console.log(location.pathname);
    
    if(loading) {
        return <progress className="progress w-56"></progress>
    }

    if(user?.email){
        return children;
    }
  return  <Navigate state={location.pathname} to="/loging" replace></Navigate>;
}

export default PrivetRoute