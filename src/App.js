import React from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ExternalApi from "./views/ExternalApi";
import Cards from "./components/Cards";
import SearchResult from "./components/SearchResult"

import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sets/search/:search" exact component={SearchResult} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
          <Route path="/sets/:id" component={Cards} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
