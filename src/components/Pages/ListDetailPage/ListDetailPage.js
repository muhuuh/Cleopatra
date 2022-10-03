import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListItemPage from "./ListItemPage";

const ListDetailPage = () => {
  const params = useParams();
  const listsStore = useSelector((state) => state.lists);
  const itemsStore = useSelector((state) => state.items);

  
  const currentId = params.listId;
  const existingList = listsStore.lists.find((list) => list.id === currentId);

  const itemsInList = itemsStore.items.filter((item) =>
    existingList.items.includes(item.id)
  );

  const listOfItems = itemsInList.map((item) => (
    <ListItemPage
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
    />
  ));

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-xl font-bold mb-8">List Detail Page</h1>
      <div className="text-center w-2/3">
        <div className="">Name: {existingList.name}</div>
        <div className="mb-6 ">By: {existingList.owner}</div>

        <div className="font-lg font-bold mb-4">Description</div>
        <div>
          <div className="mb-2">{existingList.short_description}</div>
          <div>{existingList.description}</div>
        </div>
        <div className="flex flex-col gap-y-4 mt-12"> {listOfItems}</div>
      </div>
    </div>
  );
};

export default ListDetailPage;
