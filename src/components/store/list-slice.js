import { createSlice } from "@reduxjs/toolkit";

const DUMMY_LISTS = [
  {
    id: "0",
    name: "Josh Fotos",
    category: "Fotos",
    owner: "Josh",
    items: [0, 1, 5, 6],
    users: [],
    shortDescription: "This is my photography list",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. ",
  },
  {
    id: "1",
    name: "My cooking",
    category: "Cooking",
    owner: "Lea",
    items: [0, 1, 2],
    users: [],
    shortDescription: "Cooking is great",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. ",
  },
  {
    id: "2",
    name: "Mada's secret,",
    category: "Travel",
    owner: "Madalena",
    items: [0, 3, 4, 6],
    users: [],
    shortDescription: "All you need for traveling",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. ",
  },
  {
    id: "3",
    name: "Biking",
    category: "Biking",
    owner: "Tom",
    items: [0, 1, 5, 6],
    users: [],
    shortDescription: "Equipment for biking",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. ",
  },
  {
    id: "4",
    name: "my secret",
    category: "Fantasy",
    owner: "Harry",
    items: [5],
    users: [],
    shortDescription: "How to beat Voldemort",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. ",
  },
  {
    id: "5",
    name: "Car repair",
    category: "Cars",
    owner: "Cia",
    items: [6],
    users: [],
    shortDescription: "The best car repar kit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. ",
  },
];


const defaultState = {
  //lists: DUMMY_LISTS,
  lists: [],
  other_list: [],
  totalLists: 0,
};

const listSlice = createSlice({
  name: "list",
  initialState: defaultState,
  reducers: {
    addList(state, action) {
      const newList = action.payload;
      const existingList = state.lists.find((list) => list.id === newList.id);

      if (!existingList) {
        state.lists.push({
          id: newList.id,
          name: newList.name,
          category: newList.category,
          owner: "user_id from cookie",
          items: newList.items,
          users: newList.users,
          shortDescription: newList.shortDescription,
          description: newList.description,
        });
        console.log("new list pushed");
        console.log("all lists")
        console.log(state.lists);
      } else {
        console.log("list already exists");
      }
    },
    fetchList(state, action) {
      const fetchedList = action.payload;
      let existingList = state.other_list.concat(fetchedList);
      state.lists = existingList;
    },
    deleteList(state, action) {
      const id = action.payload;
      const remainingLists = state.lists.filter((list) => list.id !== id);
      state.lists = remainingLists;
    },
  },
});

export const listActions = listSlice.actions;
export default listSlice;
