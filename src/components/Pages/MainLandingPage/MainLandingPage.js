import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSummary from "./ListSummary";
import useHttp from "../../../hooks/use-http";
import { listActions } from "../../store/list-slice";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { itemActions } from "../../store/item-slice";

const MainLandingPage = () => {
  const listsStore = useSelector((state) => state.lists);
  const itemsStore = useSelector((state) => state.items);
  const [tasks, setTasks] = useState([]);
  const { httpState: httpState_fetch, sendRequest: fetchTasks } = useHttp();
  const { httpState: httpState_refresh, sendRequest: refreshList } = useHttp();
  const dispatch = useDispatch();
  //const url = "https://react-udemy-movie-e7f18-default-rtdb.europe-west1.firebasedatabase.app/cleopatra.json"
  const url = "https://cleolist.herokuapp.com/listapi/v1/lists_with_items";
  //const url = "http://192.168.0.206:8000/listapi/v1/lists/";

  useEffect(() => {
    const transformData = (data) => {
      console.log(data);
      const loadedTasks = [];
      for (const index in data) {
        loadedTasks.push({
          id: data[index].list_id,
          name: data[index].title,
          category: "add_category",
          owner: data[index].creator,
          items: data[index].listitem_mapping,
          users: "add_users",
          shortDescription: data[index].description,
          description: data[index].notes,
          has_collaborators: data[index].has_collaborators,
          is_public: data[index].is_public,
          list_image: data[index].list_image,
          creation_date: data[index].creation_date,
          last_modification_date: data[index].last_modification_date,
        });
      }
      setTasks(loadedTasks);
      dispatch(listActions.fetchList(loadedTasks));

      let fetchedItems = [];
      for (let i in loadedTasks) {
        for (let j in loadedTasks[i].items) {
          fetchedItems.push(loadedTasks[i].items[j].listitem);
        }
      }
      console.log("fetchedItems");
      console.log(fetchedItems);
      dispatch(itemActions.getItemFromFetchedList(fetchedItems));
    };

    fetchTasks(
      {
        url: url,
      },
      transformData
    );
  }, [fetchTasks]);

  /*
  useEffect(() => {
    const transformData = (data) => {
      console.log(data);
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
      console.log(loadedTasks);
      setTasks(loadedTasks);
      dispatch(listActions.fetchList(loadedTasks));
    };

    fetchTasks(
      {
        url: url,
      },
      transformData
    );
  }, [fetchTasks]);
  */

  const onRemoveHandler = () => {
    console.log("removing");
    console.log(listsStore);
    const postConfig = {
      url: url,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: { lists: listsStore.lists, items: itemsStore.items },
    };

    const transformDataPost = (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: itemsStore };
    };

    refreshList(postConfig, transformDataPost);
    console.log("after removed");
  };

  //list from the api fetch
  const listItems = listsStore.lists.map((list) => (
    <ListSummary
      key={list.id}
      id={list.id}
      name={list.name}
      owner={list.owner.username}
      shortDescription={list.shortDescription}
      items={list.items}
      onRemove={onRemoveHandler}
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

  console.log(httpState_refresh.status);

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
