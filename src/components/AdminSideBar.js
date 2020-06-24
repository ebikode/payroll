import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  getAdminRole,
  getAdminState
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
    url: "/admin/payrolls",
    text: "Payrolls"
  },
  {
    url: "/admin/salaries",
    text: "Salaries"
  },
  {
    url: "/admin/tax",
    text: "Tax"
  },
  {
    url: "/admin/admin",
    text: "Admin"
  },
  {
    url: "/admin/settings",
    text: "Settings"
  },
  {
    url: "/admin/logs",
    text: "Activity Logs"
  }
];

class PXAdminSideBar extends React.Component {
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

    return (
      <>
        <div className={styles.sideBarBody}>
          <>{items}</>
        </div>
      </>
    );
  }
}

PXAdminSideBar.propTypes = {
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

export default connect(mapStateToProps)(PXAdminSideBar);
