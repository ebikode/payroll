import React from "react";
import { connect } from "react-redux";

import { getEmployeeState } from "../modules/selectors/auth.selectors";
import PRLayout from "../components/Layout";
import PRAccountCard from "../components/AccountCard";
import PropTypes from "prop-types";

class ProfilePage extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {}

  render() {
    return (
      <PRLayout>
        <div className="formContainer">
          {this.props.employee ? (
            <PRAccountCard employee={this.props.employee} />
          ) : (
            <></>
          )}
        </div>
      </PRLayout>
    );
  }
}

ProfilePage.propTypes = {
  employee: PropTypes.object,
  getEmployeeState: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const employee = getEmployeeState(state);
  return { employee };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getEmployeeState,
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchActionToProps)(ProfilePage);
