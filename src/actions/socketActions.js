// Chỗ này mang các thông tin dùng để gửi từ ứng dụng đến Store.
import { socketType } from "./type.js";

export const setSocket = socket => dispatch => {
  return dispatch({
    type: socketType.SET_SOCKET,
    socket
  });
};
