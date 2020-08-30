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
        <div className='card text-white'>
          <div className='card-header votes-header text-white bg-dark'>
            Podio de la carrera
          </div>
          <div className='card-body'>
            <div className='form-group'>
              <div className='card-field-label'>Fecha limite votación</div>
              <div className='card-field-value'>
                <Moment format='YYYY/MM/DD'>{event.maxdatevotepodium}</Moment>
              </div>
            </div>
            <div className='card-text mb-2 mt-2'>
              <div className='card-field-label'>Mi voto</div>
              <div className='card-field-value my-votes'>
                {!myPodium && <>No hay votación aún!</>}
                {myPodium && (
                  <>
                    <div className='row'>
                      <div className='col-md-12'>
                        <i className='fas fa-trophy trophy-gold'></i>{' '}
                        {myPodium.rider1.name}{' '}
                        {podiumResult && !assertRider1 && (
                          <i className='fas fa-times-circle text-danger'></i>
                        )}
                        {podiumResult && assertRider1 && (
                          <span className='text-success'>
                            <i className='fas fa-check-circle text-success'></i>{' '}
                            200pts
                          </span>
                        )}
                      </div>
                      <div className='col-md-12'>
                        <i className='fas fa-trophy trophy-silver'></i>{' '}
                        {myPodium.rider2.name}{' '}
                        {podiumResult && !assertRider2 && (
                          <i className='fas fa-times-circle text-danger'></i>
                        )}
                        {podiumResult && assertRider2 && (
                          <span className='text-success'>
                            <i className='fas fa-check-circle text-success'></i>{' '}
                            100pts
                          </span>
                        )}
                      </div>
                      <div className='col-md-12'>
                        <i className='fas fa-trophy trophy-copper'></i>{' '}
                        {myPodium.rider3.name}{' '}
                        {podiumResult && !assertRider3 && (
                          <i className='fas fa-times-circle text-danger'></i>
                        )}
                        {podiumResult && assertRider3 && (
                          <span className='text-success'>
                            <i className='fas fa-check-circle success-dark'></i>{' '}
                            90pts
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='card-body'>
            <hr />
            {!podiumResult && (
              <Link className='btn btn-dark' to={`/podiumvote/${event._id}`}>
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

      //Validar que este en el rango de fecha para votar
      const maxdatevote = new Date(stage.maxdatevote).addDays(1).getTime();
      const currentDate = new Date().getTime();
      const dateToVotePassed = currentDate > maxdatevote;
      return (
        <div className='col-md-4 mb-3' key={stage._id}>
          <div className='card'>
            <div className='card-header votes-header text-white bg-info'>
              {stage.name}
            </div>
            <div className='card-body'>
              <div className='form-group'>
                <div className='card-field-label'>Fecha limite votación</div>
                <div className='card-field-value'>
                  <Moment format='YYYY/MM/DD'>{stage.maxdatevote}</Moment>
                </div>
              </div>
              <div className='card-text mb-2 mt-2'>
                <div className='card-field-label'>Mi voto</div>
                <div className='card-field-value my-votes'>
                  {!myStageVote && <>No hay votación aún!</>}
                  {myStageVote && (
                    <div className='row'>
                      <div className='col-md-12'>
                        1°: {myStageVote.rider1.name}{' '}
                        {stageResult && !assertRider1 && (
                          <i className='fas fa-times-circle text-danger'></i>
                        )}
                        {stageResult && assertRider1 && (
                          <span className='success-dark'>
                            <i className='fas fa-check-circle success-dark'></i>{' '}
                            50pts
                          </span>
                        )}
                      </div>
                      <div className='col-md-12'>
                        2°: {myStageVote.rider2.name}{' '}
                        {stageResult && !assertRider2 && (
                          <i className='fas fa-times-circle text-danger'></i>
                        )}
                        {stageResult && assertRider2 && (
                          <span className='success-dark'>
                            <i className='fas fa-check-circle success-dark'></i>{' '}
                            20pts
                          </span>
                        )}
                      </div>
                      <div className='col-md-12'>
                        3°: {myStageVote.rider3.name}{' '}
                        {stageResult && !assertRider3 && (
                          <i className='fas fa-times-circle text-danger'></i>
                        )}
                        {stageResult && assertRider3 && (
                          <span className='success-dark'>
                            <i className='fas fa-check-circle success-dark'></i>{' '}
                            10pts
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='card-body'>
              <hr />
              {!dateToVotePassed && (
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
              {dateToVotePassed && (
                <Link
                  className='btn btn-primary'
                  to={`/stageReview/${stage._id}`}
                >
                  <i className='fas fa-eye'></i> Ver
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    });

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
// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
