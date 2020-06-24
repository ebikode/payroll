import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form } from "react-bootstrap";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import {
  getMessage,
  getLoadingStatus,
  getSuccessStatus
} from "../modules/selectors/employee.selectors";
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import styles from "./css/AuthForm.module.css";

class PREmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      errorMsg: "",
      email: "",
      position: "",
      address: "",
      about: "",
      bankName: "",
      accountName: "",
      accountNumber: "",
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {}

  render() {
    let formFields = (
      <>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="username"
            className="form-label-group"
          >
            <TextInput
              className="form-control"
              name="username"
              id="username"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="7"
              maxLength="30"
              required
              errorMessage={{ validator: "Please enter a valid username" }}
            />
            <Form.Label className="form-control-placeholder">
              Username
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="firstName"
            className="form-label-group"
          >
            <TextInput
              className="form-control"
              name="firstName"
              id="firstName"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="2"
              maxLength="30"
              required
              errorMessage={{ validator: "Please enter a valid name" }}
            />
            <Form.Label className="form-control-placeholder">
              First Name
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="lastName"
            className="form-label-group"
          >
            <TextInput
              className="form-control"
              name="lastName"
              id="lastName"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="2"
              maxLength="30"
              required
              errorMessage={{ validator: "Please enter a valid name" }}
            />
            <Form.Label className="form-control-placeholder">
              Last Name
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="position"
            className="form-label-group"
          >
            <TextInput
              className="form-control"
              name="position"
              id="position"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="2"
              maxLength="50"
              required
              errorMessage={{ validator: "Please enter a valid Position" }}
            />
            <Form.Label className="form-control-placeholder">
              Position
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="bankName"
            className="form-label-group"
          >
            <TextInput
              className="form-control"
              name="bankName"
              id="bankName"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="3"
              maxLength="100"
              required
              errorMessage={{ validator: "Please enter a valid Bank Name" }}
            />
            <Form.Label className="form-control-placeholder">
              Bank Name
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="accountName"
            className="form-label-group"
          >
            <TextInput
              className="form-control"
              name="accountName"
              id="accountName"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="2"
              maxLength="50"
              required
              errorMessage={{
                validator: "Please enter a valid Bank Account Name"
              }}
            />
            <Form.Label className="form-control-placeholder">
              Bank Account Name
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="accountNumber"
            className="form-label-group"
          >
            <TextInput
              className="form-control"
              name="accountNumber"
              id="accountNumber"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="2"
              maxLength="50"
              required
              errorMessage={{
                validator: "Please enter a valid Bank Account Number"
              }}
            />
            <Form.Label className="form-control-placeholder">
              Bank Account Number
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="address" className="form-label-group">
            <TextInput
              className="form-control"
              name="address"
              id="address"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="10"
              maxLength="100"
              required
              errorMessage={{ validator: "Please enter a valid Address" }}
            />
            <Form.Label className="form-control-placeholder">
              Address
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="about" className="form-label-group">
            <TextInput
              className="form-control"
              name="about"
              id="about"
              type="text"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="5"
              maxLength="100"
              required
              errorMessage={{ validator: "Please enter a valid About" }}
            />
            <Form.Label className="form-control-placeholder">
              About Employee
            </Form.Label>
          </Form.Group>
        </Form.Row>

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
            <Form.Label className="form-control-placeholder">Email</Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="phone" className="form-group">
            <TextInput
              className="form-control"
              name="phone"
              id="phone"
              type="phone"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="5"
              maxLength="13"
              required
              validator={validator.isNumeric}
              errorMessage={{ validator: "Please enter a valid phone" }}
            />
            <Form.Label className="form-control-placeholder">Phone</Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="password" className="form-group">
            <TextInput
              className="form-control"
              name="password"
              id="password"
              type="password"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              required
              errorMessage={{ required: "Password is required" }}
            />
            {/* <Form.Control type="tel" onChange={this.handleChange}  /> */}
            <Form.Label className="form-control-placeholder">
              Password
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="confirmPassword">
            <TextInput
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="8"
              maxLength="20"
              required
              errorMessage={{ validator: "Please enter a valid password" }}
            />
            <Form.Label className="form-control-placeholder">
              Confirm Your Password
            </Form.Label>
          </Form.Group>
        </Form.Row>
      </>
    );

    return (
      <>
        <div className={styles.regFormBody}>
          <div>
            <h4>Create New Employee</h4>

            <br />
          </div>

          <ValidationForm
            onSubmit={this.handleSubmit}
            onErrorSubmit={this.handleErrorSubmit}
            immediate={this.state.immediate}
            setFocusOnError={this.state.setFocusOnError}
            defaultErrorMessage={{ required: "Please fill the Form." }}
          >
            {formFields}

            <Row className="text-center mt-3">
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

            <Row>
              <Col>
                <div className="text-right mt-3">
                  {this.state.isSubmitting ? (
                    <Spinner animation="grow" />
                  ) : (
                    <Button
                      className={styles.button}
                      variant="primary"
                      type="submit"
                    >
                      SUBMIT
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </ValidationForm>
        </div>
      </>
    );
  }

  handleErrorSubmit = (e, formData, errorInputs) => {
    console.log(e, formData, errorInputs);
  };

  handleChange(event) {
    switch (event.target.id) {
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "confirmPassword":
        this.setState({ confirmPassword: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "firstName":
        this.setState({ firstName: event.target.value });
        break;
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "lastName":
        this.setState({ lastName: event.target.value });
        break;
      case "position":
        this.setState({ position: event.target.value });
        break;
      case "address":
        this.setState({ address: event.target.value });
        break;
      case "about":
        this.setState({ about: event.target.value });
        break;
      case "bankName":
        this.setState({ bankName: event.target.value });
        break;
      case "accountNumber":
        this.setState({ accountNumber: event.target.value });
        break;
      case "accountName":
        this.setState({ accountName: event.target.value });
        break;
      case "phone":
        this.setState({ phone: event.target.value });
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let payload = {
      email: this.state.email,
      phone: this.state.phone,
      username: this.state.username,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      position: this.state.position,
      address: this.state.address,
      about: this.state.about,
      account_name: this.state.accountName,
      account_number: this.state.accountNumber,
      account_bank: this.state.accountBank,
      password: this.state.password,
      confirm_password: this.state.confirmPassword
    };

    this.props.submit(payload);
  }
}

PREmployeeForm.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  submit: PropTypes.func
};

const mapStateToProps = state => {
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  const isSuccess = getSuccessStatus(state);

  return { message, isLoading, isSuccess };
};

export default connect(mapStateToProps, {})(PREmployeeForm);
