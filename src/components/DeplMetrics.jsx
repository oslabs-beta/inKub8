import React, { Component } from "react";

class DeplMetrics extends Component {
  render() {
    return (
      <div>
        <main>
          <iframe
            src="http://localhost:3000/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&from=1636390785303&to=1636394385303&panelId=1"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&from=1636390802323&to=1636394402323&panelId=3"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&from=1636390814329&to=1636394414329&panelId=10"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&from=1636390822177&to=1636394422177&panelId=12"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
        </main>
      </div>
    );
  }
}

export default DeplMetrics;