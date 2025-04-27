import { Navigate } from "react-router-dom";
import { USER_API } from "./url";
import axios from "axios";
import React , { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [message , setMessage] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const getUser = async () => {
      try {
        const res = await axios.get(`${USER_API}/protected`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setMessage(res.data.msg);
        setIsAuthenticated(true);
      }catch(e){
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }

    };

    getUser();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return React.cloneElement(children, { message });
};

export default ProtectedRoute;
