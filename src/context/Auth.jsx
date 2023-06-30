// import { createContext, useContext  } from "react";
import { createContext, useEffect, useState,  useContext } from "react";
import { useLocation, Navigate, Outlet  } from "react-router-dom";

// import { appAuthProvider } from '../auth.js';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

// export const AuthStatus = function () {
//     let auth = useAuth();
//     let navigate = useNavigate();
  
//     if (!auth.user) {
//       return <p>You are not logged in.</p>;
//     }
  
//     return (
//       <p>
//         Welcome {auth.user}!{" "}
//         <button
//           onClick={() => {
//             auth.signout(() => navigate("/"));
//           }}
//         >
//           Sign out
//         </button>
//       </p>
//     );
//   }


// function AuthProvider (props) {
function AuthProvider ({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true);


    
    // const [user, setUser] = useState(null);

    useEffect(() => {
      const storedJwt = localStorage.getItem("jwt");

      console.log("storedJwt", storedJwt, isLoggedIn)
      if (storedJwt) {
        setIsLoggedIn(true);
        setToken(storedJwt);
      }
      setIsLoading(false);
    }, []);

    console.log("AuthProvider", isLoggedIn);
    // let signin = (newUser, callback) => {
    const login = (jwtToken) => {
      // console.log(user, newUser);
      //   return appAuthProvider.signin(newUser, () => {
      //     console.log(appAuthProvider);

      //     if(appAuthProvider.isAuthenticated) {
      //       setUser(newUser);
      //       callback();
      //     }
          
      //   });
      setIsLoggedIn(true);
      setToken(jwtToken);
      localStorage.setItem("jwt", jwtToken);
    };

    const logout = () => {
      setIsLoggedIn(false);
      setToken(null);
      localStorage.removeItem("jwt");
    };

    const value = {
      isLoggedIn,
      isLoading,
      login,
      logout,
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider> ;
};

function RequireAuth () {
    const { isLoggedIn } = useAuth();
    
    const location = useLocation();
  
    console.log("RequireAuth", isLoggedIn);

    if (!isLoggedIn) {
      return (
        <Navigate
          to={{ pathname: "/unauthorized", state: { from: location } }}
          replace
        />
      );
    }
  
    return <>hech:<nav></nav> <Outlet /></>;
};

export { AuthProvider,  RequireAuth, useAuth };
