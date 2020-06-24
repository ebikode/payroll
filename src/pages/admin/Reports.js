import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPayrollReports as getPayrollReportsAction } from "../../modules/actions/payroll.actions";
import { formatCurrency, months } from "../../modules/utils/helpers";
import {
  getPayrollReports,
  getNextPage,
  getCurrentPage,
  getSelectedMonth,
  getSelectedYear,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/payroll.selectors";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PRLayout from "../../components/Layout";

class AdminReportsPage extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {
    this.props.getPayrollReportsAction(this.props.dispatch);
  }

  render() {
    const rows = this.props.reports ? (
      this.props.reports.map((report, index) => (
        <tr key={report.month + report.year}>
          <td className="td-border-left">{index + 1}</td>
          <td>{months[report.month]}</td>
          <td>{report.year}</td>
          <td>{formatCurrency(report.gross_salary_paid)}</td>
          <td>{formatCurrency(report.net_salary_paid)}</td>
          <td>{formatCurrency(report.pension_paid)}</td>
          <td>{formatCurrency(report.paye_paid)}</td>
          <td>{formatCurrency(report.nsitf_paid)}</td>
          <td>{formatCurrency(report.nhf_paid)}</td>
          <td>{formatCurrency(report.itf_paid)}</td>
        </tr>
      ))
    ) : (
      <></>
    );

    return (
      <PRLayout>
        <div>
          <div>
            <h5 className="page-title">Reports</h5>
            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>MONTH</th>
                  <th>YEAR</th>
                  <th>GROSS SALARY PAID</th>
                  <th>NET SALARY PAID</th>
                  <th>PENSION PAID</th>
                  <th>PAYE PAID</th>
                  <th>NSITF PAID</th>
                  <th>NHF PAID</th>
                  <th>ITF PAID</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Row>
              <Col md={{ span: 4, offset: 5 }}>
                {this.props.isLoading ? <Spinner animation="grow" /> : <></>}
              </Col>
            </Row>
          </div>
        </div>
      </PRLayout>
    );
  }
}

AdminReportsPage.propTypes = {
  reports: PropTypes.array,
  currentPage: PropTypes.number,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getPayrollReportsAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const reports = getPayrollReports(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const selectedMonth = getSelectedMonth(state);
  const selectedYear = getSelectedYear(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    reports,
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
    getPayrollReportsAction,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminReportsPage);
