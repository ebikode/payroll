import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { Form } from "react-bootstrap";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import { reactLocalStorage } from "reactjs-localstorage";
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import {
  getMessage,
  getLoadingStatus
} from "../modules/selectors/auth.selectors";
import { updateAuthStoreStatus } from "../modules/actions/auth.actions";
import { postRequest } from "../modules/utils/service";
import styles from "./css/AuthForm.module.css";
import { LOCAL_STORAGE_KEYS } from "../keys";
import { saveDashboardData } from "../modules/utils/helpers";

class PRAuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  render() {
    var title = this.props.isAdmin ? "Admin Login" : "Employee Login";

    var slogan = "Strategic Partnership You Can Trust";

    return (
      <>
        <div className={styles.formBody}>
          <div className={styles.imgBox}>
            <img src="/images/logo.png" alt="Kimberly Ryan logo" />
          </div>

          <div>
            <p className={styles.title}>{title}</p>
          </div>

          <ValidationForm
            onSubmit={this.handleSubmit}
            onErrorSubmit={this.handleErrorSubmit}
            immediate={this.state.immediate}
            setFocusOnError={this.state.setFocusOnError}
            defaultErrorMessage={{ required: "Please fill the form" }}
          >
            <Form.Row>
              <div className={styles.errorMsg}>
                <strong>{this.props.message}</strong>
              </div>
            </Form.Row>
            <br />

            <Form.Row>
              <Form.Group
                as={Col}
                controlId="email"
                className="form-label-group"
              >
                <TextInput
                  className="form-control"
                  name="email"
                  id="email"
                  type="text"
                  onBlur={e => this.handleChange(e)}
                  onChange={e => {
                    this.handleChange(e);
                    e.target.setAttribute("value", e.target.value);
                  }}
                  minLength="5"
                  maxLength="100"
                  required
                  validator={validator.isEmail}
                  errorMessage={{ validator: "Please enter a valid Email" }}
                />
                <Form.Label className="form-control-placeholder">
                  Email
                </Form.Label>
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
                  onBlur={e => this.handleChange(e)}
                  required
                  errorMessage={{ required: "Password is required" }}
                />
                {/* <Form.Control type="tel" onChange={this.handleChange}  /> */}
                <Form.Label className="form-control-placeholder">
                  Password
                </Form.Label>
              </Form.Group>
            </Form.Row>

            <Row>
              <div className={styles.buttonBox}>
                {this.props.isLoading ? (
                  <Spinner animation="grow" />
                ) : (
                  <Button
                    className={styles.button}
                    variant="primary"
                    type="submit"
                  >
                    LOGIN
                  </Button>
                )}
              </div>
            </Row>
            <div className={styles.mission}>{slogan}</div>
          </ValidationForm>
        </div>
      </>
    );
  }

  handleErrorSubmit = (e, formData, errorInputs) => {
    console.log(e, formData, errorInputs);
  };

  handleChange(event) {
    // console.log(event);
    // console.log(event.target.id);
    // console.log(event.target.value);
    switch (event.target.id) {
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // dispatch action to the auth reducer
    this.props.updateAuthStoreStatus({
      isLoading: true,
      isSuccess: false,
      message: "Authenticating..."
    });

    let payload = {
      email: this.state.email,
      password: this.state.password
    };

    let url = "employee/authenticate";

    if (this.props.isAdmin) url = "admin/authenticate";

    postRequest(url, payload, false)
      .then(res => {
        console.log("Logged in successfully!", { res });

        if (!res.data.status) {
          // dispatch action to the auth reducer
          this.props.updateAuthStoreStatus({
            isLoading: false,
            isSuccess: false,
            message: res.data.message,
            data: {}
          });
        } else {
          const { token, role, admin, employee } = LOCAL_STORAGE_KEYS;

          let data = res.data;
          saveDashboardData(data);
          reactLocalStorage.setObject(admin, data.admin);
          reactLocalStorage.setObject(employee, data.employee);
          reactLocalStorage.set(token, res.data.token);

          Cookies.set(token, res.data.token);
          // Set User role
          if (this.props.isAdmin) {
            Cookies.set(role, admin);
          } else {
            Cookies.set(role, employee);
          }

          window.location.reload();
        }
      })
      .catch(err => {
        console.error("Eror!, some thoughts on the error that occured:", {
          err
        });
        if (err.response) {
          // dispatch action to the auth reducer
          this.props.updateAuthStoreStatus({
            isLoading: false,
            isSuccess: false,
            message: err.response.data.message
          });
        } else {
          // dispatch action to the auth reducer
          this.props.updateAuthStoreStatus({
            isLoading: false,
            message: "An Error Occurred. Please try again"
          });
        }
      });
  }
}

PRAuthForm.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  updateAuthStoreStatus: PropTypes.func
};

// Map the need state properties to the component property
const mapStateToProps = state => {
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);

  return { message, isLoading };
};

export default connect(mapStateToProps, { updateAuthStoreStatus })(PRAuthForm);
