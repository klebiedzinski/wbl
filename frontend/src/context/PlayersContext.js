import { createContext, useReducer } from 'react';

export const PlayersContext = createContext();

export const playersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return {
                players: action.payload,
            };
        case 'ADD_PLAYER':
            return {
                players: state.players ? [...state.players, action.payload] : null,
            };
        case 'DELETE_PLAYER':
            return {
                players: state.players ? state.players.filter((player) => player.id !== action.payload) : null,
            };
        case 'UPDATE_PLAYER':
            return {
                players: state.players ? state.players.map((player) => {
                    if (player._id === action.payload.id) {
                        return action.payload;
                    }
                    return player;
                }) : null,
            };
        default:
            return state;
    }
};

export const PlayersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(playersReducer, {
        players: null,

    });

    return (
        <PlayersContext.Provider value={{...state, dispatch}}>
            {children}
        </PlayersContext.Provider>
    );
    };

