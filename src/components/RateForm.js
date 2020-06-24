import React from "react";
import PropTypes from "prop-types";

import { Form } from "react-bootstrap";
import { TextInput } from "react-bootstrap4-form-validation";
import validator from "validator";
import Col from "react-bootstrap/Col";
import styles from "./css/AuthForm.module.css";

class PXRateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minPoint: 1000,
      maxPoint: 10000,
      costPerPoint: 0.1
    };
  }

  render() {
    let formFields = (
      <>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="minPoint"
            className="form-label-group"
          >
            <TextInput
              id={`minPoint${this.props.formName}`}
              className="form-control"
              name={`minPoint${this.props.formName}`}
              type="text"
              defaultValue={this.state.minPoint}
              onBlur={e => this.props.handleChange(e, this.props.formName)}
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isInt}
              errorMessage={{
                validator: `Please enter a Valid Number.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">
              Min. Point
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="maxPoint"
            className="form-label-group"
          >
            <TextInput
              id={`maxPoint${this.props.formName}`}
              className="form-control"
              name={`maxPoint${this.props.formName}`}
              type="text"
              defaultValue={this.state.maxPoint}
              onBlur={e => this.props.handleChange(e, this.props.formName)}
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isInt}
              errorMessage={{
                validator: `Please enter a Valid Number.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">
              Max. Point
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="costPerPoint"
            className="form-label-group"
          >
            <TextInput
              id={`costPerPoint${this.props.formName}`}
              className="form-control"
              name={`costPerPoint${this.props.formName}`}
              type="text"
              defaultValue={this.state.costPerPoint}
              onBlur={e => this.props.handleChange(e, this.props.formName)}
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isFloat}
              errorMessage={{
                validator: `Please enter a Valid Cost.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">
              Cost Per Point
            </Form.Label>
          </Form.Group>
        </Form.Row>
      </>
    );

    return (
      <>
        <div className={styles.formBody}>{formFields}</div>
      </>
    );
  }
}

PXRateForm.propTypes = {
  formName: PropTypes.number,
  handleChange: PropTypes.func
};

export default PXRateForm;
