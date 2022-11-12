import React from "react";

const ListItem = (props) => {
  const onRemove = () => {
    props.onRemove(props.list_item_id);
  };

  return (
    <div className="flex flex-row justify-between border-2 rounded-md shadow-lg h-24">
      <div className="w-24 bg-red-500">Image</div>

      <div className=" text-center">Name: {props.item_name}</div>
      <div className="text-center">Brand: {props.item_brand}</div>

      <div className="text-center">Description: {props.short_description}</div>
      <div>Notes: {props.item_notes}</div>
      <div>Link: {props.hyperlink}</div>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default ListItem;
