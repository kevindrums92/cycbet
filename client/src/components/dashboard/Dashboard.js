import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

const Dashboard = ({ auth }) => {
  const { events, ownEvents } = auth;
  return (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      {auth.loading && <Spinner />}
      <p className='lead'>
        {!auth.loading && (
          <>
            <i className='fas fa-user'></i> Bienvenido{' '}
            {auth.user && auth.user.name}
          </>
        )}
      </p>
      {!auth.loading && (
        <div className='dash-buttons'>
          <Link to='/joinevent' className='btn btn-light'>
            <i className='fas fa-hand-pointer text-primary'></i> Unirse a un
            evento
          </Link>
          <a href='add-experience.html' className='btn btn-light'>
            <i className='fas fa-plus-square text-primary'></i> Crear un evento
          </a>
        </div>
      )}

      {!auth.loading &&
        (!events || events.length === 0) &&
        (!ownEvents || ownEvents.length === 0) && (
          <>
            <div class='alert alert-info' role='alert'>
              <h4 class='alert-heading'>Listo para hacer tus predicciones?</h4>
              <p>
                No tienes eventos aún, necesitas un código de evento para unirte
                a uno!
              </p>
            </div>
          </>
        )}

      {!auth.loading &&
        ((events && events.length > 0) ||
          (ownEvents && ownEvents.length > 0)) && (
          <>
            <h2 className='mt-5 mb-3'>Eventos</h2>
            <table className='table'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Creador</th>
                  <th className='hide-sm'>F Inicio</th>
                  <th className='hide-sm'>Código</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ownEvents &&
                  ownEvents.map((event) => (
                    <tr>
                      <td>{event.name}</td>
                      <td>
                        Yo <i className='fas fa-hand-pointer text-primary'></i>
                      </td>
                      <td className='hide-sm'>
                        <Moment format='YYYY/MM/DD'>{event.startdate}</Moment>
                      </td>
                      <td className='hide-sm'>{event.code}</td>
                      <td>
                        <button type='button' class='btn btn-primary'>
                          <i class='fas fa-edit'></i>
                        </button>
                        <Link
                          className='btn btn-dark'
                          to={`/eventvotes/${event._id}`}
                        >
                          <i class='fas fa-arrow-right'></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                {events &&
                  events.map((item) => (
                    <tr key={item._id}>
                      <td>{item.event.name}</td>
                      <td>{item.event.creator.name}</td>
                      <td className='hide-sm'>
                        <Moment format='YYYY/MM/DD'>
                          {item.event.startdate}
                        </Moment>
                      </td>
                      <td className='hide-sm'>{item.event.code}</td>
                      <td>
                        <Link
                          className='btn btn-dark'
                          to={`/eventvotes/${item.event._id}`}
                        >
                          <i className='fas fa-arrow-right'></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
    </>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
