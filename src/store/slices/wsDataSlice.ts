import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Optional: store WS event data in Redux so any component can read it
 * via useSelector. Dispatch these actions from onMessageHandler when
 * you want app-wide state.
 */
const wsDataSlice = createSlice({
  name: "wsData",
  initialState: {
    nearbyUser: null as unknown,
  },
  reducers: {
    setNearbyUser: (state, action: PayloadAction<unknown>) => {
      state.nearbyUser = action.payload;
    },
  },
});

export const { setNearbyUser } = wsDataSlice.actions;
export default wsDataSlice.reducer;
