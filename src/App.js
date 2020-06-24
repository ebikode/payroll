import React from "react";
import PrivateRoute, { PrivateAdminRoute } from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./modules/store";
import PayrollPage from "./pages/Payrolls";
import TaxesPage from "./pages/Taxes";
import ProfilePage from "./pages/Profile";

import LoginPage from "./pages/Login";
import VerifyEmailPage from "./pages/VerifyEmail";
import DashboardPage from "./pages/Dashboard";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminEmployeesPage from "./pages/admin/Employees";
import AdminCreateEmployeePage from "./pages/admin/CreateEmployee";
import AdminPayrollPage from "./pages/admin/Payrolls";
import AdminReportsPage from "./pages/admin/Reports";
import AdminSalariesPage from "./pages/admin/Salaries";
import AdminTaxesPage from "./pages/admin/Taxes";
import AdminSettingsPage from "./pages/admin/Settings";
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
  { path: "/verify-email/:id/:token", component: VerifyEmailPage }
];

/**
 * @typedef {[{ path: string, component: JSX }]} privateRoutes
 * The private routes of this application.
 */
const privateRoutes = [
  { path: "/dashboard", component: DashboardPage },
  { path: "/payrolls", component: PayrollPage },
  { path: "/taxes", component: TaxesPage },
  { path: "/profile", component: ProfilePage }
];

/**
 * @typedef {[{ path: string, component: JSX }]} privateAdminRoutes
 * The private admin routes of this application.
 */
const privateAdminRoutes = [
  { path: "/admin/dashboard", component: AdminDashboardPage },
  { path: "/admin/employees", component: AdminEmployeesPage },
  { path: "/admin/payrolls", component: AdminPayrollPage },
  { path: "/admin/reports", component: AdminReportsPage },
  { path: "/admin/create-employee", component: AdminCreateEmployeePage },
  { path: "/admin/logs", component: AdminLogsPage },
  { path: "/admin/salaries", component: AdminSalariesPage },
  { path: "/admin/taxes", component: AdminTaxesPage },
  { path: "/admin/settings", component: AdminSettingsPage }
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
