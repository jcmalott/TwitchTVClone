import React from "react";
import {Field, reduxForm} from "redux-form";

class StreamForm extends React.Component {
  //shows a error to user if submit is hit with no text or user clicks in then out with no text
  renderError({error, touched}){
    if(touched && error){
      return(
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //these are children of formProps
  //meta deals with input boxes being filled in
  renderInput = ({input, label, meta}) => {
    //to make input boxes red if nothing within them
    const className = `field ${meta.error && meta.touched ? "error" : ""}`
    return (
      //any params that you want to use to will have to hook them up
      // <input onChange={formProps.input.onChange} value={fromProps.input.value}/>
      //this hooks up all params
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {/* errors from validate*/}
        {this.renderError(meta)}
      </div>
    );
  }

  //formValues will be past instead of an event
  onSubmit = (formValues) => {
    console.log(formValues);
    //redux-form will now take care of this
    // event.preventDefault();

    this.props.onSubmit(formValues);
  }

  render(){
    return(
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {/* name field is required
        field does not actually place a form just sets up the connection to a action and store
        -component is needed for that */}
        <Field name="title" component={this.renderInput} label="Enter Title"/>
        <Field name="description" component={this.renderInput} label="Enter Description"/>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  //title and description are the name fields of field
  //these errors are sent to the component method
  if(!formValues.title){
    errors.title = "You must enter a title";
  }
  if(!formValues.description){
    errors.description = "You must enter a description";
  }

  return errors;
}

export default reduxForm({
  form: "streamForm",
  validate: validate
})(StreamForm);
