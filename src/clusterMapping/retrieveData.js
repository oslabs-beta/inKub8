const {getAllObjects} = require("./scrapeCluster.js");
console.log(getAllObjects, "AAAAAAAAAAAAAAAAAAAAA");
//Timestamp, Name, uid, #  of containers, status: phase, hostIP, podIP, owerReference Kind, ownerReference uid

function traverse(searchType, data, uid, returnVal, location = "cluster"){
	try{
		if(searchType == "ownerObject"){
			if(data.metadata.uid === uid){
				const objectType = location.split(".")[1];
				returnVal = {type: objectType, output: data};
			}
		}else if(searchType == "childObjects"){
			returnVal = [];
			data.metadata.ownerReferences.forEach(owner => {
				if(owner.uid == uid){
					const objectType = location.split(".")[1];
					returnVal.push({type: objectType, output: data});
				}
			});
		}else if(searchType == "endpointslices"){
			data.endpoints.forEach(endpoint => {
				if(endpoint.targetRef.uid == uid){
					returnVal = {type: "endpointslices", output: data};
				}
			});
		}
	}catch(err){}
	if(Array.isArray(data) || typeof data == "object"){
		for(const kindex in data){
			const temp = traverse(searchType, data[kindex], uid, returnVal, location + `.${kindex}`);
			temp ? returnVal = temp : false;
		}
	}
	return returnVal;
}

function getData(data, objectTypes, requestedData){
	//iterate over each instance of the given objectTypes asynchronously.
	//We do it in a way where we process multiple objectTypes at the same time

	//Return a Promise that resolves with returnedData, once all objects we requested to process were added to returnedData
	return new Promise((topResolve) => {
		const returnedData = {};
		//outerPromises will become an array of promises, one for each object type.
		const outerPromises = objectTypes.map(objectType => {
			//innerPromises becomes an array of promises, each of which resolves after all the objects have been added to returnedData
			const innerPromises = data[objectType].map(currentObj => {
				return new Promise((resolve) => {
					const nodeObjects = getObjData(data, currentObj, requestedData, objectType);
					//Add our data into returnedData array in a format accepted by cytograph

					for(let i = 0; i < nodeObjects.length; i++){
						try{
							const object = nodeObjects[i];
							returnedData[object.data.id] = object;
						}catch(err){}
					}
					resolve();
				});
			});
			//Return a single promise that resolves once all the promises inside of innerPromises are resolved
			return Promise.all(innerPromises);
		});
		//Once all of our promises resolve and everything was added to returnedData, resolve the promise our getData function returned
		Promise.all(outerPromises).then(values => {
			topResolve(returnedData);
		});
	});
}

function getObjData(data, obj, requestedData, type) {
	let nodeObjects = [];
	//retrieve data at requested endpoints, add returned data into objectData in format {requestedData value (ex: metadata.name): data}
	const objectData = {};
	if (Array.isArray(requestedData)) {
		requestedData.forEach((el) => {
			let currentLevel = obj;
			el.split(".").forEach((selector) => {
				currentLevel = currentLevel[selector];
			});
			objectData[el] = currentLevel;
		});
	}

	nodeObjects.push({
		"data": {id: obj.metadata.uid, "name": obj.metadata.name, "creationTimestamp": obj.metadata.creationTimestamp, "moreInfo": objectData, "type": setType(type)},
		"group": "nodes",
	});

	if(Array.isArray(obj.metadata.ownerReferences)){
		if(!obj.metadata.ownerReferences){
			console.log(obj);
		}
		obj.metadata.ownerReferences.forEach(owner => {
			nodeObjects.push({
				"data": {id: `${obj.metadata.uid}--${owner.uid}`, target: obj.metadata.uid, source: owner.uid},
				"group": "edges",
			});
			let ownerKind = owner.kind.toLowerCase();
			ownerKind = ownerKind[ownerKind.length - 1] == "s" ? ownerKind + "es" : ownerKind + "s";
			const {output, type} = traverse("ownerObject", data[ownerKind], owner.uid, null, `cluster.${ownerKind}`);
			nodeObjects = nodeObjects.concat(getObjData(data, output, null, type));
		});
	}

	if(type == "services"){
		//UNTESTED

		//Find the endpointSlice connected to the service. The endpointSlice tells us which object this service targets
		const children = traverse("childObjects", data.endpointslices, obj.metadata.uid, null, "cluster.endpointslices");
		//console.log(output);
		//If the endpointSlice has endpoints
		children.forEach(child => {
			if(child.endpoints){
				child.endpoints.forEach(endpoint => {
					nodeObjects.push({
						"data": {id: `${obj.metadata.uid}--${endpoint.targetRef.uid}`, target: endpoint.targetRef.uid, source: obj.metadata.uid},
						"group": "edges",
					});
					//Find the targeted node and add it to our nodeObjects in case it's not already there.
					let endpointKind = endpoint.targetRef.kind.toLowerCase();
					endpointKind = endpointKind[endpointKind.length - 1] == "s" ? endpointKind + "es" : endpointKind + "s";
					const {output, type} = traverse("ownerObject", data[endpointKind], endpoint.targetRef.uid, null, `cluster.${endpointKind}`);
					if(output == null){
						console.log(endpoint);
					}
					nodeObjects = nodeObjects.concat(getObjData(output, null, type));
				});
			}
		});
	}
	return nodeObjects;
}

function setType(objectType){
	switch(objectType){
	case "pods":
		return "ellipse";
		break;
	case "deployments":
		return "hexagon";
		break;
	case "replicasets":
		return "triangle";
		break;
	case "statefulsets":
		return "pentagon";
		break;
	case "alertmanagers":
		return "rectangle";
		break;
	case "daemonsets":
		return "diamond";
		break;
	case "configmaps":
		return "rhomboid";
		break;
	case "rulesets":
		return "star";
		break;
	default:
		return "vee";
	}
}

//input: a string with words separated by dashes; the maximum number of characters desired on a line
//output: the input string with \n characters added after some dashes so each line of text does not exeed maxLength, if possible

async function compileData(options){
	const cluster = await getAllObjects();
	const dataObj = await getData(cluster, ["pods", "services"], ["status.hostIP"]);
	console.log(dataObj);
	const dataArr = [];
	for (const key in dataObj) {
		dataArr.push(dataObj[key]);
	}
	return dataArr;
}

export {compileData};