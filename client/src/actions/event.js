import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { SET_EVENT_DATA, SET_EVENT_LOADING } from '../actions/types';
//Join to an event
export const joinEvent = (eventcode, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ eventcode });

  try {
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
};

//Vote podium
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
};
