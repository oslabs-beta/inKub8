import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Tippy from '@tippyjs/react';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Grafana from './components/Grafana.jsx';
import Prom from './components/Prom.jsx';
import DisplayMetrics from './components/DisplayMetrics.jsx';
import PodMetrics from './components/PodMetrics.jsx';
import DeplMetrics from './components/DeplMetrics.jsx';  
import ServiceMetrics from './components/ServiceMetrics.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleTap = this.handleTap.bind(this);
  }

  handleTap(data) {
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
    return <Tippy content="Hello"/>

  }

  renderMetricsNode() {
    const { lastPodShape } = this.state;

    if (lastPodShape === "ellipse") return <PodMetrics />;
    if (lastPodShape === "hexagon") return <DeplMetrics />;
    if (lastPodShape === "pentagon" || lastPodShape === "triangle")
      return <DisplayMetrics />;
    if (
      lastPodShape === "rectangle" ||
      lastPodShape === "vee" ||
      lastPodShape === "diamond"
    )
      return <ServiceMetrics />;
    return <DisplayMetrics />;

    // switch (lastPodShape) {
    //   case "ellipse":

    //     return <PodMetrics />;
    //   case "triangle":
    //     return <ServiceMetrics />
    //   default:
    //     return <DisplayMetrics />;
    // }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <main>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <div className="container">
                  <div className="row">
                    <div className="column left">
                      <Home onTap={this.handleTap} />
                    </div>
                    <div className="column right">{this.renderMetricsNode()}</div>
                  </div>
                  <div className="row">
                    <div id="terminal-wrapper">
                      <div id="terminal"></div>
                    </div>
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