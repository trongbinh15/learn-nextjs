import { createSelector, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { loginAsync } from './authSlice';
import { addTaskAsync, deleteTaskAsync, fetchTasksAsync, updateTaskAsync } from './taskSlice';
import { addUserAsync, deleteUserAsync, fetchUsersAsync, updateUserAsync } from './usersSlice';

type BaseState = {
  loading: boolean;
  error: string;
}

const initialState: BaseState = {
  loading: false,
  error: ''
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(
          fetchUsersAsync,
          deleteUserAsync,
          addUserAsync,
          updateUserAsync,
          fetchTasksAsync,
          addTaskAsync,
          updateTaskAsync,
          deleteTaskAsync,
          loginAsync,
        ),
        (state) => {
          state.loading = true;
          state.error = '';
        }
      )

      .addMatcher(
        isFulfilled(
          fetchUsersAsync,
          deleteUserAsync,
          addUserAsync,
          updateUserAsync,
          fetchTasksAsync,
          addTaskAsync,
          updateTaskAsync,
          deleteTaskAsync,
          loginAsync,
        ),
        (state) => {
          state.loading = false;
          state.error = '';
        }
      )

      .addMatcher(
        isRejected(
          fetchUsersAsync,
          deleteUserAsync,
          addUserAsync,
          updateUserAsync,
          fetchTasksAsync,
          addTaskAsync,
          updateTaskAsync,
          deleteTaskAsync,
          loginAsync,
        ),
        (state, action) => {
          state.loading = false;
          state.error = '' + action.payload;
        }
      )
  }
});

const loading = (state: BaseState) => state.loading;

export const loadingSelector = createSelector(loading, (loading) => loading);

export default baseSlice.reducer;
