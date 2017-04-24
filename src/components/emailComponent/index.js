import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { sendEmail } from 'elRedux/EmailReducer';
const styles = require('./EmailComponent.scss');

@connect(state => ({ emailSendingStatus: state.EmailReducer.emailSendingStatus }), { sendEmail })
@reduxForm({
  form: 'EmailForm', // a unique name for this form
  fields: ['firstName']
})
class EmailComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = () => {
    this.props.sendEmail();
  };

  render() {
    const { sendEmail } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default EmailComponent;