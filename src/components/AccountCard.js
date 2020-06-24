import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { formatCurrency } from "../modules/utils/helpers";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
import styles from "./css/AccountCard.module.css";

class PRAccountCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      errorMsg: ""
    };
  }

  render() {
    let employee = this.props.employee;

    return (
      <>
        {employee ? (
          <div className={styles.body}>
            <div className={styles.cardHeader}>
              <p>EMPLOYEE INFO:</p>
              <div className={styles.whitePath}></div>
            </div>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>NAME :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>
                  {employee.first_name} {employee.last_name}
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>ROLE :</div>
              </Col>
              <div className={styles.fieldValue}>{employee.position}</div>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>EMAIL :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{employee.email}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>PHONE No. :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{employee.phone}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>ADDRESS :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{employee.address}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>ABOUT :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{employee.about}</div>
              </Col>
            </Row>
            {employee.salary ? (
              <>
                <Row className={styles.row}>
                  <Col md={4}>
                    <div className={styles.fieldTitle}>SALARY:</div>
                  </Col>
                  <Col>
                    <div className={styles.fieldValue}>
                      {formatCurrency(employee.salary.salary)}
                    </div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col md={4}>
                    <div className={styles.fieldTitle}>PENSION (%):</div>
                  </Col>
                  <Col>
                    <div className={styles.fieldValue}>
                      {employee.salary.pension}
                    </div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col md={4}>
                    <div className={styles.fieldTitle}>PAYE (%):</div>
                  </Col>
                  <Col>
                    <div className={styles.fieldValue}>
                      {employee.salary.paye}
                    </div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col md={4}>
                    <div className={styles.fieldTitle}>NSITF (%):</div>
                  </Col>
                  <Col>
                    <div className={styles.fieldValue}>
                      {employee.salary.nsitf}
                    </div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col md={4}>
                    <div className={styles.fieldTitle}>NHF (%):</div>
                  </Col>
                  <Col>
                    <div className={styles.fieldValue}>
                      {employee.salary.nhf}
                    </div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col md={4}>
                    <div className={styles.fieldTitle}>ITF (%):</div>
                  </Col>
                  <Col>
                    <div className={styles.fieldValue}>
                      {employee.salary.itf}
                    </div>
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}

            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>BANK:</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{employee.bank_name}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>BANK ACCOUNT NAME:</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>{employee.account_name}</div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>BANK ACCOUNT NO:</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>
                  {employee.account_number}
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={4}>
                <div className={styles.fieldTitle}>STATUS :</div>
              </Col>
              <Col>
                <div className={styles.fieldValue}>
                  {employee.status
                    ? employee.status.toString().toUpperCase()
                    : ""}
                </div>
              </Col>
            </Row>
            <br />
            <br />
            {/* <Row className={styles.row}>
              <Col md={{ span: 6, offset: 4 }}>
                <Link to={`/search-history/${employee.id}`}>
                  <Button variant="primary" type="Button">
                    View Search History
                  </Button>
                </Link>
              </Col>
            </Row> */}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

PRAccountCard.propTypes = {
  employee: PropTypes.object
};

export default PRAccountCard;
