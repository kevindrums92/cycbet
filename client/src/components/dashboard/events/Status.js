import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Status = ({ user, totalPoints }) => {
  if (!user) return <></>;
  return (
    <div className='profiles'>
      <div className='profile bg-light'>
        <img className='round-img' src={user.avatar} alt='' />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Posición en el Ranking: --</p>
          <p>Puntos: {totalPoints}</p>
        </div>

        {/* <ul>
          <li className='text-primary'>
            <i className='fas fa-check'></i> HTML
          </li>
          <li className='text-primary'>
            <i className='fas fa-check'></i> CSS
          </li>
          <li className='text-primary'>
            <i className='fas fa-check'></i> JavaScript
          </li>
          <li className='text-primary'>
            <i className='fas fa-check'></i> Python
          </li>
          <li className='text-primary'>
            <i className='fas fa-check'></i> C#
          </li>
        </ul> */}
      </div>
    </div>
  );
};

Status.propTypes = {
  user: PropTypes.object,
  totalPoints: PropTypes.number.isRequired,
};

Status.defaultProps = {
  user: {},
};

const mapStateToProps = ({ auth, event }) => ({
  user: auth.user,
  totalPoints: event.totalPoints,
});

export default connect(mapStateToProps)(Status);
