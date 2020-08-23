import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';

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
    if (data && data.errors) {
      data.errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    } else if (data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      console.log(err.response);
      dispatch(setAlert('Ha ocurrudo un error!', 'danger'));
    }
  }
};
