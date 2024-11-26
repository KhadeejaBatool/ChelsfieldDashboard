// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    role: '',
    id: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { email, role, id } = action.payload;
            state.email = email;
            state.role = role;
            state.id = id;
        },
        logout: (state) => {
            state.email = '';
            state.role = '';
            state.id = '';
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
