import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item-slice";
import { listActions } from "../../store/list-slice";

const ListItemPage = (props) => {
  const dispatch = useDispatch();
  const listsStore = useSelector((state) => state.lists);

  const currentList = listsStore.lists.filter(
    (list) => list.list_id == props.currentListId
  );
  console.log("currentList");
  console.log(currentList);

  const onRemove = () => {
    dispatch(itemActions.deleteItem(props.id));
    const itemsInCurrentList = currentList[0].items;
    const notRemovedItems = itemsInCurrentList.filter(
      (item) => item.listitem.list_item_id !== props.id
    );

    currentList[0] = { ...currentList[0], items: notRemovedItems };
    console.log("not reomved items");
    console.log(currentList);

    dispatch(listActions.updateList(currentList));
  };

  return (
    <div className="flex flex-row justify-between border-2 rounded-md shadow-lg h-24">
      <div className="w-24 bg-red-500">Image</div>
      <div className=" text-center">{props.item_name}</div>
      <div className="text-center">{props.item_description}</div>
      <div className="text-center">{props.item_notes}</div>
      <div className="text-center">{props.hyperlink}</div>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default ListItemPage;
