import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDataForUser } from '../../../actions/event';
import Spinner from '../../layout/Spinner';
import Moment from 'react-moment';
import { getPodiumVote, getStageVote } from './Vote';
import Status from './Status';

const EventVotes = ({
  history,
  getDataForUser,
  event,
  loading,
  stages,
  podiumvotes,
  votes,
  stageResults,
  podiumResults,
}) => {
  let { eventId } = useParams();

  useEffect(() => {
    getDataForUser(eventId);
  }, [eventId, getDataForUser]);

  const getPodioCard = () => {
    const myPodium = getPodiumVote(podiumvotes, event._id);
    const podiumResult = getPodiumVote(podiumResults, event._id);
    const assertRider1 =
      podiumResult &&
      myPodium &&
      myPodium.rider1._id === podiumResult.rider1._id;
    const assertRider2 =
      podiumResult &&
      myPodium &&
      myPodium.rider2._id === podiumResult.rider2._id;
    const assertRider3 =
      podiumResult &&
      myPodium &&
      myPodium.rider3._id === podiumResult.rider3._id;
    return (
      <div className='col-md-4 mb-3'>
        <div className='card text-white bg-dark'>
          <div className='card-body'>
            <h5 className='card-title'>Podio de la carrera</h5>
            <small id='emailHelp' className='form-text text-warning'>
              Fecha límite para votar: <br />
              <Moment format='YYYY/MM/DD'>{event.maxdatevotepodium}</Moment>
            </small>
            <div className='card-text mb-2 mt-2'>
              {!myPodium && <>No hay votación aún!</>}
              {myPodium && (
                <>
                  <div className='row'>
                    <div className='col-md-12'>
                      <i className='fas fa-trophy trophy-gold'></i>{' '}
                      {myPodium.rider1.name}{' '}
                      {podiumResult && !assertRider1 && (
                        <i class='fas fa-times-circle text-danger'></i>
                      )}
                      {podiumResult && assertRider1 && (
                        <span className='text-success'>
                          <i class='fas fa-check-circle text-success'></i>{' '}
                          200pts
                        </span>
                      )}
                    </div>
                    <div className='col-md-12'>
                      <i className='fas fa-trophy trophy-silver'></i>{' '}
                      {myPodium.rider2.name}{' '}
                      {podiumResult && !assertRider2 && (
                        <i class='fas fa-times-circle text-danger'></i>
                      )}
                      {podiumResult && assertRider2 && (
                        <span className='text-success'>
                          <i class='fas fa-check-circle text-success'></i>{' '}
                          100pts
                        </span>
                      )}
                    </div>
                    <div className='col-md-12'>
                      <i className='fas fa-trophy trophy-copper'></i>{' '}
                      {myPodium.rider3.name}{' '}
                      {podiumResult && !assertRider3 && (
                        <i class='fas fa-times-circle text-danger'></i>
                      )}
                      {podiumResult && assertRider3 && (
                        <span className='text-success'>
                          <i class='fas fa-check-circle success-dark'></i> 90pts
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            {!podiumResult && (
              <Link className='btn btn-primary' to={`/podiumvote/${event._id}`}>
                {!myPodium && (
                  <>
                    <i className='fas fa-arrow-right'></i> Votar
                  </>
                )}
                {myPodium && (
                  <>
                    <i className='fas fa-edit'></i> Editar
                  </>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getStagesCard = () =>
    stages.map((stage) => {
      const myStageVote = getStageVote(votes, stage._id);
      const stageResult = getStageVote(stageResults, stage._id);
      const assertRider1 =
        stageResult &&
        myStageVote &&
        myStageVote.rider1._id === stageResult.rider1._id;
      const assertRider2 =
        stageResult &&
        myStageVote &&
        myStageVote.rider2._id === stageResult.rider2._id;
      const assertRider3 =
        stageResult &&
        myStageVote &&
        myStageVote.rider3._id === stageResult.rider3._id;

      return (
        <div className='col-md-4 mb-3' key={stage._id}>
          <div className='card text-white bg-info'>
            <div className='card-body'>
              <h5 className='card-title'>{stage.name}</h5>
              <small id='emailHelp' className='form-text text-warning'>
                Fecha límite para votar: <br />
                <Moment format='YYYY/MM/DD'>{stage.maxdatevote}</Moment>
              </small>
              <div className='card-text mb-2 mt-2'>
                {!myStageVote && <>No hay votación aún!</>}
                {myStageVote && (
                  <div className='row'>
                    <div className='col-md-12'>
                      1°: {myStageVote.rider1.name}{' '}
                      {stageResult && !assertRider1 && (
                        <i class='fas fa-times-circle text-danger'></i>
                      )}
                      {stageResult && assertRider1 && (
                        <span className='success-dark'>
                          <i class='fas fa-check-circle success-dark'></i> 50pts
                        </span>
                      )}
                    </div>
                    <div className='col-md-12'>
                      2°: {myStageVote.rider2.name}{' '}
                      {stageResult && !assertRider2 && (
                        <i class='fas fa-times-circle text-danger'></i>
                      )}
                      {stageResult && assertRider2 && (
                        <span className='success-dark'>
                          <i class='fas fa-check-circle success-dark'></i> 20pts
                        </span>
                      )}
                    </div>
                    <div className='col-md-12'>
                      3°: {myStageVote.rider3.name}{' '}
                      {stageResult && !assertRider3 && (
                        <i class='fas fa-times-circle text-danger'></i>
                      )}
                      {stageResult && assertRider3 && (
                        <span className='success-dark'>
                          <i class='fas fa-check-circle success-dark'></i> 10pts
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {!stageResult && (
                <Link className='btn btn-dark' to={`/stagevote/${stage._id}`}>
                  {!myStageVote && (
                    <>
                      <i className='fas fa-arrow-right'></i> Votar
                    </>
                  )}
                  {myStageVote && (
                    <>
                      <i className='fas fa-edit'></i> Editar
                    </>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      <Link className='btn btn-light' to='#!' onClick={(e) => history.goBack()}>
        <i className='fas fa-arrow-left'></i> Volver
      </Link>
      <Link className='btn btn-light' to='#!' onClick={(e) => history.goBack()}>
        <i className='fas fa-list text-primary'></i> Ver Ranking
      </Link>
      <br />
      {loading && <Spinner />}
      {!loading && (
        <>
          <h1 className='large text-primary'>{event.name}</h1>
          <Status />
          <div className='row'>
            {getPodioCard()}
            {getStagesCard()}
          </div>
        </>
      )}
    </>
  );
};

EventVotes.propTypes = {
  getDataForUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  event: PropTypes.object,
  stages: PropTypes.array,
  podiumvotes: PropTypes.array,
  votes: PropTypes.array,
  stageResults: PropTypes.array,
  podiumResults: PropTypes.array,
};

EventVotes.defaultProps = {
  event: null,
  stages: null,
  podiumvotes: null,
  votes: null,
  stageResults: null,
  podiumResults: null,
};

const mapStateToProps = ({ event }) => ({
  loading: event.loading,
  event: event.event,
  stages: event.stages,
  podiumvotes: event.podiumvotes,
  votes: event.votes,
  stageResults: event.stageResults,
  podiumResults: event.podiumResults,
});

export default connect(mapStateToProps, { getDataForUser })(EventVotes);
