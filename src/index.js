import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./fontawesome/css/fontawesome.min.css";
import "./fontawesome/css/regular.min.css";
import "./fontawesome/css/solid.min.css";
import "./App.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

const createHistory = require("history").createBrowserHistory;

const history = createHistory();

ReactDOM.render(
  <BrowserRouter>
    <App history={history} />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
