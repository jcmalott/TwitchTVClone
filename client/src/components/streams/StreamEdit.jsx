import React from "react";
import _ from "lodash";
import {connect} from "react-redux";
import {fetchStream, editStream} from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount(){
    console.log("Edit Props: ", this.props);
    this.props.fetchStream(this.props.match.params.id);
  }

  // onSubmit = (formValues) => {
  //   this.props.editStream(this.props.match.params.id, formValues);
  // }

  render(){
      if(!this.props.stream){
        return <div>Loading...</div>;
      }

      return(
        <div>
          <h3>Edit a Stream</h3>
          <StreamForm
            //initialValues is a param from redux
            // initialValues={{title: "EDIT ME", description: "CHANGE ME TO"}}

            //passes all values with stream
            // initialValues={this.props.stream}

            //will only pass title and description from stream
            initialValues={_.pick(this.props.stream, "title", "description")}
            onSubmit={this.onSubmit}/>
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("Stream Edit State");
  console.log("Streams: ", state.streams);
  return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
