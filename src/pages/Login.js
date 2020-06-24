import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PXAuthForm from "../components/AuthForm";
import PropTypes from "prop-types";
import { LOCAL_STORAGE_KEYS } from "../keys";

const { admin } = LOCAL_STORAGE_KEYS;

class LoginPage extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {}

  render() {
    const { role } = this.props.match.params;

    let isAdmin = role === admin;

    return (
      <div className="body">
        <div className="bgContent">
          <div className="content">
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <div className="form-content shadow pt-3 pb-3 mb-5 rounded">
                  <PXAuthForm isAdmin={isAdmin} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  countries: PropTypes.array,
  match: PropTypes.any,
  updateCountriesStore: PropTypes.func
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(LoginPage);
