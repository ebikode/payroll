import React from "react";
import { connect } from "react-redux";
import {
  getAdminStatus,
  getAdminState,
  getEmployeeState
} from "../modules/selectors/auth.selectors";
import { logout } from "../modules/actions/auth.actions";
import { reactLocalStorage } from "reactjs-localstorage";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import PXAdminSideBar from "./AdminSideBar";
import styles from "./css/Header.module.css";
import { LOCAL_STORAGE_KEYS } from "../keys";

class PXHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let admin = this.props.admin ? this.props.admin.first_name : "";
    let employee = this.props.isAdmin ? admin : this.props.employee.first_name;
    return (
      <>
        <div id="header" className={styles.appHeader}>
          <Navbar
            variant="light"
            fixed="top"
            className="App-navbar shadow-sm"
            expand="lg"
          >
            <Navbar.Brand href="/dashboard" className={styles.navbarBrand}>
              <img
                width="auto"
                height="50"
                src="/images/logo.png"
                className="d-inline-block align-top"
                alt="Kimberly Ryan logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="d-block d-sm-none"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="d-block d-sm-none">
                <PXAdminSideBar />
              </div>
            </Navbar.Collapse>

            <Nav className={styles.nav}>
              <Nav.Item>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-dark"
                    id="dropdown-basic"
                    className={styles.dropdownToggle}
                  >
                    {employee}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={this.logout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            </Nav>
          </Navbar>
        </div>
      </>
    );
  }

  logout = () => {
    const { token } = LOCAL_STORAGE_KEYS;
    this.props.logout();
    reactLocalStorage.clear();
    Cookies.remove(token);
    window.location.reload();
  };
}

PXHeader.propTypes = {
  employee: PropTypes.object,
  admin: PropTypes.object,
  isAdmin: PropTypes.bool,
  logout: PropTypes.func
};

// Map the need state properties to the component property
const mapStateToProps = state => {
  const admin = getAdminState(state);
  const isAdmin = getAdminStatus(state);
  const employee = getEmployeeState(state);
  // console.log(employee)
  return { isAdmin, admin, employee };
};

export default connect(mapStateToProps, { logout })(PXHeader);
