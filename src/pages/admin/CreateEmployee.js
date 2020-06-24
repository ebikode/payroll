import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSuccessStatus } from "../../modules/selectors/employee.selectors";

import { createEmployeeAction } from "../../modules/actions/employee.actions";

import PRLayout from "../../components/Layout";
import PREmployeeForm from "../../components/EmployeeForm";
import PropTypes from "prop-types";

class AdminCreateEmployeePage extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {}

  render() {
    return (
      <PRLayout>
        <div className="formContainer">
          <PREmployeeForm submit={payload => this.createEmployee(payload)} />
        </div>
      </PRLayout>
    );
  }

  createEmployee(payload) {
    console.log({ payload });
    this.props.createEmployeeAction(this.props.dispatch, payload).then(() => {
      if (this.props.isSuccess) this.props.history.push(`/admin/employees`);
    });
  }
}

AdminCreateEmployeePage.propTypes = {
  isSuccess: PropTypes.bool,
  history: PropTypes.any,
  createEmployeeAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const isSuccess = getSuccessStatus(state);

  return { isSuccess };
};

const mapDispatchActionToProps = dispatch => {
  return {
    createEmployeeAction,
    dispatch
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchActionToProps)(AdminCreateEmployeePage)
);
