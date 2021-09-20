import { combineReducers } from "redux";

const userReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'GET_USER':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const taskReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'GET_TASK':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const reducers = combineReducers({
  users: userReducer,
  tasks: taskReducer
});

export default reducers;