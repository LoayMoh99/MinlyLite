import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <div>
      <h1>Welcome {currentUser.username}</h1>
    </div>
  );
};

export default Profile;
