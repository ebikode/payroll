import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAccountsAction } from "../../modules/actions/account.actions";
import {
  getAccounts,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/account.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PXLayout from "../../components/Layout";

class AdminAccountsPage extends React.Component {
  //   constructor(props) {
  //     super(props);

  //   }

  componentDidMount() {
    this.getAccountsFromServer(this.props.currentPage);
  }

  getAccountsFromServer(page) {
    this.props.getAccountsAction(this.props.dispatch, page);
  }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getAccountsFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getAccountsFromServer(this.props.nextPage)}
        />
      );
    }
    const serialNumber = this.props.currentPage * 20 - 20 + 1;

    const rows = this.props.accounts.map((account, index) => {
      return (
        <tr key={account.id.toString()}>
          <td className="td-border-left">{serialNumber + index}</td>
          <td>
            {account.customer
              ? account.customer.first_name + " " + account.customer.last_name
              : ""}
          </td>
          <td>{account.name}</td>
          <td>{account.email}</td>
          <td>{account.phone}</td>
          <td>{account.search_plan.name}</td>
          <td>{account.point_balance}</td>
          <td>{account.point_used}</td>
          <td>{account.total_search}</td>
          <td>{account.is_startup.toString().toUpperCase()}</td>
          <td>{account.is_approved.toString().toUpperCase()}</td>
          <td>{account.type.toUpperCase()}</td>
          <td>{account.status.toUpperCase()}</td>
          <td>{new Date(account.expiration_date).toLocaleString()}</td>
          <td className="td-border-right">
            {new Date(account.created_at).toLocaleString()}
          </td>
        </tr>
      );
    });

    return (
      <PXLayout>
        <div>
          <div>
            <h5 className="page-title">Accounts</h5>

            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>OWNER</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>SEARCH PLAN</th>
                  <th>POINT BALANCE</th>
                  <th>POINT USED</th>
                  <th>TOTAL SEARCH</th>
                  <th>IS STARTUP</th>
                  <th>IS APPROVED</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                  <th>EXPIRES</th>
                  <th>CREATED</th>
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

AdminAccountsPage.propTypes = {
  accounts: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getAccountsAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const accounts = getAccounts(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    accounts,
    isLoading,
    message,
    isSuccess,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getAccountsAction,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminAccountsPage);
