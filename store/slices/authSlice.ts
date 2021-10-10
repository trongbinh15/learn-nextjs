import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { localApi } from '../../config/api';

export type AuthState = {
  isAuthenticated: boolean;
}

export const loginAsync = createAsyncThunk<
  any,
  string,
  {}>(
    'auth/login',
    async (username: string, thunkApi) => {
      try {
        const response = await axios.get<any>(localApi.login, { params: { username: username } });
        return response.data;
      } catch (error: any) {
        if (!error.response) {
          throw error;
        }
        return thunkApi.rejectWithValue(error.response.data)
      }
    }
  );

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<any>(localApi.logout);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);



const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.isAuthenticated = false;
      })
  }
});

const isAuthenticated = (state: AuthState) => state.isAuthenticated;

export const isAuthenticatedSelector = createSelector(isAuthenticated,
  (isAuthenticated) => isAuthenticated
);

export default authSlice.reducer;
