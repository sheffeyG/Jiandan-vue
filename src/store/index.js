import { createStore, createLogger } from 'vuex'
import root from "./root";
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        root
    },

    strict: debug,
    plugins: debug ? [createLogger()] : []
})