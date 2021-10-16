import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import tasksReducer from './slices/taskSlice';
import baseSlice from './slices/baseSlice';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { createWrapper, HYDRATE } from 'next-redux-wrapper';


const bindMiddleware = (middleware: any[]) => {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools(applyMiddleware(...middleware))
	}
	return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
	users: usersReducer,
	tasks: tasksReducer,
	base: baseSlice
});


const reducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		}
		if (state.users.length === 0) {
			nextState.users = action.payload.users;
		}
		if (state.tasks.length === 0) {
			nextState.tasks = action.payload.tasks;
		}
		return nextState;
	} else {
		return combinedReducer(state, action)
	}
}

let store: any;

function initStore() {
	store = createStore(reducer, bindMiddleware([thunkMiddleware]));
	return store;
}

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper(initStore);


