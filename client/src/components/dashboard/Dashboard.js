import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Dashboard = ({ auth }) => {
  const { events, ownEvents } = auth;
  return (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {!auth.loading && (
          <>
            <i className='fas fa-user'></i> Bienvenido {auth.user.name}
          </>
        )}
      </p>
      <div className='dash-buttons'>
        <Link to='/joinevent' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary'></i> Unirse a un evento
        </Link>
        <a href='add-experience.html' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary'></i> Crear Evento
        </a>
      </div>

      <h2 className='my-2'>Eventos</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th className='hide-sm'>Fecha de inicio</th>
            <th className='hide-sm'>Código</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ownEvents &&
            ownEvents.map((event) => (
              <tr>
                <td>{event.name}</td>
                <td className='hide-sm'>{event.startdate}</td>
                <td className='hide-sm'>{event.code}</td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          {events &&
            events.map((item) => (
              <tr>
                <td>{item.event.name}</td>
                <td className='hide-sm'>{item.event.startdate}</td>
                <td className='hide-sm'>{item.event.code}</td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Northern Essex</td>
            <td className='hide-sm'>Associates</td>
            <td className='hide-sm'>02-03-2007 - 01-02-2009</td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table> */}

      {/* <div className='my-2'>
        <button className='btn btn-danger'>
          <i className='fas fa-user-minus'></i>
          Delete My Account
        </button>
      </div> */}
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
