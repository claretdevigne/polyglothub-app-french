import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  main: "home",
  lectionID: null,
  titles: null,
  title: null,
  french: null,
  translation: null
}

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    SET_MAIN: (state, action) => {
      state.main = action.payload
    },

    SET_LECTION_ID: (state, action) => {
      state.lectionID = action.payload
    },

    SET_TITLES: (state, action) => {
      state.titles = action.payload
    },

    SET_FRENCH: (state, action) => {
      state.french = action.payload
    },

    SET_TRANSLATION: (state, action) => {
      state.translation = action.payload
    },

    SET_TITLE: (state, action) => {
      state.title = action.payload
    },
  }
})

export const { SET_MAIN, SET_LECTION_ID, SET_TITLES, SET_FRENCH, SET_TRANSLATION, SET_TITLE } = globalState.actions
export default globalState.reducer