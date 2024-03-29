import { applyMiddleware, legacy_createStore as createStore,compose } from "redux";
import thunk from 'redux-thunk';
import rootreducer from "./reducer"


const middleware=[thunk]
const store=createStore(
    rootreducer, 
    compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;