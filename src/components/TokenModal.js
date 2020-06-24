import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Form } from "react-bootstrap";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import {
  getMessage,
  getLoadingStatus,
  getSuccessStatus
} from "../modules/selectors/token.selectors";
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PXModal from "./Modal";
import styles from "./css/AuthForm.module.css";

class PXTokenModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      email: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let formFields = (
      <>
        <Form.Row>
          <Form.Group as={Col} controlId="email" className="form-label-group">
            <TextInput
              className="form-control"
              name="email"
              id="email"
              type="text"
              onChange={e => {
                this.handleChange(e);
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
                    Generate
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
          title="Generate Startup Token"
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

    let payload = {
      email: state.email
    };
    this.props.submit(payload);
  }

  handleChange(event) {
    event.preventDefault();
    // console.log(event);
    // console.log(event.target.id);
    // console.log(event.target.value);

    let val = event.target.value;

    switch (event.target.id) {
      case "email":
        this.setState({ email: val });
        break;
      default:
        break;
    }
  }
}

PXTokenModalForm.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  show: PropTypes.bool,
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

export default withRouter(connect(mapStateToProps)(PXTokenModalForm));
