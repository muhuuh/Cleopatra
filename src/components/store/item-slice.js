import { createSlice } from "@reduxjs/toolkit";

const DUMMY_ITEMS = [
  {
    list_item_id: 10,
    item_name: "Camera",
    category: "Fotos",
    short_description: "The must-have cameras for the best pictures",
    lists: [0, 1, 2, 3],
  },
  {
    list_item_id: 11,
    item_name: "Lens",
    category: "Fotos",
    short_description: "The perfect lens for better fotos",
    lists: [0, 1, 3],
  },
  {
    list_item_id: 12,
    item_name: "Backpack",
    category: "Fotos",
    short_description: "A packpack to transport your accesories",
    lists: [1],
  },
  {
    list_item_id: 13,
    item_name: "Tires",
    category: "Cars",
    short_description: "New tires for the winter",
    lists: [2],
  },
  {
    list_item_id: 14,
    item_name: "Car Jack",
    category: "Cars",
    short_description: "This is to lift up your car",
    lists: [2],
  },
  {
    list_item_id: 15,
    item_name: "My bike",
    category: "Bikes",
    short_description: "A bike like you've never seen",
    lists: [0, 3, 4],
  },
  {
    list_item_id: 16,
    item_name: "Red Helmet",
    category: "Bikes",
    short_description: "It will save your life",
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
      const newItem = action.payload;
      state.items.push({
        list_item_id: newItem.list_item_id,
        item_name: newItem.item_name,
        category: newItem.category,
        short_escription: newItem.short_description,
        item_notes: newItem.notes,
        lists: newItem.lists,
        creation_date: "add creation date",
        last_modification_date: "add last modification",
        has_affiliate_link: null,
        hyperlink: "add hyperlink",
        item_brand: "add brand",
      });
      console.log("itemstore");
      console.log(state.items);
    },
    deleteItem(state, action) {
      const id = action.payload;
      const remainingItems = state.items.filter(
        (item) => item.list_item_id !== id
      );

      state.items = remainingItems;
    },
    getItemFromFetchedList(state, action) {
      const fetchedItems = action.payload;
      console.log(fetchedItems);
      let existingsItemIds = [];
      state.items.map((item) => existingsItemIds.push(item.list_item_id));

      let itemsToAdd = [];
      for (let i in fetchedItems) {
        if (!existingsItemIds.includes(fetchedItems[i].list_item_id)) {
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
