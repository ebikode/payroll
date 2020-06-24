import React from "react";
import { connect } from "react-redux";
import { initAuthStore } from "../modules/actions/auth.actions";
import { getAdminStatus } from "../modules/selectors/auth.selectors";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PXHeader from "./Header";
import PXAdminSideBar from "./AdminSideBar";
import styles from "./css/Layout.module.css";

class PRLayout extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.initAuthStore(this.props.dispatch);
  }

  render() {
    return (
      <div className="mt-5">
        <PXHeader />
        <section>
          <Row>
            <Col md="3" lg="2" className="pl-0 d-none d-md-block">
              <PXAdminSideBar />
            </Col>
            <Col md="9" lg="10" className="pr-0 pl-0">
              <div className={styles.body}>
                <div className="pt-5 pr-3 body-inner">
                  <div className="mb-5">{this.props.children}</div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <style jsx="true">{`
          .body-inner {
            padding: 20px 50px 20px 20px;
            min-width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

PRLayout.propTypes = {
  children: PropTypes.any,
  initAuthStore: PropTypes.func,
  isAdmin: PropTypes.bool,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const isAdmin = getAdminStatus(state);

  return { isAdmin };
};

const mapDispatchActionToProps = dispatch => {
  return {
    initAuthStore,
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchActionToProps)(PRLayout);
