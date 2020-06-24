import React from "react";
import PropTypes from "prop-types";
import styles from "./css/StatsBox.module.css";
import MDStatCard from "./StatCard";

class MDStatsBox extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    let items = this.props.data.map((item, index) => {
      var key = `stat-${index}`;
      return (
        <MDStatCard
          key={key}
          value={item.value}
          text={item.text}
          icon={<i className={item.icon}></i>}
        />
      );
    });

    return <div className={styles.statsBox}>{items}</div>;
  }
}

MDStatsBox.propTypes = {
  data: PropTypes.array
};

export default MDStatsBox;
