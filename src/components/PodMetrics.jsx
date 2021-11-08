import React, { Component } from "react";

class PodMetrics extends Component {
  render() {
    return (
      <div>
        <main>
          <iframe
            src="http://localhost:3000/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&from=1636068554083&to=1636072154083&panelId=5"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&from=1636068569378&to=1636072169378&panelId=7"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&from=1636388084899&to=1636391684899&panelId=12"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&from=1636388098516&to=1636391698516&panelId=14"
            width="350"
            height="200"
            frameBorder="0"
          ></iframe>
        </main>
      </div>
    );
  }
}

export default PodMetrics;