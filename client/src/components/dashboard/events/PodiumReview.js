import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getListVotesPodium } from '../../../actions/event';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../layout/Spinner';

const POINTS_1 = 200;
const POINTS_2 = 100;
const POINTS_3 = 90;

const getTableSection = (eventUsers, votes, podiumResult) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Primero({POINTS_1.toString()}pts)</th>
          <th>Segundo({POINTS_2.toString()}pts)</th>
          <th>Tercero({POINTS_3.toString()}pts)</th>
          <th>Puntos</th>
        </tr>
      </thead>
      <tbody>
        {eventUsers &&
          eventUsers.map((user) => {
            const vote = votes.find((e) => e.user === user.user._id);
            let podiumRes = null;
            if (podiumResult && podiumResult.length > 0) {
              podiumRes = podiumResult[0];
            }
            let assert1 =
              podiumRes && vote && vote.rider1._id === podiumRes.rider1._id;
            let assert2 =
              podiumRes && vote && vote.rider2._id === podiumRes.rider2._id;
            let assert3 =
              podiumRes && vote && vote.rider3._id === podiumRes.rider3._id;
            let pts = 0;
            if (assert1) pts += POINTS_1;
            if (assert2) pts += POINTS_2;
            if (assert3) pts += POINTS_3;
            return (
              <tr key={user.user._id}>
                <td>
                  <img
                    className='round-img ranking-user-img mr-2 hide-sm'
                    src={user.user.avatar}
                    alt=''
                  />{' '}
                  {user.user.name}
                </td>
                <td>
                  {!vote && <span>------------</span>}
                  {vote && (
                    <>
                      {vote.rider1.name}{' '}
                      {podiumRes && (
                        <>
                          {!assert1 ? (
                            <i className='fas fa-times-circle text-danger'></i>
                          ) : (
                            <i className='fas fa-check-circle text-success'></i>
                          )}
                        </>
                      )}
                    </>
                  )}
                </td>
                <td>
                  {!vote && <span>------------</span>}
                  {vote && (
                    <>
                      {vote.rider2.name}{' '}
                      {podiumRes && (
                        <>
                          {!assert2 ? (
                            <i className='fas fa-times-circle text-danger'></i>
                          ) : (
                            <i className='fas fa-check-circle text-success'></i>
                          )}
                        </>
                      )}
                    </>
                  )}
                </td>
                <td>
                  {!vote && <span>------------</span>}
                  {vote && (
                    <>
                      {vote.rider3.name}{' '}
                      {podiumRes && (
                        <>
                          {!assert3 ? (
                            <i className='fas fa-times-circle text-danger'></i>
                          ) : (
                            <i className='fas fa-check-circle text-success'></i>
                          )}
                        </>
                      )}
                    </>
                  )}
                </td>
                <td>{pts}pts</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const PodiumReview = ({
  getListVotesPodium,
  loading,
  history,
  event,
  eventUsers,
  votes,
  podiumResult,
}) => {
  let { eventId } = useParams();

  useEffect(() => {
    getListVotesPodium(eventId);
  }, [eventId, getListVotesPodium]);

  return (
    <>
      <button
        className='btn btn-light'
        type='button'
        onClick={(e) => history.goBack()}
      >
        <i className='fas fa-arrow-left'></i> Volver
      </button>
      <br />
      {loading && <Spinner />}
      {!loading && (
        <>
          <h1 className='large text-primary'>{event && event.name}</h1>
          <div className='row'>
            {getTableSection(eventUsers, votes, podiumResult)}
          </div>
        </>
      )}
    </>
  );
};

PodiumReview.propTypes = {
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object,
  podiumResult: PropTypes.array,
  votes: PropTypes.array,
  eventUsers: PropTypes.array,
};
PodiumReview.defaultProps = {
  event: null,
  podiumResult: null,
  votes: null,
  eventUsers: null,
};

const mapStateToProps = ({ event }) => ({
  loading: event.loading,
  event: event.event,
  podiumResult: event.podiumResult,
  votes: event.votes,
  eventUsers: event.eventUsers,
});

export default connect(mapStateToProps, { getListVotesPodium })(PodiumReview);
