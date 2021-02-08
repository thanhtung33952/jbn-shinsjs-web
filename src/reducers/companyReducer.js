// Là nơi xác định State thay đổi như thế nào.
import { companyType, userTempType } from "../actions/type.js";

const INITIAL_STATE = {
  companyInfo: {
    companyId: null,
    companyName: null
  },
  userTempInfo: {
    paramUserTempId: null
  }
};

const applySetInfoCompany = (state, action) => {
  return {
    ...state,
    companyInfo: action.company
  };
};
const applySetInfoUserTemp = (state, action) => {
  return {
    ...state,
    userTempInfo: action.userTemp
  };
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case companyType.SET_COMPANY:
      return applySetInfoCompany(state, action);
    case userTempType.SET_USERTEMP:
      return applySetInfoUserTemp(state, action);
    default:
      return state;
  }
};

export default reducer;
