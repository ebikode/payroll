import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { getRequest } from "../modules/utils/service";

class VerifyEmailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSuccess: false,
      successMsg: "",
      errorMsg: ""
    };
  }

  componentDidMount() {
    this.verifyEmail();
  }

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
                      <strong>{this.state.errorMsg}</strong>
                    </div>
                    <div className="success text-center">
                      <strong>{this.state.successMsg}</strong>
                    </div>
                  </Row>
                  <br />
                  {this.state.isLoading ? (
                    <Spinner animation="grow" />
                  ) : (
                    <Link to="/">
                      <Button variant="primary">LOGIN</Button>
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  verifyEmail() {
    const { id, token } = this.props.match.params;

    console.log({ id, token });

    this.setState({
      isLoading: true,
      isSuccess: false,
      errorMsg: "",
      successMsg: ""
    });

    if (!token) {
      this.props.history.push("/");
      return;
    }

    let url = `customer/verify/email/${id}/${token}`;

    getRequest(url, false)
      .then(res => {
        // console.log('Verified successfully!', {res})

        if (!res.data.status) {
          this.setState({
            isLoading: false,
            errorMsg: res.data.message
          });
        } else {
          this.setState({
            isLoading: false,
            isSuccess: true,
            successMsg: res.data.message
          });
        }
      })
      .catch(err => {
        console.error("Eror!, some thoughts on the error that occured:", {
          err
        });

        this.setState({
          isLoading: false,
          errorMsg: err.response.data.message
        });
      });
  }
}

VerifyEmailPage.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any
};

export default VerifyEmailPage;
