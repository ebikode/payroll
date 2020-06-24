import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import styles from "./css/Banner.module.css";

class PXBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      immediate: true,
      setFocusOnError: true,
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <>
        <div className="form-content text-center shadow bg-white rounded">
          <div className={styles.img}></div>
          <div className={styles.bannerBody}>
            <div className="p-3 ml-5 mb-5">
              <div>
                <p>Click the button below to Add a New Search API Account</p>
              </div>

              <Link to="/create-account">
                <Button
                  className={styles.button}
                  variant="primary"
                  type="button"
                >
                  Add New Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PXBanner;
