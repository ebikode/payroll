import React from "react";
import PropTypes from "prop-types";
import styles from "./css/StatCard.module.css";

class MDStatCard extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.iconTextBox}>
          <div className={styles.iconBox}>{this.props.icon}</div>
          <span className={styles.text}>{this.props.text}</span>
        </div>
        <div className={styles.value}>{this.props.value}</div>
      </div>
    );
  }
}

MDStatCard.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  value: PropTypes.number
};

export default MDStatCard;
