import { createSlice } from "@reduxjs/toolkit"

const gamesSlice = createSlice({
    name: "games",
    initialState: {
        games: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setGamesReducer: (state, action) => {
            state.games = action.payload
        },
        addGameReducer: (state, action) => {
                state.games.push(action.payload)
            },
        deleteGameReducer: (state, action) => {
            state.games = state.games.filter(game => game._id !== action.payload._id)
        },
        editGameReducer: (state, action) => {
            state.games = state.games.map(game => {
                if(game._id === action.payload._id) {
                    return action.payload
                } else {
                    return game
                }
            })
        }
    }

})

export const selectGames = state => state.games;


export const { addGameReducer, deleteGameReducer, editGameReducer, setGamesReducer} = gamesSlice.actions;

export default gamesSlice.reducer;