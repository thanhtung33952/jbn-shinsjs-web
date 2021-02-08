import { appType } from "../actions/type.js";

const INITIAL_STATE = {
  queryParam: {}
};

const applySetQueryParam = (state, action) => ({
  ...state,
  queryParam: action.param
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case appType.SET_Q_PARAM:
      return applySetQueryParam(state, action);
    default:
      return state;
  }
};

export default reducer;
