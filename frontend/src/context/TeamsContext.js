import { createContext, useReducer } from 'react';

export const TeamsContext = createContext();

export const teamsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TEAMS':
            return {
                teams: action.payload,
            };
        case 'ADD_TEAM':
            return {
                teams: state.teams ? [...state.teams, action.payload] : null,
            };
        case 'DELETE_TEAM':
            return {
                teams: state.teams ? state.teams.filter((team) => team.id !== action.payload) : null,
            };
        case 'UPDATE_TEAM':
            return {
                teams: state.teams ? state.teams.map((team) => {
                    if (team._id === action.payload.id) {
                        return action.payload;
                    }
                    return team;
                }) : null,
            };
        default:
            return state;
    }
};

export const TeamsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(teamsReducer, {
        teams: null,

    });

    return (
        <TeamsContext.Provider value={{...state, dispatch}}>
            {children}
        </TeamsContext.Provider>
    );
    };

