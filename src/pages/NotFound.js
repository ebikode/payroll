import React from "react";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="body">
        <div className="content">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <div className="form-content shadow p-3 ml-5 mb-5 bg-white rounded">
                <div className="text-center mt-3">
                  <Row>
                    <div className="error text-center">
                      <strong>Page Not Found</strong>
                    </div>
                  </Row>
                  <br />
                  <Link to="/">
                    <Button variant="primary">Go Back</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
