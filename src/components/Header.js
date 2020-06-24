import React from "react";
import { connect } from "react-redux";
import {
  getAdminRole,
  getAdminState
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
    let admin = `${this.props.admin.first_name}`;

    return (
      <>
        <div id="header" className={styles.appHeader}>
          <Navbar
            variant="light"
            fixed="top"
            className="App-navbar shadow-sm"
            expand="lg"
          >
            <Navbar.Brand href="/dashboard" className="">
              <img
                width="auto"
                height="50"
                src="/images/logo.png"
                className="d-inline-block align-top"
                alt="PEX+ logo"
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
                    {admin}
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
  customer: PropTypes.object,
  admin: PropTypes.object,
  logout: PropTypes.func
};

// Map the need state properties to the component property
const mapStateToProps = state => {
  const role = getAdminRole(state);
  const admin = getAdminState(state);
  // console.log(customer)
  return { role, admin };
};

export default connect(mapStateToProps, { logout })(PXHeader);
