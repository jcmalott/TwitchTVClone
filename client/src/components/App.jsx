import React from "react";
import {BrowserRouter, Router, Route, Switch} from "react-router-dom";
import Header from "./Header";
import history from "../history";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

// Bad, will dump all data and reload everything
//this is the basic link (lowercase l)
// <link href="/"> </link>

//Good, does't make a network request of reload data
//this is the Link (uppercase L) from react-router-dom
// <Link to=""></Link>

const App = () => {
    return(
      <div>
        {/* Holds the history of the address bar */}
        {/* if no file is found for path in public then index.html is loaded
            this will cause all code to be loaded*/}

        {/* Browser comes with its own history a plain router does not */}
        {/* <BrowserRouter> */}
        <Router history={history}>

      {/* Will always return the index.html and only the client will laod what it loaded
          after /#/
          <HashRouter /> */}
          <div>
            <Header className="ui container"/>
            {/* Switch makes it so that when one url is found it will not go through the list checking others */}
            <Switch>
              {/* exact makes it so that other path with / in it don't also get displayed */}
              <Route path="/" exact component={StreamList}/>
              <Route path="/streams/new" exact component={StreamCreate}/>
              <Route path="/streams/edit/:id" exact component={StreamEdit}/>
              <Route path="/streams/delete/:id" exact component={StreamDelete}/>
              <Route path="/streams/:id" exact component={StreamShow}/>
            </Switch>
          </div>
        </Router>
        {/* </BrowserRouter> */}
      </div>
    );
}

export default App;
