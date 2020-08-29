import { SET_EVENT_LOADING, SET_STAGE_REVIEW_DATA } from '../actions/types';

const initialState = {
  event: null,
  loading: false,
  stage: null,
  stageResult: null,
  votes: null,
  eventUsers: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_EVENT_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_STAGE_REVIEW_DATA:
      return {
        ...state,
        loading: false,
        ...payload,
      };

    default:
      return state;
  }
}
