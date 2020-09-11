import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import Spinner from '../../../layout/Spinner';
import Select from 'react-select';

const StagesTab = ({
  stages: { stages, stageResults, riders, eventId },
  loading,
  setStageResult,
  setStages,
}) => {
  const [formData, setFormData] = useState({
    rider1: '',
    rider2: '',
    rider3: '',
  });

  const { rider1, rider2, rider3 } = formData;
  const [show, setShow] = useState(false);
  const [stage, setStage] = useState(null);
  const handleClose = () => {
    setStage(null);
    setShow(false);
  };
  const handleShow = (item) => {
    setStage(item);
    setShow(true);
  };

  const saveChanges = () => {
    setStageResult(stage._id, rider1, rider2, rider3, eventId, (res) => {
      const index = stageResults.findIndex((e) => e.stage === stage._id);
      const newStageResults = stageResults;
      newStageResults[index] = res;
      setStages({ stages, riders, eventId, stageResults: newStageResults });
      handleClose();
    });
  };

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
  return (
    <div>
      <Link to='#!' className='btn btn-light mb-2'>
        <i className='fas fa-plus-square text-primary'></i> Agregar Etapa
      </Link>
      <table className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th className='hide-sm'>Distancia</th>
            <th className='hide-sm'>Tipo</th>
            <th>Resultado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stages &&
            stages.map((item, i) => {
              const result = stageResults.find((e) => e.stage === item._id);
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td className='hide-sm'>{item.distance}kms</td>
                  <td className='hide-sm'>{item.type}</td>
                  <td>
                    {!result ? (
                      <ul>
                        <li>1° -sin resultado-</li>
                        <li>2° -sin resultado-</li>
                        <li>3° -sin resultado-</li>
                      </ul>
                    ) : (
                      <>
                        <ul>
                          <li>1° {result.rider1.name}</li>
                          <li>2° {result.rider2.name}</li>
                          <li>3° {result.rider3.name}</li>
                        </ul>
                      </>
                    )}
                  </td>
                  <td>
                    <DropdownButton
                      id='dropdown-basic-button'
                      title={
                        <>
                          <i className='fas fa-cog'></i> Acción
                        </>
                      }
                    >
                      <Dropdown.Item
                        href='#!'
                        onClick={(e) => handleShow(item)}
                      >
                        <i className='fas fa-list'></i> Resultado
                      </Dropdown.Item>
                      <Dropdown.Item
                        href='#!'
                        onClick={(e) => handleShow(item)}
                      >
                        <i className='fas fa-edit'></i> Editar
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{stage && stage.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner />}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={saveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

StagesTab.propTypes = {
  stages: PropTypes.object.isRequired,
  setStageResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setStages: PropTypes.func.isRequired,
};

export default StagesTab;
