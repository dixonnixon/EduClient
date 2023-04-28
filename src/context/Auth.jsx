import { createContext, useContext  } from "react";
import { useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { appAuthProvider } from '../auth.js';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthStatus = function () {
    let auth = useAuth();
    let navigate = useNavigate();
  
    if (!auth.user) {
      return <p>You are not logged in.</p>;
    }
  
    return (
      <p>
        Welcome {auth.user}!{" "}
        <button
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          Sign out
        </button>
      </p>
    );
  }


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    let signin = (newUse, callback) => {
        return appAuthProvider.signin(() => {
          setUser(newUser);
          callback();
        });
      };

    let signout = (callback) => {
        return appAuthProvider.signout(() => {
          setUser(null);
          callback();
        });
    };


    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();
  
    if (!user) {
      return (
        <Navigate
          to={{ pathname: "/unauthorized", state: { from: location } }}
          replace
        />
      );
    }
  
    return <Outlet />;
};