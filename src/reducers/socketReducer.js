// Là nơi xác định State thay đổi như thế nào.
import { socketType } from "../actions/type.js";

const INITIAL_STATE = {
  socket: null
};

const applySetSocket = (state, action) => {
  return {
    ...state,
    socket: action.socket
  };
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case socketType.SET_SOCKET:
      return applySetSocket(state, action);
    default:
      return state;
  }
};

export default reducer;
