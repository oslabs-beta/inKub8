import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Grafana from './components/Grafana.jsx';
import Prom from './components/Prom.jsx';
import DisplayMetrics from './components/DisplayMetrics.jsx';

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

              <div className="row">
                <div className="column left">
                  <h2 className="header">Cytoscape Data</h2>
                  <Home />
                </div>
                <div className="column right">
                  <h2 className="header">Metrics</h2>
                  <DisplayMetrics />
                </div>
              </div>


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