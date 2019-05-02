import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "../actions/todos";
import { FILTER_CHANGE } from "../actions/filters";

const logs = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        `${action.meta.date} - добавил задачу ${action.payload}`,
      ];
      break;
    case TOGGLE_TODO:
      return [...state, `${action.meta.date} - изменил готовность у задачи с id  ${action.payload}`];
      break;
    case DELETE_TODO:
      return [
        ...state,
        `${action.meta.date} - удалил задачу с id ${action.payload}`,
      ];
      break;
    case FILTER_CHANGE:
      return [
        ...state,
        `${action.meta.date} - изменил порядок фильтрации на ${action.filter}`,
      ];
      break;
    default:
      return state;
  }
};

export default logs;
