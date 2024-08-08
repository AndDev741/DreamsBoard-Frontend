import { combineReducers } from '@reduxjs/toolkit'
import loginSlice from './pages/authentication/loginSlice';
import newBoardSlice from './pages/board/newBoard/newBoardSlice';

const rootReducer = combineReducers({
    login: loginSlice,
    newBoard: newBoardSlice
});

export default rootReducer;