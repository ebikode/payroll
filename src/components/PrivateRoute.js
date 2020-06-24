import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { checkAuth, checkRole } from "../modules/utils/helpers";
import { LOCAL_STORAGE_KEYS } from "../keys";

const { employee, admin } = LOCAL_STORAGE_KEYS;

const PrivateRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={props => {
      return checkAuth() && checkRole() === employee ? (
        <Component {...props} />
      ) : checkAuth() && checkRole() === admin ? (
        <Redirect to="/admin/dashboard" />
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any
};

export const PrivateAdminRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={props => {
      return checkAuth() && checkRole() === admin ? (
        <Component {...props} />
      ) : checkAuth() && checkRole() === employee ? (
        <Redirect to="/dashboard" />
      ) : (
        <Redirect to="/auth/admin" />
      );
    }}
  />
);

PrivateAdminRoute.propTypes = {
  component: PropTypes.any
};

export default PrivateRoute;
