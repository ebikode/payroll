import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  getAdminState,
  getAdminStatus,
  getEmployeeState
} from "../modules/selectors/auth.selectors";
import styles from "./css/SideBar.module.css";

const links = [
  {
    url: "/admin/dashboard",
    text: "Dashboard"
  },
  {
    url: "/admin/employees",
    text: "Employees"
  },
  {
    url: "/admin/salaries",
    text: "Salaries"
  },
  {
    url: "/admin/payrolls",
    text: "Payrolls"
  },
  {
    url: "/admin/reports",
    text: "Reports"
  },
  {
    url: "/admin/taxes",
    text: "Tax"
  },
  // {
  //   url: "/admin/admin",
  //   text: "Admin"
  // },
  {
    url: "/admin/settings",
    text: "Settings"
  },
  {
    url: "/admin/logs",
    text: "Activity Logs"
  }
];

const employeeLinks = [
  {
    url: "/dashboard",
    text: "Dashboard"
  },
  {
    url: "/payrolls",
    text: "Payrolls"
  },
  {
    url: "/taxes",
    text: "Tax"
  },
  {
    url: "/profile",
    text: "Profile"
  }
];

class PXSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localData: {}
    };
  }

  componentDidMount() {}

  render() {
    let items = links.map(link => (
      <Link to={link.url} key={link.text}>
        <div className={styles.card}>
          <p>{link.text}</p>
        </div>
      </Link>
    ));

    let employeeItems = employeeLinks.map(link => (
      <Link to={link.url} key={link.text}>
        <div className={styles.card}>
          <p>{link.text}</p>
        </div>
      </Link>
    ));

    return (
      <>
        {this.props.isAdmin ? (
          <div className={styles.sideBarBody}>
            <>{items}</>
          </div>
        ) : (
          <div className={styles.sideBarBody}>
            <>{employeeItems}</>
          </div>
        )}
      </>
    );
  }
}

PXSideBar.propTypes = {
  isAdmin: PropTypes.bool,
  employee: PropTypes.object,
  admin: PropTypes.object,
  logout: PropTypes.func
};

// Map the need state properties to the component property
const mapStateToProps = state => {
  const isAdmin = getAdminStatus(state);
  const admin = getAdminState(state);
  const employee = getEmployeeState(state);
  // console.log(employee)
  return { isAdmin, admin, employee };
};

export default connect(mapStateToProps)(PXSideBar);
