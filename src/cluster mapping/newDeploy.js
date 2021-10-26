const { Container } = require('kubernetes-models/v1')
const { Deployment } = require ('kubernetes-models/apps/v1')
const k8s = require('@kubernetes/client-node')
const kc = new k8s.KubeConfig()

// Using the default credentials for kubectl
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
const appsV1API = kc.makeApiClient(k8s.AppsV1Api);


 const scale = async function(namespace, name) {

  const res = await appsV1API.readNamespacedDeployment('prometheus-grafana', 'default')
  .then(res => {
    let deployment = res.body
    
    let push_GF_SECURITY_ALLOW_EMBEDDING = true;
    let push_GF_AUTH_ANONYMOUS_ENABLED = true;
    let push_GF_AUTH_ANONYMOUS_ORG_ROLE = true;

    deployment.spec.template.spec.containers[1].env.forEach(obj => {
      if (obj.name === "GF_SECURITY_ALLOW_EMBEDDING") push_GF_SECURITY_ALLOW_EMBEDDING = false;
      if (obj.name === "GF_AUTH_ANONYMOUS_ENABLED") push_GF_AUTH_ANONYMOUS_ENABLED = false;
      if (obj.name === "GF_AUTH_ANONYMOUS_ORG_ROLE") push_GF_AUTH_ANONYMOUS_ORG_ROLE = false;
    })

    if (push_GF_SECURITY_ALLOW_EMBEDDING) deployment.spec.template.spec.containers[1].env.push(
      { 
          'name': 'GF_SECURITY_ALLOW_EMBEDDING',
          'value': 'true'
      }
    );
    if (push_GF_AUTH_ANONYMOUS_ENABLED) deployment.spec.template.spec.containers[1].env.push(
      { 
          'name': 'GF_AUTH_ANONYMOUS_ENABLED',
          'value': 'true'
      }
    );
    if (push_GF_AUTH_ANONYMOUS_ORG_ROLE) deployment.spec.template.spec.containers[1].env.push(
      { 
          'name': 'GF_AUTH_ANONYMOUS_ORG_ROLE',
          'value': 'Admin'
      }
    );

    appsV1API.replaceNamespacedDeployment('prometheus-grafana', 'default', deployment)
    .then(res => {
      console.log("new deployment:", res.body.spec.template.spec.containers[1].env);
    })
  })

  .catch(err => {
  });

};

module.exports = scale




// appsV1API.replaceNamespacedDeployment("prometheus-grafana", "default", deploymentV1)

// appsV1API.readNamespacedDeployment("prometheus-grafana", "default")
// .then(res => {
// 	// console.log("12421:", res.body)
// 	console.log("test:", res.body.spec.template.spec.containers[1].env);
// })
// .catch(err => {
// });



// const targetNamespaceName = 'default';
// const targetDeploymentName = 'deployment';
// const numberOfTargetReplicas = 1;

// async function scale(namespace, name, replicas) {
//   // find the particular deployment
//   const res = await appsV1API.readNamespacedDeployment("prometheus-grafana", "default");
//   let deployment = res.body;

//   // edit
//   deployment.spec.replicas = replicas;

//   // replace
//   await appsV1API.replaceNamespacedDeployment("prometheus-grafana", "default", "deployment");
// }

// scale(targetNamespaceName, targetDeploymentName, numberOfTargetReplicas);




// const scale = async function(namespace, name, replicas) {
//   // find the particular deployment

//     const res = await appsV1API.readNamespacedDeployment('prometheus-grafana', 'default')
//     .then(res => {
//       // console.log("12421:", res.body)
//       let deployment = res.body
//       deployment.spec.template.spec.containers[1].env.push({ 
//         'name': 'GF_SECURITY_ALLOW_EMBEDDING',
//         'value': 'true'
//       },
//         { 'name': 'GF_AUTH_ANONYMOUS_ENABLED',
//         'value': 'true'
//       },
//         { 'name': 'GF_AUTH_ANONYMOUS_ORG_ROLE',
//         'value': 'Admin'})
      
//       // console.log('modified deployment:', deployment)
//       appsV1API.replaceNamespacedDeployment('prometheus-grafana', 'default', deployment)
      
//     })

//     .catch(err => {
//     });

// };

// scale(targetNamespaceName, targetDeploymentName, numberOfTargetReplicas);



