import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Test = () => {


  //redux connection
  const listsStore = useSelector((state) => state.lists);
  const listExample = listsStore.lists[listsStore.lists.length-1];
  console.log(listsStore.lists)
  
  return (
    <div>
      <div className="mt-36">
        <div className="text-bold text-xl">Tests</div>
        <div>{listExample.name}</div>
      </div>
    </div>
  );
};

export default Test;
