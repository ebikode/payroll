import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateSettingAction } from "../../modules/actions/setting.actions";
import {
  getSettings,
  getSuccessStatus,
  getMessage,
  getLoadingStatus
} from "../../modules/selectors/setting.selectors";
import { ValidationForm } from "react-bootstrap4-form-validation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PXLayout from "../../components/Layout";
import PXSettingForm from "../../components/SettingForm";

class AdminSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formNameArray: [],
      formValues: {},
      selectedForm: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}

  render() {
    let forms = this.props.settings.map((setting, index) => {
      let formName = `Form${index + 1}`;

      return (
        <>
          <Row key={`Row${formName}`}>
            <Col md={{ span: 8, offset: 2 }}>
              <ValidationForm
                key={`ValidationForm${formName}`}
                onSubmit={e => this.handleSubmit(e, formName)}
                onErrorSubmit={this.handleErrorSubmit}
                immediate={this.state.immediate}
                setFocusOnError={this.state.setFocusOnError}
                defaultErrorMessage={{ required: "Please fill the Form." }}
              >
                <br />

                <div>
                  {this.props.isLoading ? (
                    <Spinner animation="grow" />
                  ) : (
                    <PXSettingForm
                      key={formName}
                      setting={setting}
                      formName={formName}
                      handleChange={(e, formName) =>
                        this.handleChange(e, formName, setting)
                      }
                    />
                  )}
                </div>

                <Row className="text-center pl-3 pr-3">
                  {this.state.selectedForm === formName ? (
                    !this.props.isLoading && !this.props.isSuccess ? (
                      <div className="error text-center">
                        <strong>{this.props.message}</strong>
                      </div>
                    ) : (
                      <div className="success text-center">
                        <strong>{this.props.message}</strong>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                </Row>

                <Row>
                  <Col></Col>
                  <Col>
                    <div className="text-right mt-3">
                      <Button variant="primary" type="submit">
                        Update
                      </Button>
                    </div>
                  </Col>
                </Row>
              </ValidationForm>
            </Col>
          </Row>
          <hr key={`hr${formName}`} />
        </>
      );
    });

    return (
      <PXLayout>
        <div>
          <div>
            <h5 className="page-title">Update App Settings</h5>
            <hr />
          </div>
          <div className="justify-content-center">{forms}</div>
        </div>
      </PXLayout>
    );
  }

  // Handles initilization of form values
  initForm(formName, setting) {
    let values = {
      settingId: setting.id,
      name: setting.name,
      value: setting.value,
      comment: setting.comment,
      status: setting.status
    };

    let formValues = this.state.formValues;
    formValues[formName] = values;

    //   console.log(newFormNameArray);

    this.setState({
      formValues: formValues
    });
  }

  handleErrorSubmit = (e, formData, errorInputs) => {
    console.log(e, formData, errorInputs);
  };

  handleSubmit(e, formName) {
    e.preventDefault();

    this.setState({ selectedForm: formName });

    let values = this.state.formValues[formName];
    let payload = {
      setting_id: values.settingId,
      name: values.name,
      value: values.value,
      comment: values.comment,
      status: values.status
    };

    console.log({ payload });

    this.updateSetting(payload);
  }

  handleChange(event, formName, setting) {
    event.preventDefault();

    let val = event.target.value;

    var formValues = this.state.formValues;

    var values = formValues[formName];

    // if it's the first time the values are being created
    if (!values) {
      this.initForm(formName, setting);
      formValues = this.state.formValues;
      values = formValues[formName];
    }

    switch (event.target.id) {
      case `name${formName}`:
        values.name = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `value${formName}`:
        values.value = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      case `comment${formName}`:
        values.comment = val;
        formValues[formName] = values;
        this.setState({ formValues: formValues });
        break;
      default:
        break;
    }
  }

  updateSetting(payload) {
    this.props.updateSettingAction(this.props.dispatch, payload);
  }
}

AdminSettingsPage.propTypes = {
  settings: PropTypes.array,
  isSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  updateSettingAction: PropTypes.func,
  dispatch: PropTypes.any
};

const mapStateToProps = state => {
  const settings = getSettings(state);
  const isSuccess = getSuccessStatus(state);
  const message = getMessage(state);
  const isLoading = getLoadingStatus(state);
  return {
    settings,
    isLoading,
    message,
    isSuccess
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    updateSettingAction,
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(AdminSettingsPage);
