import { createSlice } from "@reduxjs/toolkit";

const DUMMY_USERS = [
  {
    id: 0,
    username: "lala",
    email: "lala@protonmail.com",
    password: "12345",
    lists: [0, 1],
    logedIn: true,
    hasProfil: true,
  },
  {
    id: 1,
    username: "lulu",
    email: "lulu@protonmail.com",
    password: "12345",
    lists: [2, 4, 5],
    logedIn: true,
    hasProfil: false,
  },
  {
    id: 2,
    username: "lolo",
    email: "lolo@protonmail.com",
    password: "12345",
    lists: [0, 3],
    logedIn: false,
    hasProfil: false,
  },
];

const defaultState = {
  usersList: DUMMY_USERS,
  totalUsers: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState: defaultState,
  reducers: {
    addUser(state, action) {
      const newUser = action.payload;
      const existingUser = state.usersList.find(
        (user) => user.email === newUser.email
      );

      if (!existingUser) {
        state.usersList.push({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          lists: [],
          logedIn: true,
          hasProfil: false,
        });
      } else {
        console.log("id already exists");
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
