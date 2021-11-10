import React, { Component } from "react";
import Tippy from '@tippyjs/react';
const StringContent = () => (
  <Tippy content="Hello">
    <button>My button</button>
  </Tippy>
);

class DisplayMetrics extends Component {
  render() {
    return (
      <div>
        <main>
          <iframe src="http://127.0.0.1:3000/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=10s&from=1636582619608&to=1636586219608&panelId=7" 
          width="100%" 
          height="200" 
          frameBorder="0">
          </iframe>
          <iframe
            src="http://localhost:3000/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=10s&from=1636040392525&to=1636043992525&panelId=9"
            width="100%"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=10s&from=1636069163080&to=1636072763080&panelId=16"
            width="100%"
            height="200"
            frameBorder="0"
          ></iframe>
         


          {/* <iframe
            src="http://localhost:3000/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=10s&from=1636069175351&to=1636072775351&panelId=18"
            width="100%"
            height="200"
            frameBorder="0"
          ></iframe> */}
        </main>
      </div>
    );
  }
}

export default DisplayMetrics;
