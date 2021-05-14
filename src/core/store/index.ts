import { combineReducers } from 'redux';
import { createStore } from 'redux';

import gameReducer from './game.reducer';

const rootReducer = combineReducers({
    gameReducer
});

const store = createStore(
    rootReducer
);

export default store;