import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer: Reducer<any> = combineReducers({
    routing: routerReducer
});

export default rootReducer;
