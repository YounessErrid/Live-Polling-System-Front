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
// Async thunk for creating a service
export const addPoll = createAsyncThunk(
  "polls/createPoll",
  async (poll, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/polls/create", poll);
      console.log(response);
      
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for deleting a poll
export const deletePoll = createAsyncThunk(
  "polls/deletePoll",
  async (pollId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/polls/${pollId}`);
      if (response.status !== 204) {
        throw new Error("Failed to delete poll");
      }
      console.log('deletePoll response', response);
      // Return the deleted poll ID for the reducer to update the state
      return { poll: { id: pollId } };
      // return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for updating a poll
export const updatePoll = createAsyncThunk(
  "polls/updatePoll",
  async ({ id, poll }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/polls/${id}`, poll);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
    resetPollStatus: (state) => {
      state.status = null;
      state.error = null;
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
        state.polls = action.payload;
        state.error = null;
        state.status = 'success';
        
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.error = action.error.message;
      })

      // Add poll
      .addCase(addPoll.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(addPoll.fulfilled, (state, action) => {
        state.polls = [...state.polls, action.payload];
        state.loading = false;
        state.status = "success";
      })
      .addCase(addPoll.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.error = action.error.message;
      })
      // Delete poll
      .addCase(deletePoll.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deletePoll.fulfilled, (state, action) => {
        state.loading = false;
        console.log('deletePoll fulfilled', action.payload.poll.id);
        
        state.polls = state.polls.filter((poll) => poll.id !== action.payload.poll.id);
        state.status = "success";
      })
      .addCase(deletePoll.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.error = action.error.message;
      })
      // Update poll
      .addCase(updatePoll.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(updatePoll.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.polls.findIndex((poll) => poll.id === action.payload.id);
        if (index !== -1) {
          state.polls[index] = action.payload;
        }
        state.status = "success";
      })
      .addCase(updatePoll.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { resetPollStatus } = pollsSlice.actions;
export default pollsSlice.reducer;