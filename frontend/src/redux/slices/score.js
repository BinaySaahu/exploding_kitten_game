import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
  name: 'score',
  initialState:{
    highscores: [],
  },
  reducers: {
    setScores:(state,action)=>{
        console.log(action.payload)
        state.highscores = action.payload;
        sortTheScores(state.highscores)
    },
    addScore: (state, action) => {
        state.highscores.forEach(element => {
            if(element.email === action.payload.email){
                element.points = element.points + 3
            }  
        });
        sortTheScores(state.highscores)

    },
    removeScore: (state,action) => {
        state.highscores.forEach(element => {
            if(element.email === action.payload.email){
                if(element.points > 0){
                    element.points = element.points - 1
                }
            }  
        });
        sortTheScores(state.highscores)
    }
  },
})

const sortTheScores = (highscores)=>{
    

}


export const { addScore, removeScore, setScores } = scoreSlice.actions

export default scoreSlice.reducer