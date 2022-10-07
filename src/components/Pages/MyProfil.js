import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

const MyProfil = () => {
    const users = useSelector(state => state.users);
    const [userList, setUserList] = useState();
    const { isLoading, error, sendRequest: fetchUsers } = useHttp();


    //Cleopatra connection
    useEffect(() => {
      const transformData = (data) => {
        console.log(data.title)
        setUserList(data.title);
      };
  
      fetchUsers(
        {
          url: "http://192.168.0.195:8000/listapi/v1/1",
        },
        transformData
      );
    }, [fetchUsers]); 



  return (
    <div>
      <div>My Profil</div>
      <div>
        <div>Username</div>
        {users.usersList[users.usersList.length - 1].username}
      </div>
      <div className="mt-36">
        <div className="text-bold text-xl">API Call Output</div>
        <div>title: {userList}</div>
      </div>

    </div>
  );
};

export default MyProfil;
