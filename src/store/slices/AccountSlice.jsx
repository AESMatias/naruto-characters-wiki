import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false,
        error: null,
        favorites: [], // Array of favorite characters
        counterFavorites: 0, // Counter for the number of favorites characters
        token: null, // Token of firebase authentication
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
        addToFavorites: (state, action) => {
            const itemId = action.payload;
            // Verifies if the item is already in the favorites array
            if (!state.favorites.includes(itemId)) {
                state.favorites.push(itemId);
            }
        },
        removeFromFavorites: (state, action) => {
            const itemIdToRemove = action.payload;
            state.favorites = state.favorites.filter(itemId => itemId !== itemIdToRemove);
        },
        incrementCounterFavorites: (state, action) => {
            state.counterFavorites = action.payload;
        },
    },
});

export const { setUser, setLoading, setError, clearUser,
    addToFavorites, removeFromFavorites, incrementCounterFavorites } = userSlice.actions;

// export const selectCurrentUser = (state) => state.user.currentUser;

// export const selectIsLoading = (state) => state.user.isLoading;

// export const selectError = (state) => state.user.error;

export default userSlice;