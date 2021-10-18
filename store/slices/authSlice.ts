import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { localApiRoute } from '../../config/api';
import { GithubUserModel } from '../../models/user.model';

export type AuthState = {
  isAuthenticated: boolean;
  userName: string;
}

export const loginAsync = createAsyncThunk<
  any,
  string,
  {}>(
    'auth/login',
    async (username: string, thunkApi) => {
      try {
        const response = await axios.get<GithubUserModel>(localApiRoute.login, { params: { username: username } });
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
      const response = await axios.get<any>(localApiRoute.logout);
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
  userName: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userName = action.payload.userName;
    },
    clearAuthenticated: (state) => {
      state.isAuthenticated = false;
      state.userName = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userName = action.payload.login;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false;
        state.userName = '';
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.userName = '';
      })
  }
});

const isAuthenticated = (state: AuthState) => state.isAuthenticated;
const username = (state: AuthState) => state.userName;

export const isAuthenticatedSelector = createSelector(isAuthenticated,
  (isAuthenticated) => isAuthenticated
);

export const usernameSelector = createSelector(username,
  (username) => username
);

export const { setAuthenticated, clearAuthenticated } = authSlice.actions;

export default authSlice.reducer;
