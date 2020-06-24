import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { checkAuth } from "../modules/utils/helpers";

const PublicRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={props => {
      return !checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      );
    }}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.any
};

export default PublicRoute;
