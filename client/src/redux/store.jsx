import {configureStore} from "@reduxjs/toolkit";
import {cryptoNewsApi} from "./../services/newsApi"

export default configureStore({
    reducer: {
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
})