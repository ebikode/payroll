import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import { getAdmin } from "../modules/actions/auth.actions";
import { minimizeFigures } from "../modules/utils/helpers";
import {
  getWelcomeMessage,
  getAdminRole,
  getAdminState,
  getDashboardState,
  getRecentPayrolls
} from "../modules/selectors/auth.selectors";
import MDLayout from "../components/Layout";
import MDStatsBox from "../components/StatsBox";
import PropTypes from "prop-types";

class DashboardPage extends React.Component {
  componentDidMount() {
    getAdmin();
  }

  render() {
    let admin = `${this.props.admin.first_name} ${this.props.admin.last_name}`;

    let items = [
      {
        value: minimizeFigures(
          this.props.dashboardData.active_employees_count,
          "100M"
        ),
        text: "Active Employees",
        icon: "fas fa-users"
      },
      {
        value: minimizeFigures(
          this.props.dashboardData.pending_employees_count,
          "100M"
        ),
        text: "Pending Employees",
        icon: "fas fa-users"
      },
      {
        value:
          "$" +
          minimizeFigures(
            this.props.dashboardData.gross_salary_paid,
            "100M",
            true
          ),
        text: "Gross Salaries Paid",
        icon: "fas fa-address-card"
      },
      {
        value:
          "$" +
          minimizeFigures(
            this.props.dashboardData.net_salary_paid,
            "100M",
            true
          ),
        text: "Net Salaries Paid",
        icon: "fas fa-address-card"
      },
      {
        value:
          "$" +
          minimizeFigures(this.props.dashboardData.pension_paid, "100M", true),
        text: "Pension Paid",
        icon: "fas fa-address-card"
      },
      {
        value:
          "$" +
          minimizeFigures(this.props.dashboardData.paye_paid, "100M", true),
        text: "PAYE Paid",
        icon: "fas fa-address-card"
      },
      {
        value:
          "$" +
          minimizeFigures(this.props.dashboardData.nsitf_paid, "100M", true),
        text: "NSITF Paid",
        icon: "fas fa-address-card"
      },
      {
        value:
          "$" +
          minimizeFigures(this.props.dashboardData.nhf_paid, "100M", true),
        text: "NHF Paid",
        icon: "fas fa-address-card"
      },
      {
        value:
          "$" +
          minimizeFigures(this.props.dashboardData.itf_paid, "100M", true),
        text: "ITF Paid",
        icon: "fas fa-address-card"
      }
    ];

    const rows = this.props.payrolls ? (
      this.props.payrolls.map(payroll => (
        <tr key={payroll.id.toString()}>
          <td className="td-border-left">{payroll.id}</td>
          <td>
            {payroll.currency}
            {payroll.month}
          </td>
          <td>
            {payroll.currency}
            {payroll.year}
          </td>
          <td>
            {payroll.employee.first_name} {payroll.employee.last_name}
          </td>
          <td>{payroll.employee.position}</td>
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
          <td className="td-border-right">
            {new Date(payroll.created_at).toLocaleString()}
          </td>
        </tr>
      ))
    ) : (
      <></>
    );

    return (
      <MDLayout>
        <div>
          <Row>
            <Col md={8} sm={6}>
              <div className="welcomeBox">
                <div className="welcomeTitle">
                  Welcome, <span className="adminName">{admin}</span>
                </div>
                <div className="welcomeText">{this.props.welcomeMessage}</div>
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
          <Row>
            <Col md={{ span: 8, offset: 0 }}>
              {this.props.payrolls < 1 ? (
                <></>
              ) : (
                <>
                  <h5 className="pageTitle">RECENT PAYROLLS</h5>

                  <Table bordered hover responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
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
      </MDLayout>
    );
  }
}

DashboardPage.propTypes = {
  role: PropTypes.string,
  welcomeMessage: PropTypes.string,
  admin: PropTypes.object,
  dashboardData: PropTypes.object,
  payrolls: PropTypes.array
};

const mapStateToProps = state => {
  const role = getAdminRole(state);
  const welcomeMessage = getWelcomeMessage(state);
  const admin = getAdminState(state);
  const dashboardData = getDashboardState(state);
  const payrolls = getRecentPayrolls(state);
  // console.log(admin, dashboardData);
  return { role, welcomeMessage, admin, dashboardData, payrolls };
};

export default connect(mapStateToProps)(DashboardPage);
