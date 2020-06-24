import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getTokensAction,
  createTokenAction
} from "../../modules/actions/token.actions";
import {
  getTokens,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/token.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PXLayout from "../../components/Layout";
import PXTokenModalForm from "../../components/TokenModal";

class AdminTokensPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRates: false,
      showModal: false
    };
  }

  componentDidMount() {
    this.getTokensFromServer(this.props.currentPage);
  }

  getTokensFromServer(page) {
    this.props.getTokensAction(this.props.dispatch, page);
  }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getTokensFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getTokensFromServer(this.props.nextPage)}
        />
      );
    }
    const serialNumber = this.props.currentPage * 20 - 20 + 1;

    const rows = this.props.tokens.map((token, index) => {
      return (
        <tr key={token.id.toString()}>
          <td className="td-border-left">{serialNumber + index}</td>
          <td>
            {token.customer
              ? token.customer.first_name + " " + token.customer.last_name
              : ""}
          </td>
          <td>{token.token}</td>
          <td>{token.used.toString().toUpperCase()}</td>
          <td className="td-border-right">
            {new Date(token.created_at).toLocaleString()}
          </td>
        </tr>
      );
    });

    return (
      <PXLayout>
        <div>
          <div>
            <h5 className="page-title">Generated Startup Tokens</h5>
            <div className="float-right">
              <Button
                variant="primary"
                onClick={() => this.setState({ showModal: true })}
              >
                Generate
              </Button>
            </div>
            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>CUSTOMER</th>
                  <th>TOKEN</th>
                  <th>USED</th>
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
        <PXTokenModalForm
          show={this.state.showModal}
          close={() => this.setState({ showModal: false })}
          submit={payload => this.generateToken(payload)}
        />
      </PXLayout>
    );
  }

  generateToken(payload) {
    console.log({ payload });
    this.props.createTokenAction(this.props.dispatch, [payload]).then(() => {
      if (this.props.isSuccess) {
        this.setState({ showModal: false });
        this.props.getTokensAction(this.props.dispatch);
      }
    });
  }
}

AdminTokensPage.propTypes = {
  tokens: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getTokensAction: PropTypes.func,
  createTokenAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const tokens = getTokens(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    tokens,
    isLoading,
    message,
    isSuccess,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getTokensAction,
    createTokenAction,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminTokensPage);
