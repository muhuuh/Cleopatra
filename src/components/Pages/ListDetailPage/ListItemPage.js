import React from "react";
import { useDispatch } from "react-redux";
import { itemActions } from "../../store/item-slice";

const ListItemPage = (props) => {
  const dispatch = useDispatch();



  const onRemove = () => {
    dispatch(itemActions.deleteItem(props.id));
    console.log("remove")
  };
  
    

  return (
    <div className="flex flex-row justify-between border-2 rounded-md shadow-lg h-24">
      <div className="w-24 bg-red-500">Image</div>
      <div className="flex flex-col grow text-center">
        <div className=" text-center">{props.name}</div>
        <div className="text-center">{props.description}</div>
      </div>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default ListItemPage;