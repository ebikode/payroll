import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Form } from "react-bootstrap";
import {
  ValidationForm,
  TextInput,
  SelectGroup
} from "react-bootstrap4-form-validation";
import {
  getMessage,
  getLoadingStatus,
  getSuccessStatus
} from "../modules/selectors/plan.selectors";
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PXModal from "./Modal";
import styles from "./css/AuthForm.module.css";

class PXPlanModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      name: undefined,
      minPoint: undefined,
      startupMinPoint: undefined,
      showMiles: undefined,
      analytics: undefined,
      priceAlert: undefined,
      status: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let statusType = ["active", "disabled"];
    let boolStatus = ["true", "false"];

    let statusTypeOptions = statusType.map(type => {
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
          <Form.Group as={Col} controlId="name" className="form-label-group">
            <TextInput
              className="form-control"
              name="name"
              id="name"
              type="text"
              onBlur={e => this.handleChange(e)}
              defaultValue={this.props.plan.name}
              onChange={e => {
                this.handleChange(e);
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
          <Form.Group
            as={Col}
            controlId="minPoint"
            className="form-label-group"
          >
            <TextInput
              id="minPoint"
              className="form-control"
              name="minPoint"
              type="text"
              defaultValue={this.props.plan.min_point}
              onBlur={e => this.handleChange(e)}
              onChange={e => {
                this.handleChange(e);
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
              id="startupMinPoint"
              className="form-control"
              name="startupMinPoint"
              type="text"
              defaultValue={this.props.plan.startup_min_point}
              onBlur={e => this.handleChange(e)}
              onChange={e => {
                this.handleChange(e);
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
              name="analytics"
              id="analytics"
              defaultValue={this.props.plan.include_analytics}
              required
              errorMessage="Please select a Value"
              onChange={e => {
                this.handleChange(e);
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
              name="showMiles"
              id="showMiles"
              defaultValue={this.props.plan.show_miles_to_cash}
              required
              errorMessage="Please select a Value"
              onChange={e => {
                this.handleChange(e);
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
              name="priceAlert"
              id="priceAlert"
              defaultValue={this.props.plan.allow_price_alert}
              required
              errorMessage="Please select a Value"
              onChange={e => {
                this.handleChange(e);
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
              name="status"
              id="status"
              defaultValue={this.props.plan.status}
              required
              errorMessage="Please select Status."
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
            >
              {statusTypeOptions}
            </SelectGroup>
          </Form.Group>
        </Form.Row>
      </>
    );

    let form = (
      <Row>
        <Col>
          <ValidationForm
            onSubmit={this.handleSubmit}
            onErrorSubmit={this.handleErrorSubmit}
            immediate={this.state.immediate}
            setFocusOnError={this.state.setFocusOnError}
            defaultErrorMessage={{ required: "Please fill the Form." }}
          >
            {formFields}

            <Row>
              <Col></Col>
              <Col>
                <div className="text-right mt-3">
                  <Button
                    className={styles.button}
                    variant="primary"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
          </ValidationForm>
        </Col>
      </Row>
    );

    return (
      <>
        <PXModal
          title="Update Plan"
          show={this.props.show}
          close={this.props.close}
        >
          <div className={styles.formBody}>
            <Row className="text-center pl-3 pr-3">
              {!this.props.isLoading && !this.props.isSuccess ? (
                <div className="error text-center">
                  <strong>{this.props.message}</strong>
                </div>
              ) : (
                <div className="success text-center">
                  <strong>{this.props.message}</strong>
                </div>
              )}
            </Row>
            <br />

            <div>
              {this.props.isLoading ? <Spinner animation="grow" /> : form}
            </div>
          </div>
        </PXModal>
      </>
    );
  }

  handleErrorSubmit = (e, formData, errorInputs) => {
    console.log(e, formData, errorInputs);
  };

  handleSubmit(e) {
    e.preventDefault();

    let state = this.state;
    let plan = this.props.plan;

    let payload = {
      plan_id: plan.id,
      name: state.name ? state.name : plan.name,
      min_point: state.minPoint
        ? Number(state.minPoint)
        : Number(plan.min_point),
      startup_min_point: state.startupMinPoint
        ? Number(state.startupMinPoint)
        : Number(plan.startup_min_point),
      include_analytics: state.analytics
        ? state.analytics === "true"
        : plan.include_analytics,
      allow_price_alert: state.priceAlert
        ? state.priceAlert === "true"
        : plan.allow_price_alert,
      show_miles_to_cash: state.showMiles
        ? state.showMiles === "true"
        : plan.show_miles_to_cash,
      status: state.status ? state.status : plan.status
    };
    this.props.submit(payload);
  }

  handleChange(event) {
    // console.log(event);
    // console.log(event.target.id);
    // console.log(event.target.value);

    let val = event.target.value;

    switch (event.target.id) {
      case "name":
        this.setState({ name: val });
        break;
      case "minPoint":
        this.setState({ minPoint: val });
        break;
      case "startupMinPoint":
        this.setState({ startupMinPoint: val });
        break;
      case "showMiles":
        this.setState({ showMiles: val });
        break;
      case "analytics":
        this.setState({ analytics: val });
        break;
      case "priceAlert":
        this.setState({ priceAlert: val });
        break;
      case "status":
        this.setState({ status: val });
        break;
      default:
        break;
    }
  }
}

PXPlanModalForm.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  show: PropTypes.bool,
  plan: PropTypes.object,
  close: PropTypes.func,
  submit: PropTypes.func
};

// Map the need state properties to the component property
const mapStateToProps = state => {
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  const isSuccess = getSuccessStatus(state);

  return { message, isLoading, isSuccess };
};

export default withRouter(connect(mapStateToProps)(PXPlanModalForm));
