import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"
import Home from "./components/Home";
import Cards from "./components/Cards";
import Profile from "./components/Profile";
import SearchResult from "./components/SearchResult";
import CategorySets from "./components/CategorySets";
import ExternalApi from "./views/ExternalApi";
import theme from "./components/Theme";

import "./styles/index.css";
import history from "./utils/history";
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <ThemeProvider theme={theme} >
      <div className="App">
        {/* Don't forget to include the history module */}
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sets/search/:search" exact component={SearchResult} />
            <Route path="/categories/:id" component={CategorySets} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external-api" component={ExternalApi} />
            <Route path="/sets/:id" component={Cards} />
          </Switch>
          <footer>
            <Footer />
          </footer>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
