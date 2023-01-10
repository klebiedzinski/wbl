import { createContext, useReducer } from 'react';

export const GamesContext = createContext();

export const gamesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GAMES':
            return {
                games: action.payload,
            };
        case 'ADD_GAME':
            return {
                games: state.games ? [...state.games, action.payload] : null,
            };
        case 'DELETE_GAME':
            return {
                games: state.games ? state.games.filter((game) => game._id !== action.payload) : null,
            };
        case 'UPDATE_GAME':
            return {
                games: state.games ? state.games.map((game) => {
                    if (game._id === action.payload.id) {
                        return action.payload;
                    }
                    return game;
                }) : null,
            };
        default:
            return state;
    }
};

export const GamesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gamesReducer, {
        games: null,

    });

    return (
        <GamesContext.Provider value={{...state, dispatch}}>
            {children}
        </GamesContext.Provider>
    );
    };

