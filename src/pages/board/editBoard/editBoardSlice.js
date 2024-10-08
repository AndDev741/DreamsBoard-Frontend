import { createSlice } from "@reduxjs/toolkit";

function saveState(state){
    try{
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('redux-newBoard-state', serializedState);
    }catch(err){
        console.error(err);
    }
}

function loadState(){
    try{
        const serializedState = sessionStorage.getItem('redux-newBoard-state');
        console.log(serializedState)
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        console.err(err);
    }
}

const initialState = loadState() || {
    dreamBoardId: null,
    userId: null,
    background_img : null,
    background_img_id : null,
    title : '',
    mainObjective_img : null,
    mainObjective_img_id : null,
    mainObjective_textEnter : '',
    objective_img: null,
    objective_img_id: null,
    objective_text: '',
    reasonTitle: '',
    reasons:[],
}

const editBoardSlice = createSlice({
    name: 'editBoard',
    initialState,
    reducers: {
        dreamBoardIdEnter(state, action){
            const dreamBoardId = action.payload;
            saveState(state);
            return {...state, dreamBoardId};
        },
        userIdEnter(state, action){
            const userId = action.payload;
            saveState(state);
            return {...state, userId}
        },
        background_imgEnter(state, action){
            const background_img = action.payload;
            saveState(state);
            return {...state, background_img}
        },
        background_img_idEnter(state, action){
            const background_img_id = action.payload;
            saveState(state);
            return {...state, background_img_id};
        },
        titleEnter(state, action){
            const title = action.payload;
            saveState(state);
            return {...state, title}
        },
        mainObjective_imgEnter(state, action){
            const mainObjective_img = action.payload;
            saveState(state);
            return {...state, mainObjective_img}
        },
        mainObjective_img_idEnter(state, action){
            const mainObjective_img_id = action.payload;
            saveState(state);
            return {...state, mainObjective_img_id}
        },
        mainObjective_textEnter(state, action){
            const mainObjective_text = action.payload;
            saveState(state);
            return {...state, mainObjective_text};
        },
        objective_imgEnter(state, action){
            const objective_img = action.payload;
            saveState(state);
            return {...state, objective_img};
        },
        objective_img_idEnter(state, action){
            const objective_img_id = action.payload;
            saveState(state);
            return {...state, objective_img_id};
        },
        objective_textEnter(state, action){
            const objective_text = action.payload;
            saveState(state);
            return {...state, objective_text};
        },
        reasonTitleEnter(state, action){
            const reasonTitle = action.payload;
            saveState(state);
            return {...state, reasonTitle};
        },
        reasonsEnter(state, action){
            const reasons = action.payload;
            saveState(state);
            return {...state, reasons};
        },
        
    }
})

export const {dreamBoardIdEnter , userIdEnter, background_imgEnter, background_img_idEnter,titleEnter, mainObjective_imgEnter, mainObjective_img_idEnter,mainObjective_textEnter, objective_imgEnter, objective_img_idEnter,objective_textEnter, reasonTitleEnter, reasonsEnter} = editBoardSlice.actions;

export default editBoardSlice.reducer;