import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import DropdownIcon from "../../UI/Icons/DropdownIcon";
import PlusIcon from "../../UI/Icons/PlusIcon";
import ListItemPage from "./ListItemPage";

const ListDetailPage = () => {
  const params = useParams();
  const listsStore = useSelector((state) => state.lists);
  const [showDetails, setShowDetails] = useState(false);

  //add a fecthing of the list id based on params, in cased listStore is empty (sharing the url link directly without first going from main_landing_page)

  const currentId = params.listId;
  const existingList = listsStore.lists.find(
    (list) => list.list_id == currentId
  );
  const itemsInList = existingList.items;
  console.log("existingList");
  console.log(existingList);

  const creationDate = `${new Date(
    existingList.creation_date
  ).getDate()} / ${new Date(
    existingList.creation_date
  ).getMonth()} / ${new Date(existingList.creation_date).getFullYear()} `;
  console.log("creationDate");
  console.log(creationDate);

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

  const onClickHandler = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col bg-lightBlueishGray">
      <div className="bg-gradient-to-b from-blueishIndigo to-darkBlueishBlack text-white text-center pt-6">
        <div className="mb-2 text-xl">{existingList.title}</div>
        <div className="flex flex-row justify-center mb-6">
          <div className="grow">By: {existingList.creator.username}</div>
          <button onClick={onClickHandler}>
            <DropdownIcon />
          </button>
        </div>

        {showDetails && (
          <div>
            <div className="mb-2">Category: {existingList.category}</div>
            <div className="mb-2">Description: {existingList.description}</div>
            <div className="mb-2 italic">Notes: {existingList.notes}</div>
            <div className="mb-2 text-sm">Creation: {creationDate}</div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-2 h-screen mt-4 mb-32">
        {listOfItems}
      </div>
      <div className="fixed z-10 bottom-36 right-8">
        <NavLink to="/lists/create" className="hover:underline hover:scale-110">
          <PlusIcon />
        </NavLink>
      </div>
    </div>
  );
};

export default ListDetailPage;
