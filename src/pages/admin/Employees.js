import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { formatCurrency } from "../../modules/utils/helpers";
import { getEmployees as getEmployeeActions } from "../../modules/actions/employee.actions";
import {
  getEmployees,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/employee.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PXLayout from "../../components/Layout";

class AdminEmployeesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: {},
      selectedEmployeeId: "",
      showModal: false,
      showDetailsModal: false
    };
  }

  componentDidMount() {
    this.getEmployeesFromServer(this.props.currentPage);
  }

  getEmployeesFromServer(page) {
    this.props.getEmployeeActions(this.props.dispatch, page);
  }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getEmployeesFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getEmployeesFromServer(this.props.nextPage)}
        />
      );
    }
    const serialNumber = this.props.currentPage * 20 - 20 + 1;

    const rows = this.props.employees.map((employee, index) => {
      return (
        <tr key={employee.id.toString()}>
          <td className="td-border-left">{serialNumber + index}</td>
          <td>{employee.first_name + " " + employee.last_name}</td>
          <td>{employee.position}</td>
          <td>{employee.email}</td>
          <td>{employee.phone}</td>
          <td>
            {employee.salary ? formatCurrency(employee.salary.salary) : ""}
          </td>
          <td>{employee.status.toUpperCase()}</td>
          <td>{new Date(employee.created_at).toLocaleString()}</td>
          <td className="td-border-right">
            <Button
              className="table-button"
              onClick={() =>
                this.setState({ employee: employee, showModal: true })
              }
            >
              Edit
            </Button>
            <Button
              className="table-button"
              onClick={() =>
                this.setState({ employee: employee, showDetailsModal: true })
              }
            >
              Edit
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <PXLayout>
        <div>
          <div>
            <h5 className="page-title">Employees</h5>
            <div className="float-right">
              <Link to={`/admin/create-employee`}>
                <Button variant="primary">Add Employee</Button>
              </Link>
            </div>
            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>NAME</th>
                  <th>POSITION</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>SALARY</th>
                  <th>STATUS</th>
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

AdminEmployeesPage.propTypes = {
  employees: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getEmployeeActions: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const employees = getEmployees(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    employees,
    isLoading,
    message,
    isSuccess,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getEmployeeActions,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminEmployeesPage);
