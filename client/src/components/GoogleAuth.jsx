import React from "react";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {

  componentDidMount(){
    //client:auth2 is within the client:auth2
    window.gapi.load("client:auth2", () => {
      //will wait until load is over then connect key from https://console.developers.google.com/
      window.gapi.client.init({
        clientId: "208891526435-tmjrt11gt7isanlrfdmujoe59cj58do5.apps.googleusercontent.com",
        scope: "email"
      //will run once authication is complete
      }).then(() => {
        //get user sign in and check if they actually signed in
        this.auth = window.gapi.auth2.getAuthInstance();
        // this.setState({isSignedIn: this.auth.isSignedIn.get()});
        this.onAuthChange(this.auth.isSignedIn.get());
        //update the text without having to reload
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    // this.setState({isSignedIn: this.auth.isSignedIn.get()});
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut();
    }
  }

  renderAuthButton(){
    if(this.props.isSignedIn === null){
      return null;
    }else if(this.props.isSignedIn){
      return(
        //signOut is a method from auth
        <button onClick={() => this.auth.signOut()} className="ui red google button">
          <i className="google icon"/>
          Sign Out
        </button>
      );
    }else{
      return(
        <button onClick={() => this.auth.signIn()} className="ui red google button">
          <i className="google icon"/>
          Sign in with Google
        </button>
      );
    }
  }

  render(){
    return(
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = state => {
  return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps,{
  signIn,
  signOut
})(GoogleAuth);
