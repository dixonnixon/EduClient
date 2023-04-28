//check here user logged in or not?

const Portal = () => {
    return (
      <div>
        <h1>Education Department</h1>
        <p>This route has public access. Please Log In</p>
        <Link to="/login">Go back to login.</Link>
      </div>
    );
  };
  
  export default Portal;