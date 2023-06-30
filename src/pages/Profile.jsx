import { useContext } from "react";
import { useAuth } from "../context/Auth";

function Profile() {
  const { token } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      <p>Your secret token is: {token}</p>
    </div>
  );
}

export default Profile;