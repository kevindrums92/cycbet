import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEventByID, setStageResult } from '../../../../actions/event';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../../layout/Spinner';
import { Tab, Tabs } from 'react-bootstrap';
import GeneralInfo from './GeneralInfo';
import StagesTab from './StagesTab';

const ManageEvents = ({ getEventByID, history, loading, setStageResult }) => {
  let { eventId } = useParams();
  const [generalInfo, setGeneralInfo] = useState({
    _id: null,
    name: '',
    code: '',
    startdate: null,
    maxdatevotepodium: null,
  });
  const [stages, setStages] = useState({
    stages: [],
    stageResults: [],
    riders: [],
    eventId: null,
  });

  useEffect(() => {
    getEventByID(eventId, (data) => {
      setGeneralInfo(data.event);
      setStages({
        stages: data.stages,
        stageResults: data.stageResults,
        riders: data.riders,
        eventId: data.event._id,
      });
    });
  }, [eventId, getEventByID]);

  const { _id } = generalInfo;

  return (
    <>
      <button className='btn btn-light' onClick={(e) => history.goBack()}>
        <i className='fas fa-arrow-left'></i> Volver
      </button>
      {loading && <Spinner />}
      <h1 className='large text-primary'>Edición del evento</h1>
      <Tabs defaultActiveKey='stages' id='main-tabs'>
        <Tab eventKey='info' title='Inf General' className='mt-2 pl-3 pr-3'>
          <GeneralInfo
            generalInfo={generalInfo}
            setGeneralInfo={setGeneralInfo}
            loading={loading}
          />
        </Tab>
        <Tab
          eventKey='stages'
          title='Etapas'
          className='mt-2 pl-3 pr-3'
          disabled={!_id}
        >
          <StagesTab
            stages={stages}
            setStageResult={setStageResult}
            loading={loading}
            setStages={setStages}
          />
        </Tab>
        <Tab
          eventKey='riders'
          title='Corredores'
          className='mt-2 pl-3 pr-3'
          disabled={!_id}
        ></Tab>
        <Tab eventKey='rules' title='Reglas' disabled={!_id}></Tab>
      </Tabs>
    </>
  );
};

ManageEvents.propTypes = {
  getEventByID: PropTypes.func.isRequired,
  setStageResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ event }) => ({
  loading: event.loading,
});

export default connect(mapStateToProps, { getEventByID, setStageResult })(
  ManageEvents
);
