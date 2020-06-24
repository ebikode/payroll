import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import { getEmployee } from "../modules/actions/auth.actions";
import { formatCurrency, months } from "../modules/utils/helpers";
import {
  getWelcomeMessage,
  getEmployeeState,
  getDashboardState,
  getRecentPayrolls
} from "../modules/selectors/auth.selectors";
import PRLayout from "../components/Layout";
import MDStatsBox from "../components/StatsBox";
import PropTypes from "prop-types";

class DashboardPage extends React.Component {
  componentDidMount() {
    getEmployee();
  }

  render() {
    let employee = `${this.props.employee.first_name} ${this.props.employee.last_name}`;

    let items = [
      {
        value: formatCurrency(this.props.dashboardData.gross_salary_earned),
        text: "Gross Salaries Earned",
        icon: "fas fa-address-card"
      },
      {
        value: formatCurrency(this.props.dashboardData.net_salary_earned),
        text: "Net Salaries Earned",
        icon: "fas fa-address-card"
      },
      {
        value: formatCurrency(this.props.dashboardData.pension_paid),
        text: "Pension Paid",
        icon: "fas fa-address-card"
      },
      {
        value: formatCurrency(this.props.dashboardData.paye_paid),
        text: "PAYE Paid",
        icon: "fas fa-address-card"
      },
      {
        value: formatCurrency(this.props.dashboardData.nsitf_paid),
        text: "NSITF Paid",
        icon: "fas fa-address-card"
      },
      {
        value: formatCurrency(this.props.dashboardData.nhf_paid),
        text: "NHF Paid",
        icon: "fas fa-address-card"
      },
      {
        value: formatCurrency(this.props.dashboardData.itf_paid),
        text: "ITF Paid",
        icon: "fas fa-address-card"
      }
    ];

    const rows = this.props.payrolls ? (
      this.props.payrolls.map(payroll => (
        <tr key={payroll.id.toString()}>
          <td className="td-border-left">{months[payroll.month]}</td>
          <td>{payroll.year}</td>
          <td>
            {payroll.currency}
            {payroll.gross_salary}
          </td>
          <td>
            {payroll.currency}
            {payroll.net_salary}
          </td>
          <td>
            {payroll.currency}
            {payroll.tax.pension}
          </td>
          <td>
            {payroll.currency}
            {payroll.tax.paye}
          </td>
          <td>
            {payroll.currency}
            {payroll.tax.nsitf}
          </td>
          <td>
            {payroll.currency}
            {payroll.tax.nhf}
          </td>
          <td>
            {payroll.currency}
            {payroll.tax.itf}
          </td>
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
          <Row>
            <Col>
              <div className="welcomeBox">
                <div className="welcomeTitle">
                  Welcome, <span className="adminName">{employee}</span>
                </div>
              </div>
              <br />
              <div>
                <span className="pageTitle">Dashboard</span>
                <hr />
                <hr />
              </div>
              <MDStatsBox data={items} />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              {this.props.payrolls < 1 ? (
                <></>
              ) : (
                <>
                  <h5 className="pageTitle">RECENT PAYROLLS</h5>

                  <Table bordered hover responsive>
                    <thead>
                      <tr>
                        <th>MONTH</th>
                        <th>YEAR</th>
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
                </>
              )}
            </Col>
          </Row>
        </div>
      </PRLayout>
    );
  }
}

DashboardPage.propTypes = {
  welcomeMessage: PropTypes.string,
  employee: PropTypes.object,
  dashboardData: PropTypes.object,
  payrolls: PropTypes.array
};

const mapStateToProps = state => {
  const welcomeMessage = getWelcomeMessage(state);
  const employee = getEmployeeState(state);
  const dashboardData = getDashboardState(state);
  const payrolls = getRecentPayrolls(state);
  // console.log(employee, dashboardData);
  return { welcomeMessage, employee, dashboardData, payrolls };
};

export default connect(mapStateToProps)(DashboardPage);
