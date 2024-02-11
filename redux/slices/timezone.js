// import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// create slice
const name = "timezone";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
  name,
  initialState,
  extraReducers,
});

// exports

export const timezoneActions = { ...slice.actions, ...extraActions };

export default slice.reducer;

// implementation

function createInitialState() {
  return {
    timezone: {
      data: [],
      loading: false,
      error: null,
    },
  };
}

function createExtraActions() {
  return {
    fetchTimeZone: fetchTimeZone(),
  };

  function fetchTimeZone() {
    return createAsyncThunk(`${name}/fetchtimezone`, async () => {
      try {
        const response = await axios.get(
          `https://api.ipstack.com/check/?access_key=f8cffb6ef2c8da8e1618e12bfaba6df0&fields=time_zone,currency`
        );
        // window.localStorage.setItem("timezone", JSON.stringify(response?.data || {}))
        return response;
      } catch (err) {
        throw err.response.data;
      }
    });
  }
}
function createExtraReducers() {
  return {
    ...fetchTimeZone(),
  };

  function fetchTimeZone() {
    const { pending, fulfilled, rejected } = extraActions.fetchTimeZone;
    return {
      // [pending]: (state) => {
      //   // state.data = { loading: true, data: [] };
      //   (state.loading = true), (state.data = []);
      // },
      // [fulfilled]: (state, action) => {
      //   (state.data = action?.payload.time_zone),
      //     (state.loading = false),
      //     (state.error = null);
      // },
      // [rejected]: (state, action) => {
      //   (state.loading = false), (state.data = []), (state.error = error);
      // },

      //  my code --
      [pending]: (state) => {
        state.timezone = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.timezone = {
          loading: false,
          // data: action?.payload.data,
          error: false,
        };
      },
      [rejected]: (state) => {
        state.timezone = { loading: false, error: true };
      },
    };
  }
}
