import { combineReducers } from '@reduxjs/toolkit'
import loginSlice from './pages/authentication/loginSlice';
import dreamBoardSlice from './pages/board/dreamBoardSlice';
import editBoardSlice from './pages/board/editBoard/editBoardSlice';

const rootReducer = combineReducers({
    login: loginSlice,
    editBoard: editBoardSlice,
    dreamBoard: dreamBoardSlice
});

export default rootReducer;