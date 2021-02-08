// Chỗ này mang các thông tin dùng để gửi từ ứng dụng đến Store.
import { surveyType } from "./type.js";

export const updateValidation = validator => dispatch => {
  return dispatch({
    type: surveyType.UPDATE_VALIDATION,
    validator
  });
};