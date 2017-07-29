/**
 * Created by will on 29/07/17.
 */
import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";


function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState()}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default FieldGroup;

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  validationState: PropTypes.func.isRequired,
};