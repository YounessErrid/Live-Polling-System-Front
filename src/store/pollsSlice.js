import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";


// Async thunk for fetching polls
export const fetchPolls = createAsyncThunk(
  "polls/fetchPolls",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/polls/");
      const data = await response.data;      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Define a new action for adding a poll
export const addPoll = (poll) => {
    return {
      type: "polls/addPoll",
      payload: poll,
    };
  };

// Initial state of the polls slice
const initialState = {
  polls: [],
  loading: false,
  error: null,
  status: null,
};

// polls slice definition
export const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    addPoll: (state, action) => {
      state.polls = [action.payload, ...state.polls];  // Add new poll at the beginning of the list
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch polls
      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.status = null;
        state.polls = action.payload;
        
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.error = action.error.message;
      })
  },
});

// Export actions and reducer
export default pollsSlice.reducer;