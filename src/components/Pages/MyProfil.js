import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import ListSummary from "./MainLandingPage/ListSummary";

const MyProfil = () => {
  const users = useSelector((state) => state.users);
  const [apiReadList, setApiReadList] = useState([]);
  const { isLoading, error, sendRequest: fetchUsers } = useHttp();
  const url = "https://cleolist.herokuapp.com/listapi/v1/lists";
  //const url = "http://192.168.0.195:8000/listapi/v1/1"

  //Cleopatra connection
  useEffect(() => {
    const transformData = (data) => {
      console.log(data);
      setApiReadList(data);
    };

    fetchUsers(
      {
        url: url,
      },
      transformData
    );
  }, [fetchUsers]);

  const listInfoFromApi = apiReadList.map((list) => (
    <ListSummary
      key={list.list_id}
      id={list.list_id}
      name={list.title}
      owner={list.creator.username}
      shortDescription={list.description}
    />
  ));

  return (
    <div>
      <div>My Profil</div>
      <div>
        <div>Username</div>
        {users.usersList[users.usersList.length - 1].username}
      </div>
      <div className="mt-36">
        <div className="text-bold text-xl">API Call Output</div>
        <div className="mt-8">
          <div className="flex flex-row gap-x-6">{listInfoFromApi}</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfil;
