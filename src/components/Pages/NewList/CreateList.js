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
import SuccessCreated from "./SuccessCreated";

const CreateList = () => {
  const { httpState, sendRequest: postLists } = useHttp();
  const listsStore = useSelector((state) => state.lists);
  //const url = "https://react-udemy-movie-e7f18-default-rtdb.europe-west1.firebasedatabase.app/cleopatra.json"
  const url = "https://cleolist.herokuapp.com/listapi/v1/lists/";
  //const url = "http://192.168.0.206:8000/listapi/v1/lists/";

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

  const [listItems, setlistItems] = useState([]);
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

  const onRemoveHandler = (list_item_id) => {
    let updateditems = listItems;
    updateditems = updateditems.filter(
      (item) => item.list_item_id !== list_item_id
    );
    setlistItems(updateditems);
  };

  const currentlistItems = listItems.map((item) => (
    <ListItem
      key={item.list_item_id}
      list_item_id={item.list_item_id}
      item_name={item.item_name}
      short_description={item.short_description}
      onRemove={onRemoveHandler}
    />
  ));

  //current form of first saving with created list and created items
  const onSaveListHandler = () => {
    /*
    const createlistAttributes = {
      list_id: listAttributes.list_id,
      title: listAttributes.title,
      category: listAttributes.category,
      creator: "add user id from cookie",
      items: itemsIdList,
      users: [],
      description: listAttributes.description,
      notes: listAttributes.notes,
      has_collaborators: "add has_collaborators",
      is_public: "add is_public",
      list_image: "add list_image",
      creation_date: "add creation_date",
      last_modification_date: "last_modification_date",
    };
    */

    //when btton "SaveList" clicked, only update the arrays of the items the list has

    const postConfig = {
      url: url,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //post the list of items created
      body: listItems,
    };

    const transformDataPost = (data) => {
      const receivedData = data;
      const createdTask = { data: receivedData, text: listsStore.lists };

      //update itemsIdList with the list if item id that we receive with receiveData
      const itemsIdList = [];
      //listItems.map((list) => itemsIdList.push(list.list_item_id));
      const listWithItems = { ...listAttributes, items: itemsIdList };
      dispatch(listActions.updateList(listWithItems));
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
        <div>Title: {listAttributes.title}</div>
        <div>category: {listAttributes.category}</div>
        <div>Description: {listAttributes.description}</div>
        <div>Notes: {listAttributes.notes}</div>
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
      <div className="mt-12">
        {httpState.status === "success" && <SuccessCreated />}
      </div>
    </div>
  );
};

export default CreateList;
