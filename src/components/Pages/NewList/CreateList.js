import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useModal from "../../../hooks/use-modal";
import { listActions } from "../../store/list-slice";
import CreateItem from "./CreateItem";
import CreateListInput from "./CreateListInput";
import ListItem from "./ListItem";
import useHttp from "../../../hooks/use-http";
import { itemActions } from "../../store/item-slice";

const CreateList = () => {
  const { isLoading, error, sendRequest: postLists } = useHttp();
  const listsStore = useSelector((state) => state.lists);
  const {
    isVisible: isCreateItemVisible,
    onCloseHandler: onCloseCreateItemHandler,
    onVisibleHandler: onVisibleCreateItemHandler,
  } = useModal();
  const {
    isVisible: isCreateListVisible,
    onCloseHandler: onCloseCreateListHandler,
    onVisibleHandler: onVisibleCreateListHandler,
  } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const [listAttributes, setListAttributes] = useState({
    id: 0,
    name: "",
    category: "",
    shortDescription: "",
    description: "",
  });

  useEffect(() => {
    onVisibleCreateListHandler();
  }, []);

  const [listItems, setlistItems] = useState([]);
  useState();

  const onAddNewItemHandler = (newItem) => {
    const updatedList = listItems;
    newItem.lists = [listAttributes.id];
    updatedList.push(newItem);
    setlistItems(updatedList);
  };

  const onListHandler = (listAttributes) => {
    setListAttributes(listAttributes);
    onCloseCreateListHandler();
  };

  const onRemoveHandler = (id) => {
    let updateditems = listItems;
    updateditems = updateditems.filter((item) => item.id !== id);
    setlistItems(updateditems);
  };

  const currentlistItems = listItems.map((item) => (
    <ListItem
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      onRemove={onRemoveHandler}
    />
  ));

  const onSaveListHandler = () => {
    //add items id in it
    const itemsIdList = [];
    listItems.map((list) => itemsIdList.push(list.id));

    const createlistAttributes = {
      id: listAttributes.id,
      name: listAttributes.name,
      category: listAttributes.category,
      owner: "add user id from cookie",
      items: itemsIdList,
      users: [],
      shortDescription: listAttributes.shortDescription,
      description: listAttributes.description,
    };
    console.log("list attributes");
    console.log(createlistAttributes);
    console.log("item id");
    console.log(itemsIdList);
    console.log("new item")
    console.log(listItems);
    dispatch(listActions.addList(createlistAttributes));
    dispatch(itemActions.createItem(listItems));

    const postConfig = {
      url: "https://react-udemy-movie-e7f18-default-rtdb.europe-west1.firebasedatabase.app/cleopatra.json",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { lists: createlistAttributes, items: listItems },
    };

    const transformDataPost = (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: listsStore.lists };
    };

    postLists(postConfig, transformDataPost);

    //const url = `/lists/detailpage/${listAttributes.id}`;
    //history.push("/main_landing_page");
  };
  return (
    <div>
      <div className="text-2xl font-bold mb-16">Create a List</div>
      <div>
        {isCreateItemVisible && (
          <CreateItem
            onClose={onCloseCreateItemHandler}
            onAddNewItem={onAddNewItemHandler}
          />
        )}
      </div>
      <div>
        {isCreateListVisible && (
          <CreateListInput
            onNewList={onListHandler}
            onClose={onCloseCreateListHandler}
          />
        )}
      </div>
      <div>
        <div>name: {listAttributes.name}</div>
        <div>category: {listAttributes.category}</div>
        <div>Short description: {listAttributes.shortDescription}</div>
        <div>description: {listAttributes.description}</div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-y-4 mt-20 w-2/3">
          {currentlistItems}
        </div>
      </div>
      <div className="flex flex-row justify-around mt-20">
        <div className="">
          <button className="bg-teal-500 text-white border-2 rounded-lg border-white mr-12 hover:font-bold hover:scale-110 py-1 px-4 ">
            Add existing Item
          </button>
          <button
            onClick={onVisibleCreateItemHandler}
            className="bg-teal-500 text-white border-2 rounded-lg border-white hover:font-bold hover:scale-110 py-1 px-4 "
          >
            Create new Item
          </button>
        </div>
        <div className="">
          <button
            onClick={onSaveListHandler}
            className={` bg-teal-500 text-white border-2 rounded-lg  border-white py-1 px-4 `}
          >
            Save List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateList;
