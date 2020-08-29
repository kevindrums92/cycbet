import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEventData } from '../../../actions/event';
import { useEffect } from 'react';
import { useState } from 'react';

const ManageEvents = ({ getEventData, history }) => {
  let { eventId } = useParams();
  useEffect(() => {
    getEventData(eventId);
  }, [eventId, getEventData]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    startdate: '',
    maxdatevotepodium: '',
  });

  const { name, code, startdate, maxdatevotepodium } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link className='btn btn-light' to='#!' onClick={(e) => history.goBack()}>
        <i className='fas fa-arrow-left'></i> Volver
      </Link>
      <h1 className='large text-primary'>Edición del evento</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor={'name'}>Nombre</label>
              <input
                id='name'
                type='text'
                placeholder='Nombre'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor={'code'}>Código</label>
              <input
                id='code'
                type='text'
                placeholder='Código'
                name='code'
                value={code}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor={'startdate'}>Fecha Inicio</label>
              <input
                id='startdate'
                type='date'
                name='startdate'
                value={startdate}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor={'maxdatevotepodium'}>
                Fecha máxima para votar podio
              </label>
              <input
                id='maxdatevotepodium'
                type='date'
                name='maxdatevotepodium'
                value={maxdatevotepodium}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        </div>

        <input type='submit' className='btn btn-primary' value='Guardar' />
      </form>
    </>
  );
};

ManageEvents.propTypes = {
  getEventData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ event }) => ({
  loading: event.loading,
  event: event.event,
});

export default connect(mapStateToProps, { getEventData })(ManageEvents);
