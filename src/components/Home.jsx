import React, { Component, setState } from 'react';
//import { ipcRenderer } from 'electron';
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
      "text-max-width": 100,
      "text-overflow-wrap": "anywhere",
      "font-size": 10,
      "text-valign": "center"
      
    }
  }, {
    "selector": "edge",
      "style": {
        "width": 3,
        "line-color": "#b3d9ff",
        "target-arrow-color": "#b3d9ff",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      }
  }];



class Home extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  async componentDidMount(){
    const toJson = function(res){ return res.json(); }; 
    window.shit.send('compileData');
    let clusterData = await window.shit.invoke('compileData').then(cluster => {
        return cluster;
    });
    let cy = cytoscape({

      container: document.getElementById('cy'), // container to render in
    
      elements: clusterData,
     
      style: cyStyle,
    
      layout: {
        name: 'breadthfirst',
    
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
        animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position ){ return position; } 
      },
      userPanningEnabled: false
    });

    this.setState({clusterData: clusterData, cy: cy});
    return null;
  }

  render() {
    return (
      <div>
        <main>
          <div id='cy' style={{height: '600px'}}></div>
        </main>
      </div>
    );
  }
}

export default Home;