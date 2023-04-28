import { useState, useCallback } from "react";
import { useNavigate, Form } from "react-router-dom";

import { useAuth } from "../context/Auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const { setUser } = useAuth();
  let auth = useAuth();
  const navigate = useNavigate();

  const login = useCallback(
    (e) => {
      e.preventDefault();
    //   setUser({ username });
    //   navigate("/portal");
        let formData = new FormData(e.currentTarget);
        let username = formData.get("username");

        auth.signin(username, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
        })
    },
    [setUser, username]
  );

  return (
    <div>
      <h1>Login page</h1>
      <p>This route has public access.</p>
      <Form method="post" onSubmit={login}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type username..."
        />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;