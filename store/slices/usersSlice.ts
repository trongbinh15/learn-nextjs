import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { localApi } from '../../config/api';
import { IUser } from '../../models/user.model';

export type UserState = {
  users: IUser[],
}

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IUser[]>(localApi.getAllUsers);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  'users/deleteUser',
  async (id: string, thunkApi) => {
    try {
      await axios.delete(localApi.deleteUser.replace('{id}', id));
      return id;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

export const addUserAsync = createAsyncThunk(
  'users/addUser',
  async (model: IUser, thunkApi) => {
    try {
      const response = await axios.post<IUser>(localApi.addUser, model);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (model: IUser, thunkApi) => {
    try {
      const response = await axios.put<IUser>(localApi.updateUser.replace('{id}', model.id), model);
      return { id: model.id, model: response.data };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

const initialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload || [];
      })
      .addCase(fetchUsersAsync.rejected, (state) => {
        state.users = [];
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter(x => x.id !== action.payload);
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.users = [...state.users, action.payload];
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(x => x.id === action.payload.id);
        state.users[index] = { ...state.users[index], ...action.payload.model }
      })
  }
});

const users = (state: UserState) => state.users;
const userById = (_: UserState, id: string) => id;

export const usersSelector = createSelector(users,
  (users) => users
);

export const userByIdSelector = createSelector(users, userById,
  (users, id) => users.find(x => x.id === id)
);


export default usersSlice.reducer;
