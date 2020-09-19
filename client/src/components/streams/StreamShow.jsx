import React from "react";
//used to setup streaming
import flv from "flv.js"
import {connect} from "react-redux";
import {fetchStream} from "../../actions";

class StreamShow extends React.Component {

  //this method is for setting up streaming
  constructor(props){
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  //this will update once the stream is fetched
  componentDidUpdate(){
    this.buildPlayer();
  }

  //stop video player when navigating away from page
  componentWillUnmount(){
    this.player.destroy();
  }

  //only attach once we get the stream
  buildPlayer(){
    if(this.player || !this.props.stream){
      return;
    }

    const {id} = this.props.match.params;
    //for streaming
    //doc: https://www.npmjs.com/package/flv.js
    this.player = flv.createPlayer({
      type: "flv",
      //where NodeMediaServer  is running
      //Stream Name, ${id}, is setup through OBS
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
    //when reloading this sometimes doesn't work
    this.player.play();
  }

  render(){
    if(!this.props.stream){
      return <div>Loading...</div>
    }

    const {title, description} = this.props.stream;
    return(
      <div>
        <video ref={this.videoRef} style={{width: "100%"}} controls={true}/>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);
