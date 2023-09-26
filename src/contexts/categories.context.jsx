import { createContext, useState, useEffect, useReducer} from "react";


import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext();

export const CATEGORIES_ACTION_TYPE = {
    SET_CATEGORIES: 'SET_CATEGORIES'
}
export const CATEGORIES_INITIAL_STATE = {
    categoriesMap: [],
}


export const categoriesReducer = (state, action = {} ) => {
    const {type, payload} = action;
    switch(type) {
        case CATEGORIES_ACTION_TYPE.SET_CATEGORIES: 
            return {
                ...state,
                categoriesMap: payload
            };
        default : return state;
    }
}

export const CategoriesProvider = ({children}) => {
    const [{categoriesMap},dispatch] = useReducer(categoriesReducer,CATEGORIES_INITIAL_STATE)

    useEffect(()=> {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            dispatch({
                type: CATEGORIES_ACTION_TYPE.SET_CATEGORIES,
                payload:categoryMap
            })
        };
        getCategoriesMap()
    }, []);


    const value = { categoriesMap };

    return (<CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>);
}