import React, { Component } from 'react';

class Grafana extends Component {
  render() {
    return (
      <div>
        <main>

          <iframe
            width="100%"
            height="1000 px"
            name={"disable-x-frame-options"}
            src={"http://127.0.0.1:3000/?orgId=1"}
          ></iframe>
          
        </main>
      </div>
    );
  }
}


export default Grafana;

// export default ClusterDashboard;