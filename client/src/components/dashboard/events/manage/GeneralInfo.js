import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const GeneralInfo = ({ generalInfo, setGeneralInfo }) => {
  const onChange = (e) =>
    setGeneralInfo({
      ...generalInfo,
      [e.target.name]: e.target.value,
    });

  const { _id, name, code, startdate, maxdatevotepodium } = generalInfo;

  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
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
              disabled={_id}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor={'startdate'}>Fecha Inicio</label>
            <div>
              <DatePicker
                id='startdate'
                name='startdate'
                selected={startdate ? new Date(startdate) : null}
                onChange={(e) =>
                  onChange({
                    target: { name: 'startdate', value: e },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor={'maxdatevotepodium'}>
              Fecha máxima para votar podio
            </label>
            <div>
              <DatePicker
                id='maxdatevotepodium'
                name='maxdatevotepodium'
                selected={
                  maxdatevotepodium ? new Date(maxdatevotepodium) : null
                }
                onChange={(e) =>
                  onChange({
                    target: { name: 'maxdatevotepodium', value: e },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <input type='submit' className='btn btn-primary' value='Guardar' />
    </form>
  );
};

GeneralInfo.propTypes = {
  generalInfo: PropTypes.object.isRequired,
  setGeneralInfo: PropTypes.func.isRequired,
};

export default GeneralInfo;
