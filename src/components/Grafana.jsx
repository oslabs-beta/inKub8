import React, { Component } from 'react';

class Grafana extends Component {
  render() {
    return (
      <div>
        <main>
          <h1>Grafana</h1>

          <iframe
            width="100%"
            height="100%"
            name={"disable-x-frame-options"}
            src={"http://127.0.0.1:3000"}
          ></iframe>
          
        </main>
      </div>
    );
  }
}

// class Grafana extends Component {
//   render() {
//     return <iframe src="https://www.youtube.com/embed/cWDJoK8zw58" />;
//   }
// }

export default Grafana;

// class ClusterDashboard extends React.Component {
//   render() {
//       //suppose user is received from props
//       const { user } = this.props
//       return (

//             <iframe
//             width="97%"
//             height="1150px"
//             src={"http://localhost:3000/goto/tJaUhdH7z?orgId=1"}
//             />
//       )
//   }
// }
// export default ClusterDashboard;