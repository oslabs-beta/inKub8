import React, { Component } from 'react';

class Prom extends Component {

  render() {
    return (
      <div>
        <main>
          <h1>Prometheus</h1>

          <iframe
          
            width="50%"
            height="50%"
            src="http://localhost:9090/graph"
          ></iframe>
          
        </main>
      </div>
    );
  }
}

export default Prom;