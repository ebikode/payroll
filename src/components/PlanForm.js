import React from "react";
import PropTypes from "prop-types";

import { Form } from "react-bootstrap";
import { TextInput, SelectGroup } from "react-bootstrap4-form-validation";
import validator from "validator";
import Col from "react-bootstrap/Col";
import styles from "./css/AuthForm.module.css";

class PXPlanForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      minPoint: 1000,
      startupMinPoint: 2500,
      showMiles: "true",
      analytics: "true",
      priceAlert: "true",
      email: "",
      type: "custom",
      status: "active"
    };
  }

  render() {
    let statusType = ["active", "disabled"];
    let planType = ["custom", "normal"];
    let boolStatus = ["true", "false"];

    let statusTypeOptions = statusType.map(type => {
      return (
        <option value={type} key={type}>
          {type.toUpperCase()}
        </option>
      );
    });

    let planTypeOptions = planType.map(type => {
      return (
        <option value={type} key={type}>
          {type.toUpperCase()}
        </option>
      );
    });

    let boolStatusOptions = boolStatus.map(type => {
      return (
        <option value={type} key={type}>
          {type.toUpperCase()}
        </option>
      );
    });

    let formFields = (
      <>
        <Form.Row>
          <Form.Group as={Col} controlId="type" className="form-label-group">
            <Form.Label>Type</Form.Label>
            <SelectGroup
              name={`type${this.props.formName}`}
              id={`type${this.props.formName}`}
              defaultValue={this.state.type}
              required
              errorMessage="Please select a Value"
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
            >
              {planTypeOptions}
            </SelectGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="name" className="form-label-group">
            <TextInput
              className="form-control"
              name={`name${this.props.formName}`}
              id={`name${this.props.formName}`}
              type="text"
              onBlur={e => this.props.handleChange(e, this.props.formName)}
              defaultValue={this.state.name}
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="2"
              maxLength="30"
              required
              errorMessage={{ validator: "Please enter a valid name" }}
            />
            <Form.Label className="form-control-placeholder">Name</Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="email" className="form-label-group">
            <TextInput
              className="form-control"
              name={`email${this.props.formName}`}
              id={`email${this.props.formName}`}
              type="text"
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="5"
              maxLength="100"
              required
              validator={validator.isEmail}
              errorMessage={{ validator: "Please enter a valid email" }}
            />
            <Form.Label className="form-control-placeholder">
              Customer Email
            </Form.Label>
          </Form.Group>
        </Form.Row>

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
            controlId="startupMinPoint"
            className="form-label-group"
          >
            <TextInput
              id={`startupMinPoint${this.props.formName}`}
              className="form-control"
              name={`startupMinPoint${this.props.formName}`}
              type="text"
              defaultValue={this.state.startupMinPoint}
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
              Startup Min. Point
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="analytics"
            className="form-label-group"
          >
            <Form.Label>Include Analytics</Form.Label>
            <SelectGroup
              name={`analytics${this.props.formName}`}
              id={`analytics${this.props.formName}`}
              defaultValue={this.state.analytics}
              required
              errorMessage="Please select a Value"
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
            >
              {boolStatusOptions}
            </SelectGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="showMiles"
            className="form-label-group"
          >
            <Form.Label>Show Miles TO Cash</Form.Label>
            <SelectGroup
              name={`showMiles${this.props.formName}`}
              id={`showMiles${this.props.formName}`}
              defaultValue={this.state.showMiles}
              required
              errorMessage="Please select a Value"
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
            >
              {boolStatusOptions}
            </SelectGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="priceAlert"
            className="form-label-group"
          >
            <Form.Label>Allow Price Alert</Form.Label>
            <SelectGroup
              name={`priceAlert${this.props.formName}`}
              id={`priceAlert${this.props.formName}`}
              defaultValue={this.state.priceAlert}
              required
              errorMessage="Please select a Value"
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
            >
              {boolStatusOptions}
            </SelectGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="status" className="form-label-group">
            <Form.Label>Status</Form.Label>
            <SelectGroup
              name={`status${this.props.formName}`}
              id={`status${this.props.formName}`}
              defaultValue={this.state.status}
              required
              errorMessage="Please select Status."
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
            >
              {statusTypeOptions}
            </SelectGroup>
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

PXPlanForm.propTypes = {
  formName: PropTypes.number,
  handleChange: PropTypes.func
};

export default PXPlanForm;
