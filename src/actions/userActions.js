// Chỗ này mang các thông tin dùng để gửi từ ứng dụng đến Store.
import { userType } from "./type.js";

export const setInfoUser = user => dispatch => {
  return dispatch({
    type: userType.SET_USER,
    user
  });
};
