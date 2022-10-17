import { createSlice } from "@reduxjs/toolkit";

const DUMMY_ITEMS = [
  {
    id: 0,
    name: "Camera",
    category: "Fotos",
    description: "The must-have cameras for the best pictures",
    lists: [0, 1, 2, 3],
  },
  {
    id: 1,
    name: "Lens",
    category: "Fotos",
    description: "The perfect lens for better fotos",
    lists: [0, 1, 3],
  },
  {
    id: 2,
    name: "Backpack",
    category: "Fotos",
    description: "A packpack to transport your accesories",
    lists: [1],
  },
  {
    id: 3,
    name: "Tires",
    category: "Cars",
    description: "New tires for the winter",
    lists: [2],
  },
  {
    id: 4,
    name: "Car Jack",
    category: "Cars",
    description: "This is to lift up your car",
    lists: [2],
  },
  {
    id: 5,
    name: "My bike",
    category: "Bikes",
    description: "A bike like you've never seen",
    lists: [0, 3, 4],
  },
  {
    id: 6,
    name: "Red Helmet",
    category: "Bikes",
    description: "It will save your life",
    lists: [0, 2, 3, 5],
  },
];

const defaultState = {
  items: DUMMY_ITEMS,
  totalItems: 0,
};

const itemSlice = createSlice({
  name: "items",
  initialState: defaultState,
  reducers: {
    createItem(state, action) {
      console.log("itemsstore");
      const newItem = action.payload;
      state.items.push({
        id: newItem.id,
        name: newItem.name,
        category: newItem.category,
        shortDescription: newItem.shortDescription,
        description: newItem.description,
        lists: newItem.lists,
      });
      console.log("itemstore");
      console.log(state.items);
    },
    deleteItem(state, action) {
      const id = action.payload;
      const remainingItems = state.items.filter((item) => item.id !== id);

      state.items = remainingItems;
    },
    getItemFromFetchedList(state, action) {
      const fetchedItems = action.payload;
      console.log(fetchedItems);
      let existingsItemIds = [];
      state.items.map((item) => existingsItemIds.push(item.id));

      let itemsToAdd = [];
      for (let i in fetchedItems) {
        if (!existingsItemIds.includes(fetchedItems[i].id)) {
          itemsToAdd.push(fetchedItems[i]);
        }
      }
      const updatedCurrentItems = state.items.concat(itemsToAdd);
      state.items = updatedCurrentItems;
    },
    addItemToList(state, action) {},
    removeItemFromList(state, action) {},
  },
});

export const itemActions = itemSlice.actions;
export default itemSlice;
