// Là nơi xác định State thay đổi như thế nào.
import { userType } from "../actions/type.js";

const INITIAL_STATE = {
  userInfo: {
    paramUserId: null,
    userId: null,
    firstName: null,
    lastName: null,
    email: null
  }
};

const applySetInfoUser = (state, action) => {
  return {
    ...state,
    userInfo: action.user
  };
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userType.SET_USER:
      return applySetInfoUser(state, action);
    default:
      return state;
  }
};

export default reducer;
