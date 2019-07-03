const MEAL_LIST = [];
const DOCUMENT_LIST = [];
const SCHEDULE_LIST = [];

export const setMealList = mealList => ({ type: MEAL_LIST, mealList });
export const setDocumentList = documentList => ({ type: DOCUMENT_LIST, documentList });
export const setScheduleList = scheduleList => ({ type: SCHEDULE_LIST, scheduleList });

const initialState = {
  mealList: {},
  documentList: [],
  scheduleList: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MEAL_LIST:
      return {
        ...state,
        mealList: action.mealList,
      };
    case DOCUMENT_LIST:
      return {
        ...state,
        documentList: action.documentList,
      };
    case SCHEDULE_LIST:
      return {
        ...state,
        scheduleList: action.scheduleList,
      };
    default:
      return state;
  }
};

const actionCreators = {
  setMealList,
  setDocumentList,
  setScheduleList,
};

export { actionCreators };

export default reducer;
