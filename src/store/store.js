import { configureStore } from "@reduxjs/toolkit";
import pollsSlice from "./PollsSlice";


export default configureStore({
  reducer: {
    polls: pollsSlice,

  },
});