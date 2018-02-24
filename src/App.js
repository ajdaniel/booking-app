import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <header className="ete-header">
                    <span><Link to="/">Eastleigh Tech Events</Link></span>
                    <ul className="ete-header--links">
                        <li className="ete-header--link">
                            <Link to="/events">events</Link>
                        </li>
                        <li className="ete-header--link">
                            <Link to="/me">my events</Link>
                        </li>
                    </ul>
                </header>
                <Route exact={true} path="/" render={() => (
                    <h1>Welcome to the Eastleigh Tech Events!</h1>
                )} />
            </div>
        </Router>
    );
  }
}

export default App;
