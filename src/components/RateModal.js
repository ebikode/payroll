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

class PXRateModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      minPoint: undefined,
      maxPoint: undefined,
      costPerPoint: undefined,
      status: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let statusType = ["active", "disabled"];

    let statusTypeOptions = statusType.map(type => {
      return (
        <option value={type} key={type}>
          {type.toUpperCase()}
        </option>
      );
    });

    let formFields = (
      <>
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
              defaultValue={this.props.rate.min_point}
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
            controlId="maxPoint"
            className="form-label-group"
          >
            <TextInput
              id="maxPoint"
              className="form-control"
              name="maxPoint"
              type="text"
              defaultValue={this.props.rate.max_point}
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
              id="costPerPoint"
              className="form-control"
              name="costPerPoint"
              type="text"
              defaultValue={this.props.rate.cost_per_point}
              onBlur={e => this.handleChange(e)}
              onChange={e => {
                this.handleChange(e);
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

        <Form.Row>
          <Form.Group as={Col} controlId="status" className="form-label-group">
            <Form.Label>Status</Form.Label>
            <SelectGroup
              name="status"
              id="status"
              defaultValue={this.props.rate.status}
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
          title="Update Rate"
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
    let rate = this.props.rate;

    let payload = {
      rate_id: rate.id,
      min_point: state.minPoint
        ? Number(state.minPoint)
        : Number(rate.min_point),
      max_point: state.startupMinPoint
        ? Number(state.maxPoint)
        : Number(rate.max_point),
      cost_per_point: state.analytics
        ? parseFloat(state.costPerPoint)
        : rate.cost_per_point,
      status: state.status ? state.status : rate.status
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

PXRateModalForm.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  show: PropTypes.bool,
  rate: PropTypes.object,
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

export default withRouter(connect(mapStateToProps)(PXRateModalForm));
