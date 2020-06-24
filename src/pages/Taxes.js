import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTaxesAction } from "../modules/actions/tax.actions";
import { formatCurrency, months } from "../modules/utils/helpers";
import {
  getTaxes,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../modules/selectors/tax.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PRLayout from "../components/Layout";

class TaxesPage extends React.Component {
  componentDidMount() {
    this.getTaxesFromServer(this.props.currentPage);
  }

  getTaxesFromServer(page) {
    this.props.getTaxesAction(this.props.dispatch, page, false);
  }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getTaxesFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getTaxesFromServer(this.props.nextPage)}
        />
      );
    }
    // const serialNumber = this.props.currentPage * 20 - 20 + 1;

    const rows = this.props.taxes.map((tax, index) => {
      return (
        <>
          <tr key={tax.id}>
            <td className="td-border-left">
              {tax.payroll ? months[tax.payroll.month] : ""}
            </td>
            <td>{tax.payroll ? tax.payroll.year : ""}</td>
            {/* <td>
              {tax.payroll
                ? tax.payroll.employee.first_name + " " + tax.payroll.employee.last_name
                : ""}
            </td>
            <td>{tax.payroll
              ? formatCurrency(tax.payroll.gross_salary)
              : ""
            }
            </td>
            <td>{tax.payroll
              ? formatCurrency(tax.payroll.net_salary)
              : ""
            } */}
            {/* </td> */}
            <td>{formatCurrency(tax.pension)}</td>
            <td>{formatCurrency(tax.paye)}</td>
            <td>{formatCurrency(tax.nsitf)}</td>
            <td>{formatCurrency(tax.nhf)}</td>
            <td>{formatCurrency(tax.itf)}</td>
            <td>
              {formatCurrency(
                tax.itf + tax.pension + tax.paye + tax.nsitf + tax.nhf
              )}
            </td>
            <td className="td-border-right">
              {new Date(tax.created_at).toLocaleString()}
            </td>
          </tr>
        </>
      );
    });

    return (
      <PRLayout>
        <div>
          <div>
            <h5 className="page-title"> Taxes</h5>
            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>MONTH</th>
                  <th>YEAR</th>

                  {/* <th>EMPLOYEE</th> */}
                  {/* <th>GROSS SALARY</th>
                  <th>NET SALARY</th> */}
                  <th>PENSION</th>
                  <th>PAYE</th>
                  <th>NSITF</th>
                  <th>NHF</th>
                  <th>ITF</th>
                  <th>TOTAL</th>
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

TaxesPage.propTypes = {
  taxes: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getTaxesAction: PropTypes.func,
  updateSalaryAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const taxes = getTaxes(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    taxes,
    isLoading,
    message,
    isSuccess,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getTaxesAction,
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchActionToProps)(TaxesPage);
