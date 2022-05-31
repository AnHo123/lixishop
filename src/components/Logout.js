import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../App";

function Logout() {
    const {setIsLogged} = useContext(AppContext)

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setIsLogged(false);
    
    return (
        <Navigate to="/login" replace={true}/>
    )
}

export default Logout