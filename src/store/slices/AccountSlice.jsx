import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false,
        error: null,
        favorites: [], // Array of favorite characters
        firebaseFavoritesFetched: false, // Flag to know if the favorites characters were fetched from firebase
        counterFavorites: 0, // Counter for the number of favorites characters
        token: null, // Token of firebase authentication
        muted: false, // Flag to know if the sound is muted
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
            const newItem = action.payload;
            console.warn('newitem', newItem)
            // Verifies if the item is already in the favorites array
            if (!state.favorites.includes(newItem)) {
                state.favorites.push(newItem);

            } else {
                console.error('incorrect slice')
            }
        },
        removeFromFavorites: (state, action) => {
            const itemIdToRemove = action.payload;
            state.favorites = state.favorites.filter(itemId => itemId !== itemIdToRemove);
        },
        incrementCounterFavorites: (state, action) => {
            state.counterFavorites = action.payload;
        },
        setFirebaseFavoritesFetched: (state, action) => {
            state.firebaseFavoritesFetched = action.payload;
        },
        setMuted: (state, action) => {
            state.muted = action.payload;
        },
    },
});

export const { setUser, setLoading, setError, clearUser,
    addToFavorites, removeFromFavorites, incrementCounterFavorites,
    setFirebaseFavoritesFetched, setMuted } = userSlice.actions;

// export const selectCurrentUser = (state) => state.user.currentUser;

// export const selectIsLoading = (state) => state.user.isLoading;

// export const selectError = (state) => state.user.error;

export default userSlice;