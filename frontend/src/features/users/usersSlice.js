import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setUsersReducer: (state, action) => {
            state.users = action.payload
        },
        addUserReducer: (state, action) => {
                state.users.push(action.payload)
            },
        deleteUserReducer: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload._id)
        },
        editUserReducer: (state, action) => {
            state.users = state.users.map(user => {
                console.log(action.payload)
                if(user._id === action.payload._id) {
                    return action.payload
                } else {
                    return user
                }
            })
        }
    }
    
})

export const selectUsers = state => state.users;


export const { addUserReducer, deleteUserReducer, editUserReducer, setUsersReducer} = usersSlice.actions;

export default usersSlice.reducer;
