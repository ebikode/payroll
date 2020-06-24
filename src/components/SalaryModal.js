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
} from "../modules/selectors/salary.selectors";
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PXModal from "./Modal";
import styles from "./css/AuthForm.module.css";

class PRSalaryModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      salary: undefined,
      pension: undefined,
      paye: undefined,
      nsitf: undefined,
      nhf: undefined,
      itf: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let formFields = (
      <>
        <Form.Row>
          <Form.Group as={Col} controlId="salary" className="form-label-group">
            <TextInput
              className="form-control"
              name="salary"
              id="salary"
              type="text"
              onBlur={e => this.handleChange(e)}
              defaultValue={this.props.salary ? this.props.salary.salary : ""}
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isFloat}
              minLength="2"
              maxLength="30"
              required
              errorMessage={{ validator: "Please enter a valid Salary" }}
            />
            <Form.Label className="form-control-placeholder">
              Salary(NGN)
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="pension" className="form-label-group">
            <TextInput
              id="pension"
              className="form-control"
              name="pension"
              type="text"
              defaultValue={this.props.salary ? this.props.salary.pension : ""}
              onBlur={e => this.handleChange(e)}
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isInt}
              errorMessage={{
                validator: `Please enter a Valid Percantage Number.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">
              Pension(%)
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="paye" className="form-label-group">
            <TextInput
              id="paye"
              className="form-control"
              name="paye"
              type="text"
              defaultValue={this.props.salary ? this.props.salary.paye : ""}
              onBlur={e => this.handleChange(e)}
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isInt}
              errorMessage={{
                validator: `Please enter a Valid Percentage Number.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">
              PAYE(%)
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="nsitf" className="form-label-group">
            <TextInput
              id="nsitf"
              className="form-control"
              name="nsitf"
              type="text"
              defaultValue={this.props.salary ? this.props.salary.paye : ""}
              onBlur={e => this.handleChange(e)}
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isInt}
              errorMessage={{
                validator: `Please enter a Valid Percentage Number.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">
              NSITF(%)
            </Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="nhf" className="form-label-group">
            <TextInput
              id="nhf"
              className="form-control"
              name="nhf"
              type="text"
              defaultValue={this.props.salary ? this.props.salary.nhf : ""}
              onBlur={e => this.handleChange(e)}
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isInt}
              errorMessage={{
                validator: `Please enter a Valid Percentage Number.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">NHF(%)</Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="itf" className="form-label-group">
            <TextInput
              id="itf"
              className="form-control"
              name="itf"
              type="text"
              defaultValue={this.props.salary ? this.props.salary.itf : ""}
              onBlur={e => this.handleChange(e)}
              onChange={e => {
                this.handleChange(e);
                e.target.setAttribute("value", e.target.value);
              }}
              validator={validator.isInt}
              errorMessage={{
                validator: `Please enter a Valid Percentage Number.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">ITF(%)</Form.Label>
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
                    {this.props.buttonText}
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
          title={this.props.formTitle}
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
    let salary = this.props.salary ? this.props.salary : {};
    let employee = this.props.employee;

    let payload = {
      employee_id: employee.id ? employee.id : "",
      salary_id: salary ? salary.id : "",
      salary: state.salary ? Number(state.salary) : Number(salary.salary),
      pension: state.pension ? Number(state.pension) : Number(salary.pension),
      paye: state.paye ? Number(state.paye) : Number(salary.paye),
      nsitf: state.nsitf ? Number(state.nsitf) : Number(salary.nsitf),
      nhf: state.nhf ? Number(state.nhf) : Number(salary.nhf),
      itf: state.itf ? Number(state.itf) : Number(salary.itf)
    };
    this.props.submit(payload);
  }

  handleChange(event) {
    // console.log(event);
    // console.log(event.target.id);
    // console.log(event.target.value);

    let val = event.target.value;

    switch (event.target.id) {
      case "salary":
        this.setState({ salary: val });
        break;
      case "pension":
        this.setState({ pension: val });
        break;
      case "paye":
        this.setState({ paye: val });
        break;
      case "nsitf":
        this.setState({ nsitf: val });
        break;
      case "nhf":
        this.setState({ nhf: val });
        break;
      case "itf":
        this.setState({ itf: val });
        break;
      default:
        break;
    }
  }
}

PRSalaryModalForm.propTypes = {
  buttonText: PropTypes.string,
  formTitle: PropTypes.string,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  show: PropTypes.bool,
  salary: PropTypes.object,
  employee: PropTypes.object,
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

export default withRouter(connect(mapStateToProps)(PRSalaryModalForm));
