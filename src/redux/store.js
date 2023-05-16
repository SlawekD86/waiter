import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tablesReducer from './tablesRedux';
import tableStatusReducer from './tableStatusRedux';

const rootReducer = combineReducers({
  tables: tablesReducer,
  tableStatus: tableStatusReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
