import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PXRegisterForm from "../components/RegForm";
import { getCountries } from "../modules/selectors/global.selectors";
import { getCountriesAction } from "../modules/actions/global.actions";
import PropTypes from "prop-types";

class SignUpPage extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {
    if (this.props.countries.length < 1) {
      this.props.getCountriesAction(this.props.dispatch);
    }
  }

  render() {
    return (
      <div className="body">
        <div className="content">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <div className="form-content shadow pt-3 pb-3 mb-5 bg-white rounded">
                <PXRegisterForm />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  countries: PropTypes.array,
  getCountriesAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const countries = getCountries(state);

  return { countries };
};

const mapDispatchActionToProps = dispatch => {
  return {
    getCountriesAction,
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchActionToProps)(SignUpPage);
