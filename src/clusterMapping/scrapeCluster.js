const k8s = require("@kubernetes/client-node");
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const coreAPI = kc.makeApiClient(k8s.CoreV1Api);
const apisAPI = kc.makeApiClient(k8s.ApisApi);
const customObjectsAPI = kc.makeApiClient(k8s.CustomObjectsApi);
const appsV1API = kc.makeApiClient(k8s.AppsV1Api);
//const removeGrafLogin = require('./remGrafLogin.js')


//removeGrafLogin('default', 'prometheus-grafana');


function getAllOtherObjects(namespace){
	return new Promise((resolve, reject) => {
		let desiredCount = 0;
		let count = 0;
		const objects = {};
		apisAPI.getAPIVersions().then(res => {
			const apis = res.body.groups;
			for(let i = 0; i < apis.length; i++){
				getResources(apis[i]);
			}
		});

		function getResources(api){
			if(api.preferredVersion.version == "v1"){
				customObjectsAPI.listClusterCustomObject(api.name, "v1", "")
					.then(res => {
						getObjects(res.body.resources, api.name);
					})
					.catch(err => {
					});
			}
		}

		function getObjects(resources, apiName){
			for(let i = 0; i < resources.length; i++){
				const resource = resources[i];
				if(!resource.name.includes("/")){
					desiredCount++;
					customObjectsAPI.listNamespacedCustomObject(apiName, "v1", namespace, resource.name).then(res => {
						objects[resource.name] = res.body.items;
						count++;
					})
						.catch(err => {
							count++;
						});
				}
			}
		}

		const interval = setInterval(() => {
			if(count == desiredCount){
				resolve(objects);
				clearInterval(interval);
			}
		}, 250);
	});
}

function getAllCoreObjects(namespace){
	return new Promise((resolve, reject) => {
		const objects = {};
		let count = 0;
		coreAPI.listNamespacedConfigMap(namespace).then(res => {
			objects.configmaps = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedEndpoints(namespace).then(res => {
			objects.endpoints = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedEvent(namespace).then(res => {
			objects.events = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedLimitRange(namespace).then(res => {
			objects.limitranges = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedPersistentVolumeClaim(namespace).then(res => {
			objects.persistentvolumeclaims = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedPod(namespace).then(res => {
			objects.pods = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedPodTemplate(namespace).then(res => {
			objects.podtemplates = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedReplicationController(namespace).then(res => {
			objects.replicationcontrollers = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedResourceQuota(namespace).then(res => {
			objects.resourcequotas = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedSecret(namespace).then(res => {
			objects.secrets = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedService(namespace).then(res => {
			objects.services = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNamespacedServiceAccount(namespace).then(res => {
			objects.serviceaccounts = res.body.items;
			count++;
		}).catch(() => count++);
		coreAPI.listNode().then(res => {
			objects.nodes = res.body.items;
			count++;
		}).catch(() => count++);
		const interval = setInterval(() => {
			if(count == 13){
				resolve(objects);
				clearInterval(interval);
			}
		}, 250);
	});
}

async function getAllObjects(){
	const coreObjects = await getAllCoreObjects("default");
	const otherObjects = await getAllOtherObjects("default");
	const allObjects = Object.assign(coreObjects, otherObjects);
	return allObjects;
}


export {getAllObjects};