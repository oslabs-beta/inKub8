import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Grafana from './components/Grafana.jsx';
import Prom from './components/Prom.jsx';
import DisplayMetrics from './components/DisplayMetrics.jsx';
import PodMetrics from './components/PodMetrics.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleTap = this.handleTap.bind(this);
  }

  handleTap(data) {
    console.log(data)
    const { type, id } = data;
    const newState = { ...this.state };
    if (id === this.state.lastPodId) {
      newState.lastPodShape = undefined;
      newState.lastPodId = undefined;
    } else {
      newState.lastPodShape = type;
      newState.lastPodId = id;
    }
    this.setState(newState);
  }

  renderMetricsNode() {
    const {lastPodShape} = this.state;
    
    if (lastPodShape === "ellipse") {
     
      return <PodMetrics />;
    } else if (lastPodShape === "triangle") {
      
    }
    return <DisplayMetrics />;

    switch (lastPodShape) {
      case "ellipse":
    
        return <PodMetrics />;
      case "triangle":
 
      default:
        return <DisplayMetrics />;
    }
  }

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
                    <Home onTap={this.handleTap} />
                  </div>
                  <div className="column right">
                    <h2 className="header">Metrics</h2>
                    {this.renderMetricsNode()}
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