import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { localApi } from '../../../config/api';


export type ITask = {
  userId: string;
  name: string;
  id: string;
}

export type TaskState = {
  tasks: ITask[],
}

export const fetchTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<ITask[]>(localApi.getAllTask);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, thunkApi) => {
    try {
      await axios.delete(localApi.deleteTask.replace('{id}', id));
      return id;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

export const addTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async (model: ITask, thunkApi) => {
    try {
      const response = await axios.post<ITask>(localApi.addTask, model);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async (model: ITask, thunkApi) => {
    try {
      const response = await axios.put<ITask>(localApi.updateTask.replace('{id}', model.id), model);
      return { id: model.id, model: response.data };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

const initialState: TaskState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.tasks = action.payload || [];
      })
      .addCase(fetchTasksAsync.rejected, (state) => {
        state.tasks = [];
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(x => x.id !== action.payload);
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks = [...state.tasks, action.payload];
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(x => x.id === action.payload.id);
        state.tasks[index] = { ...state.tasks[index], ...action.payload.model }
      })
  }
});

const tasks = (state: TaskState) => state.tasks;
const taskByUserId = (_: TaskState, userId: string) => userId;

export const taskByUserIdSelector = createSelector(tasks, taskByUserId,
  (tasks, userId) => tasks.filter(x => x.userId === userId)
);

export default tasksSlice.reducer;
