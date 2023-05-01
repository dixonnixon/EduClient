import { Outlet, Link, 
  useLoaderData,   
  Form,
} from "react-router-dom";

import { getUsers, createUser } from "../users";

export async function loader() {
    const users = await getUsers('all');
    return { users };
}

export async function action() {
  const user = await createUser();
  return { user };
}

export default function User() {
    const { users } = useLoaderData();


    return (
      <>
        <div id="sidebar">
          <h1>Користувачі</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search users"
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
            <Form method="post">
              <button type="submit">Додати</button>
            </Form>
          </div>
          <nav>
            {users.length ? (
                <ul>
                {users.map((user) => (
                    <li key={contact.id}>
                    <Link to={`users/${user.id}`}>
                        {user.first || user.last ? (
                        <>
                            {user.first} {user.last}
                        </>
                        ) : (
                        <i>No Name</i>
                        )}{" "}
                        {user.favorite && <span>★</span>}
                    </Link>
                    </li>
                ))}
                </ul>
            ) : (
                <p>
                <i>No users</i>
                </p>
            )}
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }