import { createStore } from "redux";

import { combineReducers } from 'redux';


function rootReducer() {
    return combineReducers({
        
    });
}

export function configureStore(){
    return createStore(rootReducer())
}