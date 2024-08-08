import { createSlice } from "@reduxjs/toolkit";
import loginSlice from "../../authentication/loginSlice";

const initialState = {
    userId: null,
    background_img : null,
    title : '',
    secondary_img : null,
    secondary_phrase : null,
    reasons:[],
    mainElements:[]
}

const newBoardSlice = createSlice({
    name: 'newBoard',
    initialState,
    reducers: {
        userIdEnter(state, action){
            const userId = action.payload;
            return {...state, userId}
        },
        background_imgEnter(state, action){
            const background_img = action.payload;
            return {...state, background_img}
        },
        titleEnter(state, action){
            const title = action.payload;
            return {...state, title}
        },
        secondary_imgEnter(state, action){
            const secondary_img = action.payload;
            return {...state, secondary_img}
        },
        secondary_phraseEnter(state, action){
            const secondary_phrase = action.payload;
            return {...state, secondary_phrase};
        },
        reasonsEnter(state, action){
            const reasons = action.payload;
            return {...state, reasons};
        },
        mainElementsEnter(state, action){
            const mainElements = action.payload;
            return {...state, mainElements};
        }
    }
})

export const {userIdEnter, background_imgEnter, titleEnter, secondary_imgEnter, secondary_phraseEnter, reasonsEnter, mainElementsEnter} = newBoardSlice.actions;

export default newBoardSlice.reducer;