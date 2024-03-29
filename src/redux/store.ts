import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./reducers/authReducers";
import { createLogger } from 'redux-logger';
const logger = createLogger();

const store = configureStore({
    reducer: {
        authReducers
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;