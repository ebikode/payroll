import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  getPlansAction,
  createPlanAction
} from "../../modules/actions/plan.actions";
import {
  getPlans,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/plan.selectors";
import { ValidationForm } from "react-bootstrap4-form-validation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PXLayout from "../../components/Layout";
import PXPlanForm from "../../components/PlanForm";

class AdminCreatePlansPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formNameArray: ["Form1"],
      formValues: {
        Form1: {
          name: "",
          minPoint: 1000,
          startupMinPoint: 2500,
          showMiles: "true",
          analytics: "true",
          priceAlert: "true",
          email: "",
          type: "custom",
          status: "active"
        }
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}

  render() {
    let form = this.state.formNameArray.map(formName => {
      return (
        <>
          <PXPlanForm
            key={formName}
            formName={formName}
            handleChange={(e, formName) => this.handleChange(e, formName)}
          />
          <hr />
        </>
      );
    });

    return (
      <PXLayout>
        <div>
          <div>
            <h5 className="page-title">Create Search API Plans</h5>
            <hr />
          </div>
          <div className="justify-content-center">
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <ValidationForm
                  onSubmit={this.handleSubmit}
                  onErrorSubmit={this.handleErrorSubmit}
                  immediate={this.state.immediate}
                  setFocusOnError={this.state.setFocusOnError}
                  defaultErrorMessage={{ required: "Please fill the Form." }}
                >
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

                  <Row>
                    <Col>
                      <div className="text-left mt-3">
                        <Button
                          variant="primary"
                          onClick={e => this.addMoreForm(e)}
                        >
                          <i className="fas fa-plus fa-2x"></i>
                        </Button>
                      </div>
                    </Col>
                    <Col>
                      <div className="text-right mt-3">
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ValidationForm>
              </Col>
            </Row>
          </div>
        </div>
      </PXLayout>
    );
  }

  //   Handles adding more form to existing form
  addMoreForm(e) {
    e.preventDefault();
    if (this.state.formNameArray.length < 10) {
      let formName = `Form${this.state.formNameArray.length + 1}`;

      let values = {
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

      this.state.formNameArray.push(formName);
      let formValues = this.state.formValues;
      formValues[formName] = values;

      //   console.log(newFormNameArray);

      this.setState({
        formValues: formValues
      });
    }
  }

  handleErrorSubmit = (e, formData, errorInputs) => {
    console.log(e, formData, errorInputs);
  };

  handleSubmit(e) {
    e.preventDefault();

    let payloads = [];

    this.state.formNameArray.map(formName => {
      let values = this.state.formValues[formName];
      let payload = {
        name: values.name,
        type: values.type,
        status: values.status,
        email: values.email,
        min_point: Number(values.minPoint),
        startup_min_point: Number(values.startupMinPoint),
        include_analytics: values.analytics === "true",
        show_miles_to_cash: values.showMiles === "true",
        allow_price_alert: values.priceAlert === "true"
      };
      payloads.push(payload);
      return true;
    });

    console.log({ payloads });

    this.createPlan(payloads);
  }

  handleChange(event, formName) {
    event.preventDefault();

    let val = event.target.value;

    let formValues = this.state.formValues;

    let values = formValues[formName];

    switch (event.target.id) {
      case `name${formName}`:
        values.name = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `minPoint${formName}`:
        values.minPoint = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `startupMinPoint${formName}`:
        values.startupMinPoint = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `showMiles${formName}`:
        values.showMiles = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `analytics${formName}`:
        values.analytics = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `priceAlert${formName}`:
        values.priceAlert = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `email${formName}`:
        values.email = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `type${formName}`:
        values.type = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `status${formName}`:
        values.status = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      default:
        break;
    }
  }

  createPlan(payloads) {
    // console.log({payloads});
    this.props.createPlanAction(this.props.dispatch, payloads).then(() => {
      this.props.history.push("/admin/search-plans");
    });
  }
}

AdminCreatePlansPage.propTypes = {
  plans: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  history: PropTypes.any,
  createPlanAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const plans = getPlans(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    plans,
    isLoading,
    message,
    isSuccess,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getPlansAction,
    createPlanAction,
    dispatch
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchActionToProps)(AdminCreatePlansPage)
);
