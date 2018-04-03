import {
  INITIATE_GET_HOME_TODO_REQUEST,
  GET_HOME_TODO_COMPLETED,
  GET_HOME_TODO_FAILED,
  GET_HOME_TODO_ERROR,
  SET_HOME_TODOS
} from './todo.action';

const initialState = {
  todoList: [],
  isFetching: false,
  error: '',
  count: 0
};

const todo = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_GET_HOME_TODO_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case GET_HOME_TODO_COMPLETED:
      return Object.assign({}, state, {
        todoList: action.todo,
        isFetching: action.isFetching
      });

    case GET_HOME_TODO_FAILED:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });


    case GET_HOME_TODO_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case SET_HOME_TODOS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default todo;
