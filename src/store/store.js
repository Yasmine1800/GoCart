import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";


const middleWares = [logger];


const composedEnhancers = compose(applyMiddleware(...middleWares))
// the first parameter is the important one 
// logger helps us to see what the state looks like before an action is dispatched 
//what the action is and what the state looks after the action
// second argument is the default state 

export const store = createStore(rootReducer, undefined, composedEnhancers);