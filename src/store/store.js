import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contactSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export default store;