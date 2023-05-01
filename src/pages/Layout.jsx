
import {
    Link,
    Outlet,
  } from "react-router-dom";

import  { AuthStatus }  from '../context/Auth';


const Layout = () => {
    return (
      <div>
        <AuthStatus />
  
        <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/portal">Portal Page</Link>
          </li>
        </ul>
  
        <Outlet />
      </div>
    );
}

export default Layout;
