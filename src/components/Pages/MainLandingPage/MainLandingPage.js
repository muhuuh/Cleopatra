import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSummary from "./ListSummary";
import useHttp from "../../../hooks/use-http";
import { listActions } from "../../store/list-slice";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";

const MainLandingPage = () => {
  const listsStore = useSelector((state) => state.lists);
  const itemsStore = useSelector((state) => state.items);
  const [tasks, setTasks] = useState([]);
  const { httpState: httpState_fetch, sendRequest: fetchTasks } = useHttp();
  const { httpState: httpState_refresh, sendRequest: refreshList } = useHttp();
  const dispatch = useDispatch();

  
  useEffect(() => {
    const transformData = (data) => {
      console.log(data)
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({
          id: data[taskKey].lists.id,
          name: data[taskKey].lists.name,
          category: data[taskKey].lists.category,
          owner: data[taskKey].lists.owner,
          items: data[taskKey].lists.items,
          users: data[taskKey].lists.users,
          shortDescription: data[taskKey].lists.shortDescription,
          description: data[taskKey].lists.description,
        });
      }
      console.log(loadedTasks)
      setTasks(loadedTasks);
      dispatch(listActions.fetchList(loadedTasks));
    };
    

    /*
    useEffect(() => {
      const transformData = (data) => {
        console.log("test")
        console.log(data.lists)
        const loadedTasks = [];
        for (const index in data.lists) {
          loadedTasks.push({
            id: data.lists[index].id,
            name: data.lists[index].name,
            category: data.lists[index].category,
            owner: data.lists[index].owner,
            items: data.lists[index].items,
            users: data.lists[index].users,
            shortDescription: data.lists[index].shortDescription,
            description: data.lists[index].description,
          });
        }
        console.log(loadedTasks)
        setTasks(loadedTasks);
        dispatch(listActions.fetchList(loadedTasks));
      };

      */

    fetchTasks(
      {
        url: "https://react-udemy-movie-e7f18-default-rtdb.europe-west1.firebasedatabase.app/cleopatra.json",
      },
      transformData
    );
  }, [fetchTasks]);

/*
  const onRemoveHandler = () => {
    
    console.log("removing")
    console.log(listsStore)
    const postConfig = {
      url: "https://react-udemy-movie-e7f18-default-rtdb.europe-west1.firebasedatabase.app/cleopatra.json",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: { lists: listsStore.lists, items: itemsStore.items },
    };

    const transformDataPost = (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: itemsStore };
    };

    refreshList(postConfig, transformDataPost);
    console.log("after removed")
  }
  */

  //list from the api fetch
  //const listItems = tasks.map((list) => (
  const listItems = listsStore.lists.map((list) => (
    <ListSummary
      key={list.id}
      id={list.id}
      name={list.name}
      owner={list.owner}
      shortDescription={list.shortDescription}
      //onRemove={onRemoveHandler}
    />
  ));

  if (httpState_fetch.status === "pending") {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (httpState_refresh.status === "error") {
    return <div className="flex justify-center">{httpState_refresh.error}</div>;
  }

  console.log(httpState_refresh.status)

  return (
    <div className="mx-16">
      <div className="text-xl font-bold">Top Lists</div>
      <div className="flex justify-center my-16">
        <div className="grid grid-cols-3 gap-x-6 gap-y-12">{listItems}</div>
      </div>
      <div className="text-xl font-bold">Recommandations</div>
      <Link to="/test">Test Page</Link>
    </div>
  );
};

export default MainLandingPage;
