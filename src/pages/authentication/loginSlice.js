import {createSlice } from '@reduxjs/toolkit';

function saveState(state){
    try{
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('redux-user-state', serializedState);
    }catch(err){
        console.error(err);
    }
}

function loadState(){
    try{
        const serializedState = sessionStorage.getItem('redux-user-state');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        console.err(err);
    }
}


const initialState = loadState() || {
    id: null,
    img_link: '',
    name: '',
    perfil_phrase: '',
    registerPhrase: '',
}

const loginSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        idEnter(state, action){
            const id = action.payload;
            saveState(state);
            return {...state, id}
        },
        img_linkEnter(state, action){
            const img_link = action.payload;
            saveState(state);
            return {...state, img_link}
        },
        nameEnter(state, action){
            const name = action.payload;
            saveState(state);
            return {...state, name};
        },
        perfil_phraseEnter(state, action){
            const perfil_phrase = action.payload;
            saveState(state);
            return {...state, perfil_phrase};
        },
        registerEnter(state, action){
            const registerPhrase = action.payload;
            saveState(state);
            return {...state, registerPhrase};
        }
    }
})

export const {idEnter, img_linkEnter, nameEnter, perfil_phraseEnter, registerEnter} = loginSlice.actions;
export default loginSlice.reducer;