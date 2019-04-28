import { FILTER_CHANGE } from "../actions/filters";

const filters = (state = "all", action) => {
  switch (action.type) {
    case FILTER_CHANGE:
      return action.filter;
    default:
      return state;
  }
};

export default filters;
