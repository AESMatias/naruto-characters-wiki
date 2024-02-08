import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            // const { email, displayName } = action.payload;
            state.currentUser = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        },
    },
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

// export const selectCurrentUser = (state) => state.user.currentUser;

// export const selectIsLoading = (state) => state.user.isLoading;

// export const selectError = (state) => state.user.error;

export default userSlice;