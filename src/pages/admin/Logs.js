import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getLogsAction } from "../../modules/actions/log.actions";
import {
  getLogs,
  getNextPage,
  getCurrentPage,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/log.selectors";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PXLayout from "../../components/Layout";

class AdminLogsPage extends React.Component {
  //   constructor(props) {
  //     super(props);

  //   }

  componentDidMount() {
    this.getLogsFromServer(this.props.currentPage);
  }

  getLogsFromServer(page) {
    this.props.getLogsAction(this.props.dispatch, page);
  }

  processActivityLogAction(action) {
    let splitValue = action.split("*");
    console.log({ splitValue });

    let from = splitValue[1];

    let fromJson = from ? JSON.stringify(JSON.parse(from), null, "<br/>") : "";

    let to = splitValue[3];

    let toJson = to ? JSON.stringify(JSON.parse(to), null, "<br/>") : "";

    return `${splitValue[0]} <br/> <code>${fromJson} </code> <br/> ${splitValue[2]} <br/> <code>${toJson}</code>`;
  }

  render() {
    let pgItems = [];
    if (this.props.currentPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Prev
          onClick={() => this.getLogsFromServer(this.props.currentPage)}
        />
      );
    }

    if (this.props.nextPage > 1 && !this.props.isLoading) {
      pgItems.push(
        <Pagination.Next
          onClick={() => this.getLogsFromServer(this.props.nextPage)}
        />
      );
    }
    const serialNumber = this.props.currentPage * 20 - 20 + 1;

    const rows = this.props.logs.map((log, index) => {
      return (
        <tr key={log.id.toString()}>
          <td className="td-border-left">{serialNumber + index}</td>
          <td>{log.admin.first_name + " " + log.admin.last_name}</td>
          <td>{log.app_location}</td>
          <td
            dangerouslySetInnerHTML={{
              __html: this.processActivityLogAction(log.action)
            }}
          />
          <td className="td-border-right">
            {new Date(log.created_at).toLocaleString()}
          </td>
        </tr>
      );
    });

    return (
      <PXLayout>
        <div>
          <div>
            <h5 className="page-title">Activity Logs</h5>

            <hr />
          </div>
          <div className="justify-content-center">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>ADMIN</th>
                  <th>APP LOCATION</th>
                  <th>ACTION</th>
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

AdminLogsPage.propTypes = {
  logs: PropTypes.array,
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  getLogsAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const logs = getLogs(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    logs,
    isLoading,
    message,
    isSuccess,
    currentPage,
    nextPage
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getLogsAction,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminLogsPage);
