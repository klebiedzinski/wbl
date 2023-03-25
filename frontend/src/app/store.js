import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import gamesReducer from '../features/games/gamesSlice';

export default configureStore({
    reducer: {
        users: usersReducer,
        games: gamesReducer,
    },
});
