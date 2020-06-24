import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  ValidationForm,
  TextInput,
  SelectGroup
} from "react-bootstrap4-form-validation";
import { getCountries } from "../modules/selectors/global.selectors";
import {
  getMessage,
  getLoadingStatus,
  getSuccessStatus
} from "../modules/selectors/auth.selectors";
import { updateAuthStore } from "../modules/actions/auth.actions";
import { postRequest } from "../modules/utils/service";
import { processErrorMessage } from "../modules/utils/helpers";
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import styles from "./css/AuthForm.module.css";

class PXRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      errorMsg: "",
      email: "",
      country: "US",
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
    let countriesData = this.props.countries;

    let countriesOptions = countriesData.map((country, index) => {
      return (
        <option value={country.iso} key={country.id + index}>
          {country.name}
        </option>
      );
    });

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
          <Form.Group as={Col} controlId="country" className="form-label-group">
            <SelectGroup
              name="country"
              id="country"
              value={this.state.country}
              required
              errorMessage="Please select a country."
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
            >
              {countriesOptions}
            </SelectGroup>
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
        <div className={styles.formBody}>
          <div>
            <img src="/images/pex.png" alt="PEX logo" />
          </div>
          <div>
            <p>PEX+ White Label API Customer Portal SIGN UP</p>
          </div>

          <ValidationForm
            onSubmit={this.handleSubmit}
            onErrorSubmit={this.handleErrorSubmit}
            immediate={this.state.immediate}
            setFocusOnError={this.state.setFocusOnError}
            defaultErrorMessage={{ required: "Please fill the Form." }}
          >
            {!this.props.isSuccess ? formFields : <></>}

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
                <div className="mt-3">
                  <Link to="/">
                    <Button
                      className={styles.buttonRegister}
                      variant="primary"
                      type="button"
                    >
                      LOGIN
                    </Button>
                  </Link>
                </div>
              </Col>
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
      case "country":
        this.setState({ country: event.target.value });
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

    // dispatch action to the auth reducer
    this.props.updateAuthStore({
      isSuccess: false,
      isLoading: true,
      message: "Processing...",
      data: {}
    });

    if (this.state.password !== this.state.confirmPassword) {
      this.props.updateAuthStore({
        isSuccess: false,
        isLoading: false,
        message: "Password does not match",
        data: {}
      });
      return;
    }

    let payload = {
      email: this.state.email,
      phone: this.state.phone,
      username: this.state.username,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      country_iso: this.state.country,
      password: this.state.password
    };

    postRequest("customer/create", payload, false)
      .then(res => {
        console.log("Signed up successfully!", { res });

        if (!res.data.status) {
          // dispatch action to the auth reducer
          this.props.updateAuthStore({
            isSuccess: false,
            isLoading: false,
            message: res.data.message,
            data: {}
          });
        } else {
          // dispatch action to the auth reducer
          this.props.updateAuthStore({
            isSuccess: true,
            isLoading: false,
            message: res.data.message,
            data: {}
          });
        }
      })
      .catch(err => {
        let message = processErrorMessage(err);

        // dispatch action to the auth reducer

        this.props.updateAuthStore({
          isSuccess: false,
          isLoading: false,
          message: message
        });

        console.error("Eror!, some thoughts on the error that occured:", {
          err
        });
      });
  }
}

PXRegisterForm.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  countries: PropTypes.array,
  updateAuthStore: PropTypes.func
};

const mapStateToProps = state => {
  const countries = getCountries(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  const isSuccess = getSuccessStatus(state);

  return { countries, message, isLoading, isSuccess };
};

export default connect(mapStateToProps, { updateAuthStore })(PXRegisterForm);
