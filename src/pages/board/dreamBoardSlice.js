import { createSlice } from "@reduxjs/toolkit";

function saveState(state){
    try{
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('redux-dreamBoard-state', serializedState);
    }catch(err){
        console.error(err);
    }
}

function loadState(){
    try{
        const serializedState = sessionStorage.getItem('redux-dreamBoard-state');
        console.log(serializedState)
        if(serializedState === null){
            console.log("null como?")
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        console.err(err);
    }
}

const initialState = loadState() || {
    id: null,
}

const dreamBoardSlice = createSlice({
    name: 'dreamBoard',
    initialState,
    reducers: {
        idEnter(state, action){
            const id = action.payload;
            saveState({id: id});
            return {...state, id}
        },
    }
})

export const {idEnter} = dreamBoardSlice.actions;

export default dreamBoardSlice.reducer;