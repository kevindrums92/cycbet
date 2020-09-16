import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Status = ({ user, totalPoints, event }) => {
  if (!user) return <></>;
  return (
    <div className='profiles'>
      <div className='profile bg-light'>
        <img className='round-img' src={user.avatar} alt='' />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Puntos: {totalPoints}</p>
          <Link className='btn btn-primary' to={`/ranking/${event._id}`}>
            <i className='fas fa-list'></i> Ver Ranking
          </Link>
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
  totalPoints: PropTypes.number,
  event: PropTypes.object.isRequired,
};

Status.defaultProps = {
  user: {},
  totalPoints: 0,
};

const mapStateToProps = ({ auth, event }) => ({
  user: auth.user,
  totalPoints: event.totalPoints,
  event: event.event,
});

export default connect(mapStateToProps)(Status);
