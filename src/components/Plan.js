import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./css/Plan.module.css";

class PXPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let plan = this.props.plan;

    let ratesData = plan.rates.map(rate => {
      return (
        <ListGroup.Item key={rate.id}>
          {rate.min_point} - {rate.max_point}
          <span className="float-right">${rate.cost_per_point}/pt</span>
        </ListGroup.Item>
      );
    });

    let showAnalytics = plan.include_analytics ? (
      <Card.Text className="text-center">Includes Analytics</Card.Text>
    ) : (
      <Card.Text className="text-center">-</Card.Text>
    );

    let showMiles = plan.show_miles_to_cash ? (
      <Card.Text className="text-center">Shows Miles to Cash</Card.Text>
    ) : (
      <Card.Text className="text-center">-</Card.Text>
    );

    let allowPriceAlert = plan.allow_price_alert ? (
      <Card.Text className="text-center">Allow Price Alert</Card.Text>
    ) : (
      <Card.Text className="text-center">-</Card.Text>
    );

    return (
      <>
        <div id="header" className={styles.planBody}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{plan.name}</Card.Title>

              {showAnalytics}
              {showMiles}
              {allowPriceAlert}

              <Card className={styles.rateCard}>
                <Card.Header className={styles.rateCardHeader}>
                  Rates
                </Card.Header>
                <ListGroup variant="flush">{ratesData}</ListGroup>
              </Card>
              <br />
              <div className="text-center">
                <Button onClick={this.props.select}>Select</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

PXPlan.propTypes = {
  plan: PropTypes.object,
  select: PropTypes.func
};

export default PXPlan;
