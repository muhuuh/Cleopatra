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
  const { httpState: httpState_delete, sendRequest: deleteList } = useHttp();
  const dispatch = useDispatch();

  const urlGet = "https://cleolist.herokuapp.com/listapi/v1/lists_with_items/";
  let urlDelete = "https://cleolist.herokuapp.com/listapi/v1/delete_list/";

  useEffect(() => {
    const transformData = (data) => {
      console.log(data);
      const loadedTasks = [];
      for (const index in data) {
        loadedTasks.push({
          list_id: data[index].list_id,
          title: data[index].title,
          category: "add_category",
          creator: data[index].creator,
          items: data[index].listitem_mapping,
          users: "add_users",
          description: data[index].description,
          notes: data[index].notes,
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
          fetchedItems.push(loadedTasks[i].items[j]);
        }
      }

      console.log("fetchedItems");
      console.log(fetchedItems);
      dispatch(itemActions.getItemFromFetchedList(fetchedItems));
    };

    fetchTasks(
      {
        url: urlGet,
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

  const onRemoveHandler = (list_id) => {
    urlDelete = urlDelete + `${list_id}`;
    const postConfig = {
      url: urlDelete,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: { list_id: list_id },
    };

    const transformDataPost = (data) => {
      const generatedId = data; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: itemsStore };
    };

    deleteList(postConfig, transformDataPost);
    console.log("after removed");
  };

  //list from the api fetch
  const listItems = listsStore.lists.map((list) => (
    <ListSummary
      key={list.list_id}
      list_id={list.list_id}
      title={list.title}
      owner={list.creator.username}
      description={list.description}
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

  if (httpState_delete.status === "error") {
    return <div className="flex justify-center">{httpState_delete.error}</div>;
  }

  console.log(httpState_delete.status);

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
