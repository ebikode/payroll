import React from "react";
import PrivateRoute, { PrivateAdminRoute } from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./modules/store";

import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import VerifyEmailPage from "./pages/VerifyEmail";
import DashboardPage from "./pages/Dashboard";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminEmployeesPage from "./pages/admin/Employees";
import AdminAccountsPage from "./pages/admin/Accounts";
import AdminPaymentPage from "./pages/admin/Payments";
import AdminSearchPlansPage from "./pages/admin/SearchPlans";
import AdminCreatePlansPage from "./pages/admin/CreatePlans";
import AdminCreatePlanRatesPage from "./pages/admin/CreateRates";
import AdminSettingsPage from "./pages/admin/Settings";
import AdminTokensPage from "./pages/admin/Tokens";
import AdminLogsPage from "./pages/admin/Logs";
import NotFoundPage from "./pages/NotFound";

const store = configureStore(); // if (!token) { //   Router.push("/"); //   return; // }

/**
 * @typedef {[{ path: string, component: JSX }]} publicRoutes
 * The public routes of this application.
 */ const publicRoutes = [
  { path: "/", component: LoginPage },
  { path: "/auth/:role", component: LoginPage },
  // { path: '/test', component: Test }, // This route useful for testing components, or otherwise what you want.
  { path: "/sign-up", component: SignUpPage },
  { path: "/verify-email/:id/:token", component: VerifyEmailPage }
];

/**
 * @typedef {[{ path: string, component: JSX }]} privateRoutes
 * The private routes of this application.
 */
const privateRoutes = [{ path: "/dashboard", component: DashboardPage }];

/**
 * @typedef {[{ path: string, component: JSX }]} privateAdminRoutes
 * The private admin routes of this application.
 */
const privateAdminRoutes = [
  { path: "/admin/dashboard", component: AdminDashboardPage },
  { path: "/admin/employees", component: AdminEmployeesPage },
  { path: "/admin/accounts", component: AdminAccountsPage },
  { path: "/admin/payments", component: AdminPaymentPage },
  { path: "/admin/tokens", component: AdminTokensPage },
  { path: "/admin/logs", component: AdminLogsPage },
  { path: "/admin/search-plans", component: AdminSearchPlansPage },
  { path: "/admin/create-plans", component: AdminCreatePlansPage },
  { path: "/admin/settings", component: AdminSettingsPage },
  {
    path: "/admin/create-plan-rates/:planId",
    component: AdminCreatePlanRatesPage
  }
];

class PexWhitelabelPortalApp extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Switch>
            {publicRoutes.map(route => (
              <PublicRoute
                exact
                path={route.path}
                component={route.component}
                key={route.path}
              />
            ))}
            {privateRoutes.map(route => (
              <PrivateRoute
                component={route.component}
                exact
                path={route.path}
                key={route.path}
              />
            ))}
            {privateAdminRoutes.map(route => (
              <PrivateAdminRoute
                component={route.component}
                exact
                path={route.path}
                key={route.path}
              />
            ))}

            <Route redirect={this.redirect} component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </Provider>
    );
  }
}

export default PexWhitelabelPortalApp;
