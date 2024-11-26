import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    user: userReducer,

});

export default configureStore({
    reducer: rootReducer,
});