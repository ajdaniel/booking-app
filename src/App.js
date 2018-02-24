import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './App.css';
import Events from './pages/Events/Events'; // todo: use index here?

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
                <Route path="/events/:id?" component={Events}></Route>
            </div>
        </Router>
    );
  }
}

export default App;
