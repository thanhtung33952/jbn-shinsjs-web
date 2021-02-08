// Chỗ này mang các thông tin dùng để gửi từ ứng dụng đến Store.
import { companyType, userTempType } from "./type.js";

export const setInfoCompany = company => dispatch => {
  return dispatch({
    type: companyType.SET_COMPANY,
    company
  });
};

export const setInfoUserTemp = userTemp => dispatch => {
  return dispatch({
    type: userTempType.SET_USERTEMP,
    userTemp
  });
};
