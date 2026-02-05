import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import  { type User } from "../../interfaces";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null as User | null,
    },
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});     

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;