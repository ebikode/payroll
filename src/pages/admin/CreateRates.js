import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { createPlanRatesAction } from "../../modules/actions/plan.actions";
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
import PXRateForm from "../../components/RateForm";

class AdminCreatePlanRatesPage extends React.Component {
  constructor(props) {
    super(props);

    let { planId } = this.props.match.params;

    this.state = {
      formNameArray: ["Form1"],
      formValues: {
        Form1: {
          plandId: planId,
          minPoint: 1000,
          maxPoint: 10000,
          costPerPoint: 0.1
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
          <PXRateForm
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
            <h5 className="page-title">Create Plan Rates</h5>
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

      let { planId } = this.props.match.params;

      let values = {
        plandId: planId,
        minPoint: 1000,
        maxPoint: 10000,
        costPerPoint: 0.1
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

    let { planId } = this.props.match.params;

    let payloads = [];

    this.state.formNameArray.map(formName => {
      let values = this.state.formValues[formName];
      let payload = {
        search_plan_id: Number(planId),
        min_point: Number(values.minPoint),
        max_point: Number(values.maxPoint),
        cost_per_point: parseFloat(values.costPerPoint)
      };
      payloads.push(payload);
      return true;
    });

    console.log({ payloads });

    this.createPlanRates(payloads);
  }

  handleChange(event, formName) {
    event.preventDefault();

    let val = event.target.value;

    let formValues = this.state.formValues;

    let values = formValues[formName];

    switch (event.target.id) {
      case `costPerPoint${formName}`:
        values.costPerPoint = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `minPoint${formName}`:
        values.minPoint = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `maxPoint${formName}`:
        values.maxPoint = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      default:
        break;
    }
  }

  createPlanRates(payloads) {
    // console.log({payloads});
    this.props.createPlanRatesAction(this.props.dispatch, payloads).then(() => {
      this.props.history.push("/admin/search-plans");
    });
  }
}

AdminCreatePlanRatesPage.propTypes = {
  plans: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  history: PropTypes.any,
  match: PropTypes.any,
  createPlanRatesAction: PropTypes.func,
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
    createPlanRatesAction,
    dispatch
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchActionToProps)(AdminCreatePlanRatesPage)
);
