import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListItemPage from "./ListItemPage";

const ListDetailPage = () => {
  const params = useParams();
  const listsStore = useSelector((state) => state.lists);
  const itemsStore = useSelector((state) => state.items);

  console.log("itemsStore");
  console.log(itemsStore);
  console.log("listsStore");
  console.log(listsStore);

  //add a fecthing of the list id based on params, in cased listStore is empty (sharing the url link directly without first going from main_landing_page)

  const currentId = params.listId;
  const existingList = listsStore.lists.find(
    (list) => list.list_id == currentId
  );

  const itemsInList = existingList.items;

  /*
  const itemsInList = itemsStore.items.filter((item) =>
    existingList.items.includes(item.list_item_id)
  );
  */

  const listOfItems = itemsInList.map((item) => (
    <ListItemPage
      key={item.listitem.list_item_id}
      id={item.listitem.list_item_id}
      item_name={item.listitem.item_name}
      item_notes={item.listitem.item_notes}
      item_description={item.listitem.item_description}
      hyperlink={item.listitem.hyperlink}
      currentListId={currentId}
    />
  ));

  return (
    <div className="flex flex-col bg-green-500 justify-center ">
      <h1 className="text-xl font-bold mb-8">List Detail Page</h1>
      <div className="">
        <div className="">Name: {existingList.title}</div>
        <div className="mb-6 ">By: {existingList.creator.username}</div>

        <div className="font-lg font-bold mb-4">Description</div>
        <div>
          <div className="mb-2">{existingList.short_description}</div>
          <div>{existingList.description}</div>
        </div>
      </div>
      <div className="flex flex-col bg-red-500 gap-y-4 mt-12">
        {listOfItems}
      </div>
    </div>
  );
};

export default ListDetailPage;
