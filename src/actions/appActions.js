import { appType } from "./type.js";

export const setQueryParam = param => dispatch => {
  return dispatch({
    type: appType.SET_Q_PARAM,
    param
  });
};
