import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "token",
    initialState: null,
    reducers: {
        setToken: (state, action) => {
            return action.payload;
        },
        removeToken: (state) => {
            return null;
        },  
    },
});

/*Just understanding what goes on under the hood of createSlice : nothing to be worried about*/

// function setToken(payload){
//     return {
//         type: "token/setToken",
//         payload: payload,
//     }
// }

// function reducer1(state = null, action: { type: string, payload: string }){
//     if(action.type === "token/setToken"){
//         return action.payload;
//     }
//     return state;
// }

// function reducer(state = { accessToken: null }, action: { type: string, payload: string }){
//     if(action.type === "token/setToken"){
//         return {
//             ...state,
//             accessToken: action.payload,
//         };
//     }
//     return state;
// }

// const tokenSlice2 = createSlice({
//     name: "token",
//     initialState: {
//         accessToken: null,
//     },
//     reducers: {
//         setToken: (state, action) => {
//             state.accessToken = action.payload;
//         },
//     },
// });

// const tokenSlice1 = {
//     name: "token",
//     initialState: null,
//     reducer: (state = null, action: { type: string, payload: string }) => {
//         if(action.type === "token/setToken"){
//             return action.payload;
//         }
//         return state;
//     },
//     actions: {
//         setToken: (payload: string) => {
//             return {
//                 type: "token/setToken",
//                 payload: payload,
//             };
//         },
//     },
// }

// const tokenSlice2 = {
//     name: "token",
//     initialState: {
//         accessToken: null
//     },
//     reducer: (state = {
//         accessToken: null
//     }, action: {type: string, payload: string}) => {
//         if(action.type === "token/setToken"){
//             return {
//                 ...state,
//                 accessToken: action.payload
//             }
//         }
//         return state
//     },
//     actions: {
//         setToken: (payload: string) => {
//             return {
//                 type: "token/setToken",
//                 payload: payload
//             }
//         }
//     }
// }

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;