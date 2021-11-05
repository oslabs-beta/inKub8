import React, { Component } from "react";

class DisplayMetrics extends Component {
  render() {
    return (
      <div>
        <main>
          <iframe
            src="http://localhost:3000/d-solo/Ls9K11Knz/kubernetes-compute-resources-cluster-copy?orgId=1&var-datasource=default&var-cluster=&from=1635812292332&to=1635815892332&panelId=7"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/Ls9K11Knz/kubernetes-compute-resources-cluster-copy?orgId=1&from=1635812389634&to=1635815989634&panelId=9"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
        </main>
      </div>
    );
  }
}

export default DisplayMetrics;
