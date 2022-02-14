import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import TopBar from '../components/TopBar';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const {isLoggedIn} = this.props;
    return (
      <div className='row'>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/login" component={LoginPage}/>}
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>

        <LanguageSelector />
      </div>
    );
  }
}

const mapsStateToProps = (store) =>{
  return {
      isLoggedIn: store.isLoggedIn,
  }
}

export default connect(mapsStateToProps)(App);
