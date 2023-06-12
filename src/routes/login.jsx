import { useState, useCallback } from "react";
import { useNavigate, Form, useFetcher } from "react-router-dom";


import { useAuth } from "../context/Auth";
import { useFormik } from "formik";

export async function action({ request, params }) {
  // let auth = useAuth();
  
  // const formData = await request.formData();
  // console.log("formData", formData);
  // const updates = Object.fromEntries(formData);

  

  // await auth.signin({username, password}, ({ response, isAuthenticated }) => {
  //   // Send them back to the page they tri ed to visit when they were
  //   // redirected to the login page. Use { replace: true } so we don't create
  //   // another entry in the history stack for the login page.  This means that
  //   // when they get to the protected page and click the back button, they
  //   // won't end up back on the login page, which is also really nice for the
  //   // user experience.
  //     console.log("login:action",response, from, isAuthenticated )
  //     if(response.success === true) {
  //       navigate(from, { replace: true });
  //     }
  // });

  // return redirect(`/contacts/${params.contactId}`);
  // await updateContact(params.contactId, updates);
  // return redirect(`/contacts/${params.contactId}`);
}




const validationSchema = yup.object({
  username: yup.string().email("Invalid username address").required("username is required"),
  password: yup.string().required("Password is required").min(6, "Password must be 6 characters long or more"),
});

const Login = () => {
  

  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  let auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submit(values, { method: "post" });
    },
  });

  const login = useCallback(
    (e) => {
      e.preventDefault();
    //   setUser({ username });
    //   navigate("/portal");
        // let formData = new FormData(e.currentTarget);
        // let username = formData.get("username");
        // let password = formData.get("password");

        let from = location.state?.from?.pathname || "/";
        console.log("login", username, password);

        auth.signin({username, password}, ({ response, isAuthenticated }) => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
          console.log( "auth.signin", response, isAuthenticated )
          if(response.success === true) {
            navigate(from, { replace: true });
          }
          renderAlert();
        });
    },
    [username, password]
  );

  return (
    <div>
      <h1>Login page</h1>
      <p>This route has public access.</p>
      <Form method="post" onSubmit={formik.handleSubmit}>
      {/* <Form method="post" onSubmit={login}> */}
      {/* <Form method="post"> */}
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