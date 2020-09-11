import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
const Landing = ({ isAuthenticated }) => {
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>A full gass!</h1>
          <p className='lead'>
            Arma tu parche, haz tus predicciones de ganador de etapa y podio en
            este Tour de Francia 2020
          </p>
          <div className='buttons'>
            <Link className='btn btn-primary' to='/register'>
              Registrarse
            </Link>
            <Link className='btn btn-light' to='/login'>
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

Landing.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
