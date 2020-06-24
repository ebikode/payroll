import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getAdminState } from "../modules/selectors/auth.selectors";
import { reactLocalStorage } from "reactjs-localstorage";
import styles from "./css/SideBar.module.css";
import { LOCAL_STORAGE_KEYS } from "../keys";

class PXSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localData: {}
    };
  }

  componentDidMount() {}

  // Changje currently selected account
  changeSelectedAccount(accountId) {
    const { accountID } = LOCAL_STORAGE_KEYS;
    reactLocalStorage.set(accountID, accountId);
    window.location.reload();
  }

  render() {
    return (
      <>
        <div className={styles.sideBarBody}>
          {this.props.accounts.length < 1 ? (
            <div></div>
          ) : (
            <>
              <div></div>
              <Link to="/dashboard">
                <div className={styles.card}>
                  <p>Dashboard</p>
                </div>
              </Link>

              <Link to="/payment">
                <div className={styles.card}>
                  <p>Payments</p>
                </div>
              </Link>

              <Link to="/account">
                <div className={styles.card}>
                  <p>Account</p>
                </div>
              </Link>
            </>
          )}
        </div>
      </>
    );
  }
}

PXSideBar.propTypes = {
  admin: PropTypes.object,
  accounts: PropTypes.array
};

// Map the need state properties to the component property
const mapStateToProps = state => {
  const admin = getAdminState(state);
  // console.log(account, accounts)
  return { admin };
};

export default connect(mapStateToProps)(PXSideBar);
