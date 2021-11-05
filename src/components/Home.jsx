import React, { Component, setState } from 'react';
import fs from 'fs';
import buildTerminal from "../index.js"
import '../../node_modules/xterm/css/xterm.css';

const cytoscape = require('cytoscape');
const cyStyle = [{
    "selector": "node",
    "style": {
      "background-color": "#0066cc",
      "content": "data(name)",
      "color": "#004080",
      "shape": "data(type)",
      "height": 40,
      "width": 40,
      "text-wrap": "wrap",
      "text-max-width": 200,
      "text-overflow-wrap": "anywhere",
      "font-size": 18,
      "text-valign": "bottom",
    },
  },
  {
    selector: "edge",
    style: {
      width: 5,
      "line-color": "#CCCCDC",
      "target-arrow-color": "#CCCCDC",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
    },
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderCyto = this.renderCyto.bind(this);
  }

  renderCyto() {
    let cy = cytoscape({
      container: document.getElementById("cy"), // container to render in

      elements: this.state.clusterData,

      style: cyStyle,

      layout: {
        name: "breadthfirst",

        fit: true, // whether to fit the viewport to the graph
        directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
        padding: 30, // padding on fit
        circle: false, // put depths in concentric circles if true, put depths top down if false
        grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
        spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        roots: undefined, // the roots of the trees
        maximal: false, // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only)
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled,
        animateFilter: function (node, i) {
          return true;
        }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position) {
          return position;
        },
      },
      userPanningEnabled: false,
    });
  }

  async componentDidMount(){
    buildTerminal();
    const toJson = function(res){ return res.json(); }; 
    window.bridge.send('compileData');
    let clusterData = await window.bridge.invoke('compileData').then(cluster => {
        return cluster;
      });
    this.setState({ clusterData: clusterData });
    console.log(clusterData);
    window.addEventListener("resize", this.renderCyto);
    this.renderCyto();
    return null;
  }

  render() {
    return (
      <div>
        <main>
          <div id="cy" style={{ height: "500px" }}></div>
          <iframe
            src="http://localhost:3000/d-solo/Ls9K11Knz/kubernetes-compute-resources-cluster-copy?orgId=1&from=1635812558958&to=1635816158958&panelId=8"
            width="100%"
            height="200"
            frameborder="0"
          ></iframe>
        </main>
      </div>
    );
  }
}

export default Home;
