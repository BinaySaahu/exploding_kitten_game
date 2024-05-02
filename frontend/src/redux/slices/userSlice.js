import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { act } from 'react';
import { BASE_URL } from '../../utils';


export const userSlice = createSlice({
  name: 'user',
  initialState:{
    email:'',
    name: '',
    points:''
  },
  reducers: {
    setUser: (state, action) => {
        // state.user = action.payload
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.points = action.payload.points;
    },
    updateScore: (state,action)=>{
      if(action.payload.query === 'add'){
        state.points = state.points + 3;
        const pts = state.points;
        updateDatabase(pts,state.email)
      }else{
        if(state.points > 0){
          state.points = state.points - 1;
          const pts = state.points;
          updateDatabase(pts,state.email)

        }

      }
    }
  },
})

const updateDatabase = async (pts,email)=>{
  const res = await axios.post(`${BASE_URL}/updateScore`,{email:email,points:pts})
  console.log(res)

}

export const { setUser, updateScore } = userSlice.actions

export default userSlice.reducer