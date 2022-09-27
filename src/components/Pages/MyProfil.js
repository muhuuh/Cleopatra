import React from "react";
import { useSelector } from "react-redux";

const MyProfil = () => {
    const users = useSelector(state => state.users);
  return (
    <div>
      <div>My Profil</div>
      <div>
        <div>Username</div>
        {users.usersList[users.usersList.length - 1].username}
      </div>
    </div>
  );
};

export default MyProfil;
