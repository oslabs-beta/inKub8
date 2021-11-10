import React, { Component } from "react";

class ServiceMetrics extends Component {
  render() {
    return (
      <div>
        <main>
          <iframe
            src="http://localhost:3000/d-solo/GzFw-UK7k/prometheus-overview?orgId=1&refresh=60s&from=1636390951732&to=1636394551732&panelId=2"
            width="100%"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/GzFw-UK7k/prometheus-overview?orgId=1&refresh=60s&from=1636390991235&to=1636394591235&panelId=10"
            width="100%"
            height="200"
            frameBorder="0"
          ></iframe>
          <iframe
            src="http://localhost:3000/d-solo/GzFw-UK7k/prometheus-overview?orgId=1&refresh=60s&from=1636391001900&to=1636394601900&panelId=4"
            width="100%"
            height="200"
            frameBorder="0"
          ></iframe>
          {/* <iframe
            src="http://localhost:3000/d-solo/GzFw-UK7k/prometheus-overview?orgId=1&refresh=60s&from=1636391011792&to=1636394611792&panelId=5"
            width="100%"
            height="200"
            frameBorder="0"
          ></iframe> */}
        </main>
      </div>
    );
  }
}

export default ServiceMetrics;