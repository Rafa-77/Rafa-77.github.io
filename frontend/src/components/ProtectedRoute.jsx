import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // 1. Llamamos a auth()
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    // 2. auth() vera si tenemos un token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    // 3. si tenemos un token y no esta expirado, ponemos setIsAuthorized = true
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      // 4. si esta expirado llamamos a refreshToken
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  // 5. si a pesar de haber llamado a refresh token no esta autorizado regresamos a login
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
