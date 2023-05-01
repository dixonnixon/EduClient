import { useState, useCallback } from "react";
import { useNavigate, Form } from "react-router-dom";


import { useAuth } from "../context/Auth";


export async function action({ request, params }) {
  let auth = useAuth();
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await auth.signin({username, password}, ({ response, isAuthenticated }) => {
    // Send them back to the page they tri ed to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
      console.log( response, isAuthenticated )
      if(response.success === true) {
        navigate(from, { replace: true });
      }
  });

  return redirect(`/contacts/${params.contactId}`);
  // await updateContact(params.contactId, updates);
  // return redirect(`/contacts/${params.contactId}`);
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let auth = useAuth();
  const navigate = useNavigate();

  const login = useCallback(
    (e) => {
      e.preventDefault();
    //   setUser({ username });
    //   navigate("/portal");
        // let formData = new FormData(e.currentTarget);
        // let username = formData.get("username");
        // let password = formData.get("password");

        let from = location.state?.from?.pathname || "/";
        console.log(username, password);

        auth.signin({username, password}, ({ response, isAuthenticated }) => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
          console.log( response, isAuthenticated )
          if(response.success === true) {
            navigate(from, { replace: true });
          }
        });
    },
    [username, password]
  );

  return (
    <div>
      <h1>Login page</h1>
      <p>This route has public access.</p>
      <Form method="post" onSubmit={login}>
        <label htmlFor="#un">Enter Username: </label>
        <input
          id="#un"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type username..."
        />
        <label htmlFor="#pw">Enter password: </label>
        <input
          id="#pw"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;