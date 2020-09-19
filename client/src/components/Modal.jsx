import React from "react";
import ReactDOM from "react-dom";

// attaching a child to a different parent
const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
    {/* we dont want the childern below to use the onclick from above */}
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active random">
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        {props.actions}
      </div>
    </div>,
    //this is referencing the div under id root (index.html)
    document.getElementById("modal")
  );
}

export default Modal;
