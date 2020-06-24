import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  getPlansAction,
  updatePlanAction,
  updatePlanRateAction
} from "../../modules/actions/plan.actions";
import {
  getPlans,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/plan.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PXLayout from "../../components/Layout";
import PXPlanModalForm from "../../components/PlanModal";
import PXRateModalForm from "../../components/RateModal";

class AdminSearchPlansPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plan: {},
      rate: {},
      selectedPlanId: 0,
      showRates: false,
      showModal: false,
      showRateModal: false
    };
  }

  componentDidMount() {
    this.getPlansFromServer(this.props.currentPage);
  }

  getPlansFromServer(page) {
    this.props.getPlansAction(this.props.dispatch, page, true);
  }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getPlansFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getPlansFromServer(this.props.nextPage)}
        />
      );
    }
    const serialNumber = this.props.currentPage * 20 - 20 + 1;

    const rows = this.props.plans.map((plan, index) => {
      let rates = plan.rates;
      return (
        <>
          <tr key={plan.id.toString()}>
            <td className="td-border-left">{serialNumber + index}</td>
            <td>
              {plan.customer
                ? plan.customer.first_name + " " + plan.customer.last_name
                : ""}
            </td>
            <td>{plan.name}</td>
            <td>{plan.min_point}</td>
            <td>{plan.startup_min_point}</td>
            <td>{plan.include_analytics.toString().toUpperCase()}</td>
            <td>{plan.show_miles_to_cash.toString().toUpperCase()}</td>
            <td>{plan.allow_price_alert.toString().toUpperCase()}</td>
            <td>{plan.type.toUpperCase()}</td>
            <td>{plan.status.toUpperCase()}</td>
            <td>{new Date(plan.created_at).toLocaleString()}</td>
            <td className="td-border-right">
              <Button
                className="table-button"
                onClick={() => this.setState({ plan: plan, showModal: true })}
              >
                Edit
              </Button>
              <Button
                className="table-button"
                onClick={() =>
                  this.setState({
                    selectedPlanId: plan.id,
                    showRates: !this.state.showRates
                  })
                }
              >
                {this.state.selectedPlanId === plan.id && this.state.showRates
                  ? "Hide"
                  : "Rates"}
              </Button>
            </td>
          </tr>
          {rates &&
          this.state.selectedPlanId === plan.id &&
          this.state.showRates ? (
            <>
              <tr key={`rates-${plan.id.toString()}-${serialNumber + index}`}>
                <th className="no-border"></th>
                <th className="no-border"></th>
                <th className="td-border-left">S/N</th>
                <th>MIN. POINT</th>
                <th>MAX. POINT</th>
                <th>COST PER POINT</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
                <th className="td-border-right">
                  <Link to={`/admin/create-plan-rates/${plan.id}`}>
                    <Button variant="primary" className="table-button">
                      Add Rate
                    </Button>
                  </Link>
                </th>
              </tr>
              {rates.map((rate, index) => {
                let sNumber = 1;
                return (
                  <tr key={rate.id.toString()}>
                    <td className="no-border"></td>
                    <td className="no-border"></td>
                    <td className="td-border-left">{sNumber + index}</td>
                    <td>{rate.min_point}</td>
                    <td>{rate.max_point}</td>
                    <td>${rate.cost_per_point}</td>
                    <td>{plan.status.toUpperCase()}</td>
                    <td>{new Date(plan.created_at).toLocaleString()}</td>
                    <td className="td-border-right">
                      <Button
                        variant="primary"
                        className="table-button"
                        onClick={() =>
                          this.setState({ rate: rate, showRateModal: true })
                        }
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
              <tr
                key={`empty-tr-${plan.id.toString()}`}
                className="no-border"
              />
            </>
          ) : (
            <></>
          )}
        </>
      );
    });

    return (
      <PXLayout>
        <div>
          <div>
            <h5 className="page-title">Search API Plans</h5>
            <div className="float-right">
              <Link to={`/admin/create-plans`}>
                <Button variant="primary">Add Plans</Button>
              </Link>
            </div>
            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr key="plans-header">
                  <th key="plan-sn">S/N</th>
                  <th key="plan-customer">CUSTOMER</th>
                  <th key="plan-name">NAME</th>
                  <th key="plan-mp">MIN. POINT</th>
                  <th key="plan-smp">STARTUP MIN. POINT</th>
                  <th key="plan-ia">INCLUDE ANALYTICS</th>
                  <th key="plan-smc">SHOWS MILES TO CASH</th>
                  <th key="plan-apa">ALLOW PRICE ALERT</th>
                  <th key="plan-type">TYPE</th>
                  <th key="plan-st">STATUS</th>
                  <th key="plan-dt">DATE</th>
                  <th key="plan-ac">ACTIONS</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Row>
              <Col md={{ span: 4, offset: 5 }}>
                {this.props.isLoading ? (
                  <Spinner animation="grow" />
                ) : (
                  <Pagination>{pgItems}</Pagination>
                )}
              </Col>
            </Row>
          </div>
        </div>
        <PXPlanModalForm
          show={this.state.showModal}
          close={() => this.setState({ showModal: false })}
          plan={this.state.plan}
          submit={payload => this.updatePlan(payload)}
        />
        <PXRateModalForm
          show={this.state.showRateModal}
          close={() => this.setState({ showRateModal: false })}
          rate={this.state.rate}
          submit={payload => this.updatePlanRate(payload)}
        />
      </PXLayout>
    );
  }

  updatePlan(payload) {
    console.log({ payload });
    this.props.updatePlanAction(this.props.dispatch, payload).then(() => {
      if (this.props.isSuccess) this.setState({ showModal: false });
    });
  }

  updatePlanRate(payload) {
    console.log({ payload });
    this.props.updatePlanRateAction(this.props.dispatch, payload).then(() => {
      if (this.props.isSuccess) {
        this.setState({ showRateModal: false });
        this.props.getPlansAction(this.props.dispatch, true, true);
      }
    });
  }
}

AdminSearchPlansPage.propTypes = {
  plans: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getPlansAction: PropTypes.func,
  updatePlanAction: PropTypes.func,
  updatePlanRateAction: PropTypes.func,
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
    updatePlanAction,
    updatePlanRateAction,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminSearchPlansPage);
