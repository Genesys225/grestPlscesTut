import { placesReducer } from './reducers/places';
import { authReducer } from './reducers/auth';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	auth: authReducer,
	places: placesReducer,
});

export default createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(reduxThunk))
);
