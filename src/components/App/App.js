import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    let backClass = this.props.store.user.id ? 'menuWrapper' : 'pageWrapper';
    return (
      <Router>
        <div className={backClass}>
          <div className="head">
            {!this.props.store.user.id ? <Nav /> : <></>}
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route exact path="/about" component={AboutPage} />
              <ProtectedRoute exact path="/user" component={UserPage} />
              <ProtectedRoute exact path="/info" component={InfoPage} />
              <ProtectedRoute
                exact
                path="/login"
                component={LoginPage}
                authRedirect="/user"
              />
              <ProtectedRoute
                exact
                path="/registration"
                component={RegisterPage}
                authRedirect="/user"
              />
              <ProtectedRoute
                exact
                path="/home"
                component={LandingPage}
                authRedirect="/user"
              />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(mapStoreToProps)(App);
