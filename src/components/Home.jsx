import React, { Component, setState } from 'react';
import buildTerminal from "../index.js"
import cytoscape from 'cytoscape';
import tippy from 'tippy.js';
import Tippy from '@tippyjs/react';
// import popper from 'cytoscape-popper';
// import PodImage from '../img/pod-128.png'
import '../../node_modules/xterm/css/xterm.css';
//import { ipcRenderer } from 'electron';
// let cytoscape = require('cytoscape');
let popper = require('cytoscape-popper');

cytoscape.use( popper ); // register extension

// cytoscape.use( popper );

const cyStyle = [
  {
    selector: "node",
    style: {
      "background-color": "#131619",
      // content: "data(name)",
      color: "#CCCCDC",
      // shape: "data(type)",
      height: 220,
      width: 220,
      "background-width": 200,
      "background-height": 200,
      // "text-wrap": "wrap",
      // "text-max-width": 200,
      // "text-overflow-wrap": "anywhere",
      // "font-size": 20,
      // "text-valign": "bottom",
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
  {
    selector: 'node[type = "ellipse"]',
    style: {
      "background-image": "main_window/img/pod-128.png img/pod-128.png",
    },
  },
  {
    selector: 'node[type = "hexagon"]',
    style: {
      "background-image": "main_window/img/deploy-128.png img/deploy-128.png",
    },
  },
  {
    selector: 'node[type = "pentagon"]',
    style: {
      "background-image": "img/sts-128.png main_window/img/sts-128.png",
    },
  },
  {
    selector: 'node[type = "triangle"]',
    style: {
      "background-image": "img/rs-128.png main_window/img/rs-128.png",
    },
  },
  {
    selector: 'node[type = "rectangle"]',
    style: {
      "background-image": "img/svc-128.png main_window/img/svc-128.png",
    },
  },
  {
    selector: 'node[type = "vee"]',
    style: {
      "background-image": "img/svc-128.png main_window/img/svc-128.png",
    },
  },
  {
    selector: 'node[type = "diamond"]',
    style: {
      "background-image": "img/svc-128.png main_window/img/svc-128.png",
    },
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props);
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
        padding: 10, // padding on fit
        circle: false, // put depths in concentric circles if true, put depths top down if false
        grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
        spacingFactor: 2, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
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
      minZoom: 0.1,
      maxZoom: 2,
      userZoomingEnabled: true,
      userPanningEnabled: true,
      wheelSensitivity: 0.2,
    });

 

    cy.on("tap", "node", (shape) => {
      const onTap = this.props.onTap;
      const node = shape.target;
      onTap?.(node._private.data);
      console.log("POD TAPPED!!", node._private.data);
    });
  
    function makePopper(ele) {
      let ref = ele.popperRef();
      // console.log("REFERENCE:", ref)
      ele.tippy = tippy(document.createElement('div'), {
        
        // popperInstance will be available onCreate
        // lazy: false,
        // followCursor: 'true',
        // hideOnClick: false,
        // flipOnUpdate: true,
        onShow(instance) {
          // console.log("yoooooooo:", instance.popper)
          instance.popper.reference = ref
          // console.log("y1111111111ooo:", instance.popper.reference)
          // console.log('ELE TIPPY', ele.tippy)
        },
      });

      function name() {
        if (ele) {
          return ele._private.data.name;
        }
      }

      function group() {
        if (ele) {
          return ele._private.group;
        }
      }

      if (group() === "nodes") {
      ele.tippy.setContent(name());
      console.log("ELEEMTENT:", ele)
    }}
  

    cy.ready(function() {
      console.log('cy.elements: ', cy.elements())
      cy.elements().forEach(function(ele) {
        
        makePopper(ele);
      });
    });
  
    cy.elements().unbind('mouseover');
    cy.elements().bind('mouseover', (event) => event.target.tippy.show());
  
    cy.elements().unbind('mouseout');
    cy.elements().bind('mouseout', (event) => event.target.tippy.hide());
    
  
  
  // function makePopper(ele) {
  //   let ref = ele.popperRef(); // used only for positioning

  //   ele.tippy = tippy(ref, { // tippy options:
  //     content: () => {
  //       let content = document.createElement('div');

  //       content.innerHTML = ele.id();

  //       return content;
  //     },
  //     trigger: 'manual' // probably want manual mode
  //   });
  // }

  // cy.ready(function() {
  //   cy.elements().forEach(function(ele) {
  //     makePopper(ele);
  //   });
  // });

  // cy.elements().unbind('mouseover');
  // cy.elements().bind('mouseover', (event) => event.target.tippy.show());

  // cy.elements().unbind('mouseout');
  // cy.elements().bind('mouseout', (event) => event.target.tippy.hide());

}

  async componentDidMount(){

    // cytoscape.use( popper );

    buildTerminal();
    const toJson = function(res){ return res.json(); }; 
    let clusterData = await window.bridge.invoke('compileData').then(cluster => {
        return cluster;
      });
    this.setState({ clusterData: clusterData });
    // console.log(clusterData);
    window.addEventListener("resize", this.renderCyto);
    this.renderCyto();
    
    // const cyDiv = getElementById("cy");
    // cyDiv.appendChild(div[id^='tippy']);

    return null;
  }

  render() {
    return (
      <div>
        <main>
          <div id="cy" style={{ height: "610px" }}></div>
        </main>
      </div>
    );
  }
}

export default Home;
