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
} from "../modules/selectors/auth.selectors";
import {
  updateAuthStore,
  updateAuthStoreStatus
} from "../modules/actions/auth.actions";
import {
  getCountries,
  getCountry
} from "../modules/selectors/global.selectors";
import { getPlans } from "../modules/selectors/plan.selectors";
import { postRequest } from "../modules/utils/service";
import { processErrorMessage } from "../modules/utils/helpers";
import { reactLocalStorage } from "reactjs-localstorage";
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import styles from "./css/AuthForm.module.css";
import PXPlan from "./Plan";
import { LOCAL_STORAGE_KEYS } from "../keys";

const { setup_fee } = LOCAL_STORAGE_KEYS;

class PXAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      step: 1,
      email: "",
      token: "",
      planId: 1,
      name: "",
      country: "US",
      phone: "",
      type: "Business"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
  }

  render() {
    let accountTypes = ["Personal", "Business"];

    let plansData = this.props.plans.map(plan => {
      return (
        <Col key={plan.id} md={6}>
          <PXPlan plan={plan} select={() => this.handleSubmit(plan.id)} />
        </Col>
      );
    });

    let accountTypeOptions = accountTypes.map(type => {
      return (
        <option value={type} key={type}>
          {type}
        </option>
      );
    });

    let formFields = (
      <>
        <Form.Row>
          <Form.Group as={Col} controlId="type" className="form-label-group">
            <SelectGroup
              name="type"
              id="type"
              defaultValue={this.state.type}
              value={this.state.type}
              required
              errorMessage="Please select Account Type."
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
            >
              {accountTypeOptions}
            </SelectGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="name" className="form-label-group">
            <TextInput
              className="form-control"
              name="name"
              id="name"
              type="text"
              defaultValue={this.state.name}
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
          <Form.Group as={Col} controlId="email" className="form-label-group">
            <TextInput
              className="form-control"
              name="email"
              id="email"
              type="email"
              defaultValue={this.state.email}
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
              defaultValue={this.state.phone}
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="5"
              maxLength="15"
              required
              validator={validator.isNumeric}
              errorMessage={{ validator: "Please enter a valid phone" }}
            />
            <Form.Label className="form-control-placeholder">Phone</Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="token" className="form-group">
            <TextInput
              className="form-control"
              name="token"
              id="token"
              type="text"
              placeholder="Start-Up Token"
              defaultValue={this.state.token}
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>
      </>
    );

    let form = (
      <Row>
        <Col md={{ span: 6, offset: 2 }}>
          <ValidationForm
            onSubmit={this.handleNextStep}
            onErrorSubmit={this.handleErrorSubmit}
            immediate={this.state.immediate}
            setFocusOnError={this.state.setFocusOnError}
            defaultErrorMessage={{ required: "Please fill the Form." }}
          >
            <div>
              <p>
                If you are a Start-up in need of a discount, please contact us
                to obtain your token. Otherwise, please leave the Start-up Token
                field blank
              </p>
            </div>

            <br />

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
                    Next
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
        <div className={styles.formBody}>
          <Row>
            <Col md={{ span: 6, offset: 2 }}>
              <div>
                <h4 className="page-title text-center">Create Account</h4>
              </div>
            </Col>
          </Row>

          <Row className="text-center mt-3">
            {!this.props.isLoading && !this.props.isSuccess ? (
              <Col md={{ span: 6, offset: 2 }} className="error text-center">
                <strong>{this.props.message}</strong>
              </Col>
            ) : (
              <Col md={{ span: 6, offset: 2 }} className="success text-center">
                <strong>{this.props.message}</strong>
              </Col>
            )}
          </Row>

          <div>
            {this.props.isLoading ? (
              <Spinner animation="grow" />
            ) : this.state.step === 1 ? (
              form
            ) : (
              <>
                <Row>{plansData}</Row>
                <br />
                <Row>
                  <Col>
                    <div className="mt-3">
                      {this.state.step > 1 ? (
                        <Button
                          className={styles.buttonRegister}
                          variant="primary"
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            this.setState({ step: this.state.step - 1 });
                          }}
                        >
                          Back
                        </Button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Col>
                  <Col></Col>
                </Row>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  handleErrorSubmit = (e, formData, errorInputs) => {
    console.log(e, formData, errorInputs);
  };

  handleNextStep(event) {
    event.preventDefault();
    this.setState({ step: this.state.step + 1 });
  }

  handleChange(event) {
    // console.log(event);
    // console.log(event.target.id);
    // console.log(event.target.value);
    switch (event.target.id) {
      case "token":
        this.setState({ token: event.target.value });
        break;
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "type":
        this.setState({ type: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "phone":
        this.setState({ phone: event.target.value });
        break;
      default:
        break;
    }
  }

  handleSubmit(planID) {
    // dispatch action to the auth reducer
    this.props.updateAuthStoreStatus({
      isLoading: true,
      isSuccess: false,
      message: "Creating Account..."
    });

    let payload = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      search_plan_id: planID,
      startup_token: this.state.token,
      type: this.state.type.toLowerCase()
    };

    postRequest("customer/accounts", payload, true)
      .then(async res => {
        console.log("Account Created successfully!", { res });

        if (!res.data.status) {
          // dispatch action to the auth reducer
          this.props.updateAuthStoreStatus({
            isLoading: false,
            isSuccess: false,
            message: res.data.message
          });
        } else {
          const { accounts, accountID } = LOCAL_STORAGE_KEYS;

          const accountsData = await reactLocalStorage.getObject(
            accounts,
            {},
            true
          );

          accountsData.push(res.data.account);

          reactLocalStorage.setObject(accounts, accountsData);
          reactLocalStorage.set(accountID, res.data.account.id);

          this.props.history.push(`/billing/${setup_fee}`);
        }
      })
      .catch(err => {
        let message = processErrorMessage(err);

        // dispatch action to the auth reducer
        this.props.updateAuthStoreStatus({
          isLoading: false,
          isSuccess: false,
          message: message
        });
        console.error("Eror!, some thoughts on the error that occured:", {
          err
        });
      });
  }
}

PXAccountForm.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  countries: PropTypes.array,
  plans: PropTypes.array,
  country: PropTypes.object,
  history: PropTypes.any,
  updateAuthStore: PropTypes.func,
  updateAuthStoreStatus: PropTypes.func
};

// Map the need state properties to the component property
const mapStateToProps = state => {
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  const isSuccess = getSuccessStatus(state);

  const countries = getCountries(state);
  const country = getCountry(state, "US");
  const plans = getPlans(state);

  return { message, isLoading, isSuccess, countries, country, plans };
};

export default withRouter(
  connect(mapStateToProps, {
    updateAuthStore,
    updateAuthStoreStatus
  })(PXAccountForm)
);
