import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from "../auth";
const Layout = () => (
  <div>
     <AuthStatus />
    <ul>
      <li>
        <Link to="/">Головна</Link>
      </li>
      {/* <li>
        <Link to="/login">Login</Link>
      </li> */}
      <li>
        <Link to="/users">Користувачі</Link>
      </li>
      <li>
        <Link to="/educators">Освітяни</Link>
      </li>
    </ul>
    <Outlet />
  </div>
);

export default Layout;