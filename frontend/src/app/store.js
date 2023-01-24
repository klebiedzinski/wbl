import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import gamesReducer from '../features/games/gamesSlice';
import logger from 'redux-logger';

export default configureStore({
    reducer: {
        users: usersReducer,
        games: gamesReducer
    },
    middleware: [logger]
})
