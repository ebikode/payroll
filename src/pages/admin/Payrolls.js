import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getPayrolls as getPayrollActions,
  getPayrollFilters as getPayrollFiltersAction
} from "../../modules/actions/payroll.actions";
import { formatCurrency, months } from "../../modules/utils/helpers";
import {
  getPayrolls,
  getPayrollFilters,
  getNextPage,
  getCurrentPage,
  getSelectedMonth,
  getSelectedYear,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/payroll.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PRLayout from "../../components/Layout";

class AdminPayrollsPage extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {
    this.props.getPayrollFiltersAction(this.props.dispatch);
  }

  getPayrollsFromServer(month, year) {
    this.props.getPayrollActions(this.props.dispatch, 1, month, year, true);
  }

  // getPayrollsFromServer(page) {
  //   this.props.getPayrollActions(this.props.dispatch, page, true);
  // }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getPayrollsFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getPayrollsFromServer(this.props.nextPage)}
        />
      );
    }

    let monthlyData = this.props.filters.map(filter => {
      return (
        <Dropdown.Item
          to="#"
          key={filter.month + filter.year}
          onClick={() => this.getPayrollsFromServer(filter.month, filter.year)}
        >
          {months[filter.month] + " " + filter.year}
        </Dropdown.Item>
      );
    });

    const rows = this.props.payrolls ? (
      this.props.payrolls.map((payroll, index) => (
        <tr key={payroll.id.toString()}>
          <td className="td-border-left">{index + 1}</td>
          <td>{months[payroll.month]}</td>
          <td>{payroll.year}</td>
          <td>
            {payroll.employee.first_name} {payroll.employee.last_name}
          </td>
          <td>{payroll.employee.position}</td>
          <td>{formatCurrency(payroll.gross_salary)}</td>
          <td>{formatCurrency(payroll.net_salary)}</td>
          <td>{formatCurrency(payroll.tax.pension)}</td>
          <td>{formatCurrency(payroll.tax.paye)}</td>
          <td>{formatCurrency(payroll.tax.nsitf)}</td>
          <td>{formatCurrency(payroll.tax.nhf)}</td>
          <td>{formatCurrency(payroll.tax.itf)}</td>
          <td>{payroll.payment_status}</td>
          <td>{payroll.status}</td>
          <td className="td-border-right">
            {new Date(payroll.created_at).toLocaleString()}
          </td>
        </tr>
      ))
    ) : (
      <></>
    );

    return (
      <PRLayout>
        <div>
          <div>
            <h5 className="page-title">
              Payrolls{" "}
              {"(" +
                months[this.props.selectedMonth] +
                " " +
                this.props.selectedYear +
                ")"}
            </h5>
            <div className="float-right">
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-warning"
                  id="dropdown-basic"
                  className="dropdownToggle"
                >
                  Select
                </Dropdown.Toggle>
                <Dropdown.Menu>{monthlyData}</Dropdown.Menu>
              </Dropdown>
            </div>
            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>MONTH</th>
                  <th>YEAR</th>
                  <th>EMPLOYEE</th>
                  <th>POSITION</th>
                  <th>GROSS SALARY</th>
                  <th>NET SALARY</th>
                  <th>PENSION</th>
                  <th>PAYE</th>
                  <th>NSITF</th>
                  <th>NHF</th>
                  <th>ITF</th>
                  <th>PAYMENT STATUS</th>
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
      </PRLayout>
    );
  }
}

AdminPayrollsPage.propTypes = {
  payrolls: PropTypes.array,
  filters: PropTypes.array,
  currentPage: PropTypes.number,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getPayrollActions: PropTypes.func,
  getPayrollFiltersAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const payrolls = getPayrolls(state);
  const filters = getPayrollFilters(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const selectedMonth = getSelectedMonth(state);
  const selectedYear = getSelectedYear(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    payrolls,
    filters,
    isLoading,
    message,
    isSuccess,
    selectedMonth,
    selectedYear,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getPayrollActions,
    getPayrollFiltersAction,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminPayrollsPage);
