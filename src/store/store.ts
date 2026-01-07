import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import tokenReducer from "./slices/tokenSlice";
import userReducer from "./slices/userSlice";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    token: tokenReducer,
    user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  blacklist: ['token']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export const persistor = persistStore(store);

export default store;
