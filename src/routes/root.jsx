import { useCallback } from "react";

import { Outlet, Link, 
  useLoaderData,   
  Form, useNavigate 
} from "react-router-dom";

import { getUsers, createUser } from "../users";
import { useAuth, AuthProvider } from "../context/Auth"
import localforage from "localforage";

export async function loader() {
    let auth = useAuth();
    console.log("token", auth);
    // localforage.setItem(auth.jwt);
    const users = await getUsers('all');
    return { users };
}

export async function action() {
  const contact = await createUser();
  return { contact };
}

export default function Root() {
    const { users } = useLoaderData();
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const logout = useCallback(
      (e) => {
        e.preventDefault();
        setUser(null);
        navigate("/");
      },
      [setUser]
    );

    return (
      <AuthProvider>
        <nav className="menu">
        Hello <strong>{user?.username}</strong>!
        </nav>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            {/* <form method="post">
              <button type="submit">New</button>
            </form> */}
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {users.length ? (
                <ul>
                {users.map((user) => (
                    <li key={user.id}>
                    <Link to={`users/${user.id}`}>
                        {user.first || user.last ? (
                        <>
                            {user.first} {user.last}
                        </>
                        ) : (
                        <i>No Name</i>
                        )}{" "}
                    </Link>
                    </li>
                ))}
                </ul>
            ) : (
                <p>
                <i>No contacts</i>
                </p>
            )}
          </nav>
        </div>
        <div id="detail">

            <Outlet />
        </div>
      </AuthProvider>
    );
  }