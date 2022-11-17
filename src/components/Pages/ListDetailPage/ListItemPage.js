import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../store/item-slice";
import { listActions } from "../../store/list-slice";
import ItemMenuDropdown from "../../UI/Dropdown/ItemMenuDropdown";
import MoreIcon from "../../UI/Icons/MoreIcon";

const ListItemPage = (props) => {
  const dispatch = useDispatch();
  const listsStore = useSelector((state) => state.lists);

  const currentList = listsStore.lists.filter(
    (list) => list.list_id == props.currentListId
  );
  console.log("currentList");
  console.log(currentList);

  const onRemove = () => {
    console.log("remove button");
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

  const displayedItem = {
    key: props.key,
    id: props.id,
    item_name: props.item_name,
    item_notes: props.item_notes,
    item_description: props.item_description,
    hyperlink: props.hyperlink,
  };

  //TODO show the detailpage of the displayed item when we click on "see detials" of the menudropdown

  return (
    <div className="flex flex-row justify-between items-center bg-white border-2 rounded-md shadow-lg h-24">
      <div className="w-24 bg-red-500">Image</div>
      <div className="">
        <div className="text-center text-lg">{displayedItem.item_name}</div>
        <div className="text-center italic">{displayedItem.item_notes}</div>
      </div>
      <div>
        <ItemMenuDropdown onRemove={onRemove} displayedItem={displayedItem} />
      </div>
    </div>
  );
};

export default ListItemPage;
