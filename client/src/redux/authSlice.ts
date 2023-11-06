import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserInfo {
  _id: string;
  username:string; 
};


const initialState : UserInfo | null = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') ?? '') : null;

export const authSlise  = createSlice({
  name:'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state = action.payload;
      localStorage.setItem('userInfo',JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state = null;
      localStorage.removeItem('userInfo')
    }
  }
})

export const { setCredentials, removeCredentials } = authSlise.actions;
export const selectCount = (state: RootState) => state.auth;
export default authSlise.reducer;