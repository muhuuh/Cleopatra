import { useSelector } from "react-redux";
import ListSummary from "./ListSummary";

const MainLandingPage = () => {
  const listsStore = useSelector((state) => state.lists);

  //add logig for filtering based on lists
  const listsFiltered = listsStore.lists.filter((list) =>
    list.category === "Cooking"
  );
  
  //create variable that only takes the first 6 lists of the array
  const listItems = listsStore.lists.map((list) => (
    <ListSummary
      key={list.id}
      id={list.id}
      name={list.name}
      owner={list.owner}
      shortDescription={list.shortDescription}
    />
  ));

  console.log(listsStore.lists)

  return (
    <div className="mx-16">
      <div className="text-xl font-bold">Top Lists</div>
      <div className="flex justify-center my-16">
        <div className="grid grid-cols-3 gap-x-6 gap-y-12">{listItems}</div>
      </div>
      <div className="text-xl font-bold">Recommandations</div>
    </div>
  );
};

export default MainLandingPage;
