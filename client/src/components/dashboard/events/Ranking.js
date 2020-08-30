import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getRankingbyEvent } from '../../../actions/event';
import { useEffect } from 'react';

const Ranking = ({ history, loading, event, getRankingbyEvent, ranking }) => {
  let { eventId } = useParams();

  useEffect(() => {
    getRankingbyEvent(eventId);
  }, [eventId, getRankingbyEvent]);

  return (
    <>
      <button
        type='button'
        className='btn btn-light'
        onClick={(e) => history.goBack()}
      >
        <i className='fas fa-arrow-left'></i> Volver
      </button>
      <br />
      {loading && <Spinner />}
      <h1 className='large text-primary'>{event.name}</h1>
      {!loading && (
        <>
          <h2 className='mt-5 mb-3'>Ranking</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Nombre</th>
                <th className='hide-sm'>Aciertos</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {ranking &&
                ranking.map((item, i) => (
                  <tr key={item.user._id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        className='round-img ranking-user-img mr-2 hide-sm'
                        src={item.user.avatar}
                        alt=''
                      />{' '}
                      {item.user.name}
                    </td>
                    <td className='hide-sm'>{item.assertions}</td>
                    <td>{item.totalPoints}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

Ranking.propTypes = {
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  ranking: PropTypes.array.isRequired,
};

const mapStateToProps = ({ event }) => ({
  loading: event.loading,
  event: event.event,
  ranking: event.ranking,
});

export default connect(mapStateToProps, { getRankingbyEvent })(Ranking);
