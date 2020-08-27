import {
  SET_EVENT_DATA,
  SET_EVENT_LOADING,
  SET_RANKING_DATA,
} from '../actions/types';

const initialState = {
  event: {},
  riders: [],
  stages: [],
  votes: null,
  podiumvotes: null,
  stageResults: null,
  podiumResults: null,
  loading: false,
  ranking: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_EVENT_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_EVENT_DATA:
    case SET_RANKING_DATA:
      return {
        ...state,
        loading: false,
        ...payload,
      };

    default:
      return state;
  }
}
