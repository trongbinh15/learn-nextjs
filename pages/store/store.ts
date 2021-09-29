import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import tasksReducer from './slices/taskSlice';
import baseSlice from './slices/baseSlice';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useMemo } from 'react';
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
	users: usersReducer,
	tasks: tasksReducer,
	base: baseSlice
});

let store: any;

function initStore(initialState: any) {
	return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export const initializeStore = (preloadState: any) => {
	let _store = store ?? initStore(preloadState);

	if (preloadState && store) {
		_store = initStore({
			...store.getState(),
			...preloadState
		})
		_store = undefined;
	}

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;
	return _store;
}

export function useStore(initialState: any) {
	const store = useMemo(() => initializeStore(initialState), [initialState]);
	return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

