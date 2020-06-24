import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getSalariesAction,
  updateSalaryAction
} from "../../modules/actions/salary.actions";
import { formatCurrency } from "../../modules/utils/helpers";
import {
  getSalaries,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/salary.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PRLayout from "../../components/Layout";
import PRSalaryModalForm from "../../components/SalaryModal";

class AdminSalariesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      salary: {},
      rate: {},
      selectedSalaryId: 0,
      showRates: false,
      showModal: false,
      showRateModal: false
    };
  }

  componentDidMount() {
    this.getSalariesFromServer(this.props.currentPage);
  }

  getSalariesFromServer(page) {
    this.props.getSalariesAction(this.props.dispatch, page, true);
  }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getSalariesFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getSalariesFromServer(this.props.nextPage)}
        />
      );
    }
    const serialNumber = this.props.currentPage * 20 - 20 + 1;

    const rows = this.props.salaries.map((salary, index) => {
      return (
        <>
          <tr key={salary.id}>
            <td className="td-border-left">{serialNumber + index}</td>
            <td>
              {salary.employee
                ? salary.employee.first_name + " " + salary.employee.last_name
                : ""}
            </td>
            <td>{formatCurrency(salary.salary)}</td>
            <td>{salary.pension}</td>
            <td>{salary.paye}</td>
            <td>{salary.nsitf}</td>
            <td>{salary.nhf}</td>
            <td>{salary.itf}</td>
            <td>{new Date(salary.created_at).toLocaleString()}</td>
            <td className="td-border-right">
              <Button
                className="table-button"
                onClick={() =>
                  this.setState({ salary: salary, showModal: true })
                }
              >
                Edit
              </Button>
            </td>
          </tr>
        </>
      );
    });

    return (
      <PRLayout>
        <div>
          <div>
            <h5 className="page-title"> Salaries</h5>
            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>EMPLOYEE</th>
                  <th>SALARY</th>
                  <th>PENSION(%)</th>
                  <th>PAYE(%)</th>
                  <th>NSITF(%)</th>
                  <th>NHF(%)</th>
                  <th>ITF(%)</th>
                  <th>DATE</th>
                  <th>ACTIONS</th>
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
        <PRSalaryModalForm
          show={this.state.showModal}
          close={() => this.setState({ showModal: false })}
          salary={this.state.salary}
          submit={payload => this.updateSalary(payload)}
          buttonText="Update"
        />
      </PRLayout>
    );
  }

  updateSalary(payload) {
    console.log({ payload });
    this.props.updateSalaryAction(this.props.dispatch, payload).then(() => {
      if (this.props.isSuccess) this.setState({ showModal: false });
    });
  }
}

AdminSalariesPage.propTypes = {
  salaries: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getSalariesAction: PropTypes.func,
  updateSalaryAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const salaries = getSalaries(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    salaries,
    isLoading,
    message,
    isSuccess,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getSalariesAction,
    updateSalaryAction,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminSalariesPage);
