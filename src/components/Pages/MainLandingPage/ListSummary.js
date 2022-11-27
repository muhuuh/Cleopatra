import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listActions } from "../../store/list-slice";

const ListSummary = (props) => {
  const dispatch = useDispatch();

  const onRemoveHandler = () => {
    dispatch(listActions.deleteList(props.list_id));
    props.onRemove(props.list_id);
  };

  return (
    <div className="border-2 rounded-lg shadow-lg items-center w-48 h-64">
      <div className="flex flex-col gap-y-4 justify-center text-center p-2 my-4 mx-2">
        <div>{props.title}</div>
        <div>{props.creator}</div>
        <div>{props.description}</div>
        <div className="flex flex- row justify-around mt-6">
          <button onClick={onRemoveHandler}>Remove</button>
          <Link to={`/lists/detailpage/${props.list_id}`}>View</Link>
        </div>
      </div>
    </div>
  );
};

export default ListSummary;
