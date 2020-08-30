import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { votePodium, voteStage } from '../../../actions/event';
import Spinner from '../../layout/Spinner';
import { TYPE_PODIUM, TYPE_STAGE } from '../../../utils/const';
import Select from 'react-select';

export const getPodiumVote = (podiumvotes, eventId) => {
  if (podiumvotes && podiumvotes.length > 0) {
    return podiumvotes.find((e) => e.event === eventId);
  }
  return null;
};

export const getStageVote = (votes, stageId) => {
  if (votes && votes.length > 0) {
    return votes.find((e) => e.stage === stageId);
  }
  return null;
};

const Vote = ({
  history,
  type,
  event,
  loading,
  riders,
  votePodium,
  voteStage,
  podiumvotes,
  votes,
  stages,
}) => {
  const { eventId } = useParams();
  const { stageId } = useParams();

  const [formData, setFormData] = useState({
    rider1: '',
    rider2: '',
    rider3: '',
  });

  const { rider1, rider2, rider3 } = formData;

  useEffect(() => {
    if (type === TYPE_PODIUM) {
      const myPodium = getPodiumVote(podiumvotes, eventId);
      if (myPodium) {
        const { rider1, rider2, rider3 } = myPodium;
        setFormData({
          rider1: rider1._id,
          rider2: rider2._id,
          rider3: rider3._id,
        });
      }
    } else {
      const myStageVote = getStageVote(votes, stageId);
      if (myStageVote) {
        const { rider1, rider2, rider3 } = myStageVote;
        setFormData({
          rider1: rider1._id,
          rider2: rider2._id,
          rider3: rider3._id,
        });
      }
    }
  }, [eventId, podiumvotes, stageId, type, votes]);

  if (event._id === undefined) {
    return <Redirect to='/dashboard' />;
  }

  const options =
    riders &&
    riders.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }));
  const getValue = (opts, val) => opts.find((o) => o.value === val);

  const handleChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (type === TYPE_STAGE) {
      voteStage(stageId, rider1, rider2, rider3, history);
    } else {
      votePodium(eventId, rider1, rider2, rider3, history);
    }
  };

  const getPodiumSection = () => {
    return (
      <>
        <h1 className='large text-primary'>Podio de la carrera</h1>
        <p className='lead'>Cual es tu podio del {event.name}?</p>

        <div className='row'>
          <div className='col-md-12'>
            <div className='form-group'>
              <label htmlFor={'rider1'}>Campeón</label>
              <Select
                inputId={'rider1'}
                value={rider1 ? getValue(options, rider1) : null}
                onChange={(e) => handleChange(e, 'rider1')}
                options={options}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label htmlFor={'rider2'}>Subcampeón</label>
              <Select
                inputId={'rider2'}
                value={rider2 ? getValue(options, rider2) : null}
                onChange={(e) => handleChange(e, 'rider2')}
                options={options}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label htmlFor={'rider3'}>Tercer puesto</label>
              <Select
                inputId={'rider3'}
                value={rider3 ? getValue(options, rider3) : null}
                onChange={(e) => handleChange(e, 'rider3')}
                options={options}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const getStageSection = () => {
    const thisStage = stages
      ? stages.find((e) => e._id.toString() === stageId.toString())
      : {};

    return (
      <>
        <h1 className='large text-primary'>{thisStage.name}</h1>
        <p className='lead'>Cual es tu predicción para esta etapa?</p>
        <div className='row'>
          <div className='col-md-12'>
            <div className='form-group'>
              <label htmlFor={'rider1'}>Primero</label>
              <Select
                inputId={'rider1'}
                value={rider1 ? getValue(options, rider1) : null}
                onChange={(e) => handleChange(e, 'rider1')}
                options={options}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label htmlFor={'rider2'}>Segundo</label>
              <Select
                inputId={'rider2'}
                value={rider2 ? getValue(options, rider2) : null}
                onChange={(e) => handleChange(e, 'rider2')}
                options={options}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label htmlFor={'rider3'}>Tercero</label>
              <Select
                inputId={'rider3'}
                value={rider3 ? getValue(options, rider3) : null}
                onChange={(e) => handleChange(e, 'rider3')}
                options={options}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {loading && <Spinner />}
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        {type === TYPE_PODIUM && getPodiumSection()}
        {type === TYPE_STAGE && getStageSection()}
        <div className='row'>
          <div className='col-md-12'>
            <input
              type='submit'
              disabled={loading}
              className='btn btn-primary'
              value='Guardar'
            />
            <button
              type='button'
              className='btn btn-light'
              onClick={(e) => !loading && history.goBack()}
            >
              Volver
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

Vote.propTypes = {
  type: PropTypes.string.isRequired,
  votePodium: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  riders: PropTypes.array.isRequired,
  podiumvotes: PropTypes.array.isRequired,
  votes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  stages: PropTypes.array.isRequired,
};

const mapStateToProps = ({ event }) => ({
  loading: event.loading,
  event: event.event,
  riders: event.riders,
  podiumvotes: event.podiumvotes,
  votes: event.votes,
  stages: event.stages,
});

export default connect(mapStateToProps, { votePodium, voteStage })(Vote);
