import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Grafana from './components/Grafana.jsx';
import Prom from './components/Prom.jsx';

class App extends Component {
  // constructor(props){
  //     super(props);
  //     this.state = {};
  // }

  render() {
    return (
      <HashRouter>
        <div>
          <main>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/grafana" component={Grafana} />
              <Route path="/prom" component={Prom} />
            </Switch>
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;