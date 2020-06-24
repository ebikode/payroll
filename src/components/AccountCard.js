import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./css/AccountCard.module.css";

class PXAccountCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      errorMsg: ""
    };
  }

  render() {
    let account = this.props.account;

    return (
      <>
        {account ? (
          <div className={styles.body}>
            <div className={styles.cardHeader}>
              <p>ACCOUNT INFO CARD:</p>
              <div className={styles.whitePath}></div>
            </div>
            <Row className={styles.row}>
              <div className={styles.fieldTitle}>
                API KEY: {account.account_key}
              </div>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>NAME :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{account.name}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>EMAIL :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{account.email}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>PHONE No. :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{account.phone}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>TYPE :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>
                  {account.type.toUpperCase()}
                </div>
              </Col>
            </Row>
            {account.search_plan ? (
              <Row className={styles.row}>
                <Col md={4}>
                  <div className={styles.fieldTitle}>SEARCH PLAN :</div>
                </Col>
                <Col>
                  <div className={styles.fieldValue}>
                    {account.search_plan.name}
                  </div>
                </Col>
              </Row>
            ) : (
              <></>
            )}

            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>POINT BALANCE :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{account.point_balance}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>POINT USED :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{account.point_used}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>TOTAL SEARCH :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{account.total_search}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>START UP :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>
                  {account.is_startup.toString().toUpperCase()}
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>APPROVED :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>
                  {account.is_approved.toString().toUpperCase()}
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>EXPIRES :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>
                  {new Date(account.expiration_date).toLocaleString()}
                  {}
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>STATUS :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>
                  {account.status.toUpperCase()}
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <Row className={styles.row}>
              <Col md={{ span: 6, offset: 4 }}>
                <Link to={`/search-history/${account.id}`}>
                  <Button variant="primary" type="Button">
                    View Search History
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

PXAccountCard.propTypes = {
  account: PropTypes.object
};

export default PXAccountCard;
