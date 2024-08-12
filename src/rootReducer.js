import { combineReducers } from '@reduxjs/toolkit'
import loginSlice from './pages/authentication/loginSlice';
import dreamBoardSlice from './pages/board/dreamBoardSlice';
import newBoardSlice from './pages/board/newBoard/newBoardSlice';

const rootReducer = combineReducers({
    login: loginSlice,
    newBoard: newBoardSlice,
    dreamBoard: dreamBoardSlice
});

export default rootReducer;