import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { joinEvent } from '../../../actions/event';
import Spinner from '../../layout/Spinner';

const JoinEvent = ({ history, joinEvent, loading }) => {
  const [formData, setFormData] = useState({
    eventcode: '',
  });

  const { eventcode } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    joinEvent(eventcode, history);
  };
  return (
    <>
      {loading && <Spinner />}
      <h1 className='large text-primary'>Unirse a un evento</h1>
      <p className='lead'>
        <i className='fas fa-terminal'></i> Únete y empieza a realizar tus
        predicciones!
      </p>
      <p>Debes tener el código del evento a la mano</p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Código del evento: Ej: TDF2020'
            name='eventcode'
            required
            value={eventcode}
            onChange={(e) => onChange(e)}
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='btn btn-primary my-1'
        >
          Unirse
        </button>
        <Link
          className='btn btn-light my-1'
          to='#!'
          onClick={(e) => history.goBack()}
        >
          Volver
        </Link>
      </form>
    </>
  );
};

JoinEvent.propTypes = {
  history: PropTypes.object.isRequired,
  joinEvent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ event }) => ({
  loading: event.loading,
});

export default connect(mapStateToProps, { joinEvent })(JoinEvent);
