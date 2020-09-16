import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import {
  SET_EVENT_DATA,
  SET_EVENT_LOADING,
  SET_RANKING_DATA,
  SET_STAGE_REVIEW_DATA,
  SET_PODIUM_REVIEW_DATA,
} from '../actions/types';

//Get event by Id
export const getEventByID = (eventId, callback) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: SET_EVENT_LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(
      `/api/events/getDataForUser/${eventId}`,
      config
    );
    callback(res.data);
    dispatch({
      type: SET_EVENT_LOADING,
      payload: false,
    });
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
};

//getListVotes
export const getListVotes = (stageId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: SET_EVENT_LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(`/api/stages/getListVotes/${stageId}`, config);
    dispatch({
      type: SET_STAGE_REVIEW_DATA,
      payload: res.data,
    });
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
};

//getListVotesPodium
export const getListVotesPodium = (eventId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: SET_EVENT_LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(
      `/api/events/getListVotesPodium/${eventId}`,
      config
    );
    dispatch({
      type: SET_PODIUM_REVIEW_DATA,
      payload: res.data,
    });
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
};

//Get event data for management
export const getEventData = (eventId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: SET_EVENT_LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(
      `/api/events/getDataForUser/${eventId}`,
      config
    );
    dispatch({
      type: SET_EVENT_DATA,
      payload: res.data,
    });
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
};

//Join to an event
export const joinEvent = (eventcode, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ eventcode });

  try {
    dispatch({
      type: SET_EVENT_LOADING,
      payload: true,
    });
    await axios.post('/api/events/registerUser', body, config);
    dispatch(setAlert('Te has unido al evento exitosamente!', 'success'));
    dispatch(loadUser());
    history.push('/dashboard');
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
  dispatch({
    type: SET_EVENT_LOADING,
    payload: false,
  });
};

//getRankingbyEvent
export const getRankingbyEvent = (eventId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: SET_EVENT_LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(`/api/ranking/${eventId}`, config);
    dispatch({
      type: SET_RANKING_DATA,
      payload: res.data,
    });
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
};

//Get Event data
export const getDataForUser = (eventId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: SET_EVENT_LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(
      `/api/events/getDataForUser/${eventId}`,
      config
    );
    dispatch({
      type: SET_EVENT_DATA,
      payload: res.data,
    });
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
};

//Vote podium
export const votePodium = (eventid, rider1, rider2, rider3, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: SET_EVENT_LOADING,
    payload: true,
  });
  const body = JSON.stringify({ eventid, rider1, rider2, rider3 });
  try {
    await axios.post('/api/events/vote', body, config);
    dispatch(setAlert('Guardado Exitosamente!', 'success'));
    history.goBack();
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
  dispatch({
    type: SET_EVENT_LOADING,
    payload: false,
  });
};

//Vote Stage
export const voteStage = (stageid, rider1, rider2, rider3, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ stageid, rider1, rider2, rider3 });

  try {
    dispatch({
      type: SET_EVENT_LOADING,
      payload: true,
    });
    await axios.post('/api/stages/vote', body, config);
    dispatch(setAlert('Guardado Exitosamente!', 'success'));
    history.goBack();
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
  dispatch({
    type: SET_EVENT_LOADING,
    payload: false,
  });
};

//Set Stage Result
export const setStageResult = (
  stageid,
  rider1,
  rider2,
  rider3,
  eventid,
  callback
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ stageid, rider1, rider2, rider3, eventid });

  try {
    dispatch({
      type: SET_EVENT_LOADING,
      payload: true,
    });
    const res = await axios.post('/api/stages/setResult', body, config);
    dispatch({
      type: SET_EVENT_LOADING,
      payload: false,
    });
    callback(res.data);
  } catch (err) {
    const { data } = err.response;
    if (err && err.response && err.response.data && err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
  dispatch({
    type: SET_EVENT_LOADING,
    payload: false,
  });
};
