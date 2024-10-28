import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
};

// Load user from local storage if it exists
const storedUser  = localStorage.getItem('user');
if (storedUser ) {
    const user = JSON.parse(storedUser );
    initialState.isAuthenticated = true;
    initialState.user = user;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user to local storage
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user'); // Remove user from local storage on logout
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;