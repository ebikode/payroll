import React from "react";
import PropTypes from "prop-types";

import { Form } from "react-bootstrap";
import { TextInput } from "react-bootstrap4-form-validation";
import Col from "react-bootstrap/Col";
import styles from "./css/AuthForm.module.css";

class PXSettingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      value: "",
      comment: "",
      status: ""
    };
  }

  render() {
    let formFields = (
      <>
        <Form.Row>
          <Form.Group as={Col} controlId="name" className="form-label-group">
            <TextInput
              id={`name${this.props.formName}`}
              className="form-control"
              name={`name${this.props.formName}`}
              type="text"
              defaultValue={this.props.setting.name}
              onBlur={e => this.props.handleChange(e, this.props.formName)}
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="2"
              maxLength="30"
              errorMessage={{
                validator: `Please enter a Valid Name.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">Name</Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="value" className="form-label-group">
            <TextInput
              id={`value${this.props.formName}`}
              className="form-control"
              name={`value${this.props.formName}`}
              type="text"
              defaultValue={this.props.setting.value}
              onBlur={e => this.props.handleChange(e, this.props.formName)}
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
              errorMessage={{
                validator: `Please enter a Valid Value.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">Value</Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="comment" className="form-label-group">
            <TextInput
              id={`comment${this.props.formName}`}
              className="form-control"
              name={`comment${this.props.formName}`}
              type="text"
              defaultValue={this.props.setting.comment}
              onBlur={e => this.props.handleChange(e, this.props.formName)}
              onChange={e => {
                this.props.handleChange(e, this.props.formName);
                e.target.setAttribute("value", e.target.value);
              }}
              minLength="2"
              maxLength="100"
              errorMessage={{
                validator: `Please enter a Valid Comment.`
              }}
              required
            />
            <Form.Label className="form-control-placeholder">
              Comment
            </Form.Label>
          </Form.Group>
        </Form.Row>
      </>
    );

    return (
      <>
        <div className={styles.formBody}>{formFields}</div>
      </>
    );
  }
}

PXSettingForm.propTypes = {
  setting: PropTypes.object,
  formName: PropTypes.string,
  handleChange: PropTypes.func
};

export default PXSettingForm;
