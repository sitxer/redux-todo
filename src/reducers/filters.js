const filters = (state = "all", action) => {
  switch (action.type) {
    case "FILTER_CHANGE":
      return (state = action.filter);
    default:
      return state;
  }
};

export default filters;
