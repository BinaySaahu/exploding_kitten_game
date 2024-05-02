import { configureStore } from '@reduxjs/toolkit'
// import todoReducer from "./Counter"
import userReducer from "./slices/userSlice"
import scoreReducer from "./slices/score"
// import score

export const store = configureStore({
  reducer: {
    user: userReducer,
    score: scoreReducer
  },
})