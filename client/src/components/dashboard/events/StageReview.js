import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getListVotes } from '../../../actions/event';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';

const getHeaderSection = (stage, stageResult) => {
  return (
    <div>
      <h2 className='mt-5 mb-3'>{stage && stage.name}</h2>

      {/* {stageResult && stageResult.length > 0 && (
        <>
          <span>Resultados de la carrera</span>
          <ul>
            <li className='text-primary'>1° {stageResult[0].rider1.name}</li>
            <li className='text-primary'>2° {stageResult[0].rider2.name}</li>
            <li className='text-primary'>3° {stageResult[0].rider3.name}</li>
          </ul>
        </>
      )} */}
    </div>
  );
};

const getTableSection = (eventUsers, votes, stageResult) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Primero(50pts)</th>
          <th>Segundo(20pts)</th>
          <th>Tercero(10pts)</th>
          <th>Puntos</th>
        </tr>
      </thead>
      <tbody>
        {eventUsers &&
          eventUsers.map((user) => {
            const vote = votes.find((e) => e.user === user.user._id);
            let stageRes = null;
            if (stageResult && stageResult.length > 0) {
              stageRes = stageResult[0];
            }
            let assert1 =
              stageRes && vote && vote.rider1._id === stageRes.rider1._id;
            let assert2 =
              stageRes && vote && vote.rider2._id === stageRes.rider2._id;
            let assert3 =
              stageRes && vote && vote.rider3._id === stageRes.rider3._id;
            let pts = 0;
            if (assert1) pts += 50;
            if (assert2) pts += 20;
            if (assert3) pts += 10;
            return (
              <tr>
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
                      {stageRes && (
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
                      {stageRes && (
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
                      {stageRes && (
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

const StageReview = ({
  getListVotes,
  loading,
  history,
  event,
  stage,
  eventUsers,
  votes,
  stageResult,
}) => {
  let { stageId } = useParams();

  useEffect(() => {
    getListVotes(stageId);
  }, [stageId, getListVotes]);

  return (
    <>
      <Link className='btn btn-light' to='#!' onClick={(e) => history.goBack()}>
        <i className='fas fa-arrow-left'></i> Volver
      </Link>
      <br />
      {loading && <Spinner />}
      {!loading && (
        <>
          <h1 className='large text-primary'>{event && event.name}</h1>
          {getHeaderSection(stage, stageResult)}
          <div className='row'>
            {getTableSection(eventUsers, votes, stageResult)}
          </div>
        </>
      )}
    </>
  );
};

StageReview.propTypes = {
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  stageResult: PropTypes.object.isRequired,
  votes: PropTypes.array.isRequired,
  eventUsers: PropTypes.array.isRequired,
  stage: PropTypes.object.isRequired,
};

const mapStateToProps = ({ stage }) => ({
  loading: stage.loading,
  event: stage.event,
  stageResult: stage.stageResult,
  votes: stage.votes,
  eventUsers: stage.eventUsers,
  stage: stage.stage,
});

export default connect(mapStateToProps, { getListVotes })(StageReview);
