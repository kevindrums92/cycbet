import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDataForUser } from '../../../actions/event';
import Spinner from '../../layout/Spinner';
import Moment from 'react-moment';
import { getPodiumVote, getStageVote } from './Vote';

const EventVotes = ({
  history,
  getDataForUser,
  event,
  loading,
  stages,
  podiumvotes,
  votes,
}) => {
  let { eventId } = useParams();

  useEffect(() => {
    getDataForUser(eventId);
  }, []);

  const getPodioCard = () => {
    const myPodium = getPodiumVote(podiumvotes, event._id);

    return (
      <div className='col-md-4 mb-3'>
        <div className='card text-white bg-dark'>
          <div className='card-body'>
            <h5 className='card-title'>Podio de la carrera</h5>
            <small id='emailHelp' class='form-text text-warning'>
              Fecha límite para votar: <br />
              2019/08/12
            </small>
            <p className='card-text'>
              {!myPodium && <>No hay votación aún!</>}
              {myPodium && (
                <>
                  <div className='row'>
                    <div className='col-md-12'>
                      <i className='fas fa-trophy trophy-gold'></i>{' '}
                      {myPodium.rider1.name}
                    </div>
                    <div className='col-md-12'>
                      <i className='fas fa-trophy trophy-silver'></i>{' '}
                      {myPodium.rider2.name}
                    </div>
                    <div className='col-md-12'>
                      <i className='fas fa-trophy trophy-copper'></i>{' '}
                      {myPodium.rider3.name}
                    </div>
                  </div>
                </>
              )}
            </p>
            <Link className='btn btn-primary' to={`/podiumvote/${event._id}`}>
              <i className='fas fa-arrow-right'></i> Votar
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const getStagesCard = () =>
    stages.map((stage) => {
      const myStageVote = getStageVote(votes, stage._id);

      return (
        <div className='col-md-4 mb-3' key={stage._id}>
          <div className='card text-white bg-info'>
            <div className='card-body'>
              <h5 className='card-title'>{stage.name}</h5>
              <small id='emailHelp' class='form-text text-warning'>
                Fecha límite para votar: <br />
                <Moment format='YYYY/MM/DD'>{stage.maxdatevote}</Moment>
              </small>
              <p className='card-text'>
                {!myStageVote && <>No hay votación aún!</>}
                {myStageVote && (
                  <>
                    <div className='row'>
                      <div className='col-md-12'>
                        1°: {myStageVote.rider1.name}
                      </div>
                      <div className='col-md-12'>
                        2°: {myStageVote.rider2.name}
                      </div>
                      <div className='col-md-12'>
                        3°: {myStageVote.rider3.name}
                      </div>
                    </div>
                  </>
                )}
              </p>
              <Link className='btn btn-dark' to={`/stagevote/${stage._id}`}>
                <i className='fas fa-arrow-right'></i> Votar
              </Link>
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      <Link className='btn btn-light' to='#!' onClick={(e) => history.goBack()}>
        <i className='fas fa-arrow-left'></i> Volver a eventos
      </Link>
      <br />
      {loading && <Spinner />}
      {!loading && (
        <>
          <h1 className='large text-primary'>{event.name}</h1>

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
  event: PropTypes.object.isRequired,
  stages: PropTypes.array.isRequired,
  podiumvotes: PropTypes.array.isRequired,
  votes: PropTypes.array.isRequired,
};

const mapStateToProps = ({ event }) => ({
  loading: event.loading,
  event: event.event,
  stages: event.stages,
  podiumvotes: event.podiumvotes,
  votes: event.votes,
});

export default connect(mapStateToProps, { getDataForUser })(EventVotes);
