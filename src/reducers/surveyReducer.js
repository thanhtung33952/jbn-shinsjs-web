// Là nơi xác định State thay đổi như thế nào.
import { surveyType } from "../actions/type.js";

const INITIAL_STATE = {
  validation: [
    { nameAcoor: "acoordion1", isVali: false },
    { nameAcoor: "acoordion2", isVali: false },
    { nameAcoor: "acoordion3", isVali: false },
    { nameAcoor: "acoordion4", isVali: false },
    { nameAcoor: "acoordion5", isVali: false },
    { nameAcoor: "acoordion6", isVali: false },
    { nameAcoor: "acoordion7", isVali: false },
    { nameAcoor: "acoordion8", isVali: false },
    { nameAcoor: "acoordion9", isVali: false },
    { nameAcoor: "acoordion10", isVali: false },
    { nameAcoor: "acoordion11", isVali: false },
    { nameAcoor: "acoordion12", isVali: false },
    { nameAcoor: "acoordion13", isVali: false },
    { nameAcoor: "acoordion14", isVali: false },
    { nameAcoor: "acoordion15", isVali: false }
  ]
};
const applyUpdateValidation = (state, action) => {
  let newValidation = state.validation.map(item => {
    if (item.nameAcoor === action.validator.nameAcoor) {
      return action.validator;
    }

    return item;
  });

  return {
    ...state,
    validation: newValidation
  };
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case surveyType.UPDATE_VALIDATION:
      return applyUpdateValidation(state, action);
    default:
      return state;
  }
};

export default reducer;
