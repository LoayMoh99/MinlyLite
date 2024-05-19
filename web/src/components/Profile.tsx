import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="container">
      <p>
        <strong>Name:</strong> {currentUser.username}
      </p>
      Welcome {currentUser.username}
    </div>
  );
};

export default Profile;
