import { useState, useCallback, useContext } from "react";
import { useNavigate, Navigate, Form, redirect, json, useActionData } from "react-router-dom";

// import { useAuth } from "../context/Auth";
import {  useAuth } from "../context/Auth";
import { appAuthProvider } from '../auth.js';


export async function action({request, params  }) {
  const form = await request.formData();

  console.log("action login", request, params);
  console.log("action form",  form, ...form.entries());
  
  const formToJSON = {};
  for (const [key, value] of [...form.entries()]) {
    formToJSON[key] = value;
  }
  
  console.log("action formToJSON", formToJSON);



  return {};
};

const Login = () => {
  // const formEl = useRef();
  // const actionData = useActionData();

  const [username, setUsername] = useState("");
  const [passw, setPassw] = useState("");
  // const { login, isLoggedIn  } = useContext(AuthContext);
  const { login, isLoggedIn  } = useAuth();
  // const { setUser } = useAuth();
  // let auth = useAuth();
  // const navigate = useNavigate();
  // let from = location.state?.from?.pathname || "/";
  // console.log("actionData", actionData)



  // const login = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //   //   setUser({ username });
  //   //   navigate("/portal");
  //       let formData = new FormData(e.currentTarget);
  //       let username = formData.get("username");
  //       let password = formData.get("passw");
  //       console.log(username, password);


  //       auth.signin({
  //         username: formData.get("username"),
  //         passwd: password
  //       }, () => {


  //         // Send them back to the page they tried to visit when they were
  //         // redirected to the login page. Use { replace: true } so we don't create
  //         // another entry in the history stack for the login page.  This means that
  //         // when they get to the protected page and click the back button, they
  //         // won't end up back on the login page, which is also really nice for the
  //         // user experience.
  //         // navigate(from, { replace: true });
  //         navigate('/', { replace: true });
  //       });

  //       console.log(formEl)
  //       // submit('/login', { replace: true });
  //       formEl.current && formEl.current.submit();
  //   },
  //   [setUser, username]
  // );

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form = new FormData(event.currentTarget);
    const formToJSON = {};
    for (const [key, value] of [...form.entries()]) {
      formToJSON[key] = value;
    }

    // Fake network request for JWT token
    
    console.log(event, formToJSON, isLoggedIn)
    appAuthProvider.signin(formToJSON, (data) => {
      const jwtToken = "fake-jwt-token";
      console.log("loggedIn", isLoggedIn, data);
      if(data.success && !data.err) {
        appAuthProvider.isAuthenticated = true;
        login(data.token)
      }
      
      
    });
    // login(jwtToken);
  };

  console.log("loggedIn unhasndled", isLoggedIn, appAuthProvider.isAuthenticated);
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login page</h1>
      <p>This route has public access.</p>
      {/* <Form method="post" onSubmit={login} action='/login' ref={formEl}> */}
      <Form method="post" onSubmit={handleSubmit} >
        <input
          value={username}
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type username..."
        /> 
        <input
          value={passw}
          name='passwd'
          onChange={(e) => setPassw(e.target.value)}
          placeholder="Type password..."
          type='password'
        />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;