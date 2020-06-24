import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPayments as getPaymentActions } from "../../modules/actions/payment.actions";
import {
  getPayments,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/payment.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PXLayout from "../../components/Layout";

class AdminPaymentsPage extends React.Component {
  //   constructor(props) {
  //     super(props);

  //   }

  componentDidMount() {
    this.getPaymentsFromServer(this.props.currentPage);
  }

  getPaymentsFromServer(page) {
    this.props.getPaymentActions(this.props.dispatch, page, true);
  }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getPaymentsFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getPaymentsFromServer(this.props.nextPage)}
        />
      );
    }
    const serialNumber = this.props.currentPage * 20 - 20 + 1;

    const rows = this.props.payments.map((payment, index) => {
      return (
        <tr key={payment.id.toString()}>
          <td className="td-border-left">{serialNumber + index}</td>
          <td>{payment.reference_no}</td>
          <td>
            {payment.customer.first_name + " " + payment.customer.last_name}
          </td>
          <td>{payment.account.name}</td>
          <td>{payment.points}</td>
          <td>${payment.amount}</td>
          <td>{payment.type.replace("_", " ").toUpperCase()}</td>
          <td>{payment.payment_method.replace("_", " ").toUpperCase()}</td>
          <td>{payment.status.toUpperCase()}</td>
          <td className="td-border-right">
            {new Date(payment.created_at).toLocaleString()}
          </td>
        </tr>
      );
    });

    return (
      <PXLayout>
        <div>
          <div>
            <h5 className="page-title">Payments</h5>

            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>REF. NO</th>
                  <th>CUSTOMER</th>
                  <th>ACCOUNT</th>
                  <th>POINTS</th>
                  <th>AMOUNT</th>
                  <th>TYPE</th>
                  <th>PAYMENT METHOD</th>
                  <th>STATUS</th>
                  <th>DATE</th>
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
      </PXLayout>
    );
  }
}

AdminPaymentsPage.propTypes = {
  payments: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getPaymentActions: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const payments = getPayments(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    payments,
    isLoading,
    message,
    isSuccess,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getPaymentActions,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminPaymentsPage);
