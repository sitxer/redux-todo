import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "../actions/todos";

let nextTodoId = 0;

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: nextTodoId++,
          text: action.payload,
          isCompleted: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    case DELETE_TODO:
      return state.filter((todo, index) => {
        return index !== action.payload;
      });
    default:
      return state;
  }
};

export default todos;
