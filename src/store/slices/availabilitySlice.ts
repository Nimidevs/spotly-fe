import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const availabilitySlice = createSlice({
    name: "availability",
    initialState: {
        isAvailable: false,
},
    reducers: {
        setAvailability: (state, action: PayloadAction<boolean>) => {
            state.isAvailable = action.payload;
        },
        
    },
});

export const { setAvailability } = availabilitySlice.actions;
export default availabilitySlice.reducer;