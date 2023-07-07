// import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

// import { rootReducer } from "./root-reducer";


// // const loggerMiddleware = (store) => (next) => (action) => {
// //     if(!action.type){
// //         return next(action);
// //     }

// //     console.log('type:', action.type);
// //     console.log('payload:', action.payload);
// //     console.log('currentState:', store.getState());

// //     next(action);

// //     console.log('next state: ', store.getState());
// // }

// const middleWares = [logger];


// const composedEnhancers = compose(applyMiddleware(...middleWares))
// // the first parameter is the important one 
// // logger helps us to see what the state looks like before an action is dispatched 
// //what the action is and what the state looks after the action
// // second argument is the default state 

// export const store = createStore(rootReducer, undefined, composedEnhancers);