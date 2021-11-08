const {getAllObjects} = require("./scrapeCluster.js");
//Timestamp, Name, uid, #  of containers, status: phase, hostIP, podIP, owerReference Kind, ownerReference uid

//Used to traverse our cluster and find certain objects
function traverse(searchType, data, uid, returnVal, location = "cluster"){
    //Wrap our tests in a try catch because the fields we check often don't exist
	try{
        //Define different searchType's. We do this because depending on what we are looking for we need to check different fields
		if(searchType == "ownerObject"){
            //If the objects metadata.uid field matches the uid we are searching for, return the object
            //Good for finding any object provided it's UID. Often used to find an object's owners hence the name.
			if(data.metadata.uid === uid){
				const objectType = location.split(".")[1];
				returnVal = {type: objectType, output: data};
			}
		}else if(searchType == "childObjects"){
            if(!Array.isArray(returnVal)){
                returnVal = [];
            }
            //If any of the object's ownerReferences.uid field match the uid we are searching for, add the object to our returnVal's
            //We return an array here because an object can have multiple children
			data.metadata.ownerReferences.forEach(owner => {
				if(owner.uid == uid){
					const objectType = location.split(".")[1];
					returnVal.push({type: objectType, output: data});
				}
			});
		}
	}catch(err){}
    //Recursively moves through the entire object.
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
	//We do it this way for performance reasons. If we need to scrape multiple objectTypes, better to do it at the same time rather than wait for one to finish first.

	//Return a Promise that resolves with returnedData, once all objects we requested to process were added to returnedData
	return new Promise((topResolve) => {
		const returnedData = {};
        //We turn our array of objectTypes and the array's of those object's into array's of promises.
        //Once all these promises resolve, our function resolves with the data.
		const outerPromises = objectTypes.map(objectType => {
			const innerPromises = data[objectType].map(currentObj => {
				return new Promise((resolve) => {
					const nodeObjects = getObjData(data, currentObj, requestedData, objectType);

					for(let i = 0; i < nodeObjects.length; i++){
						try{
							const object = nodeObjects[i];
							returnedData[object.data.id] = object;
						}catch(err){}
					}
					resolve();
				});
			});
			return Promise.all(innerPromises);
		});
		Promise.all(outerPromises).then(values => {
			topResolve(returnedData);
		});
	});
}

function getObjData(data, obj, requestedData, type) {
	let nodeObjects = [];
	const objectData = {};
    //Retrieve the requestedData field's to be added into moreInfo on line 87.
	if (Array.isArray(requestedData)) {
        //For each requestedData type
		requestedData.forEach((el) => {
            //Navigate through our object into the requested field and add it to objectData
			let currentLevel = obj;
			el.split(".").forEach((selector) => {
				currentLevel = currentLevel[selector];
			});
			objectData[el] = currentLevel;
		});
	}

    //Here we're pushing the object in cytoscapes requested format.
	nodeObjects.push({
		"data": {id: obj.metadata.uid, "name": obj.metadata.name, "creationTimestamp": obj.metadata.creationTimestamp, "moreInfo": objectData, "type": setType(type)},
		"group": "nodes",
	});

    //Loop through each of the objects owner's and recursively call this function on them.
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

    //We need to handle services a bit differently, because they point to other object's by using endpointslices
	if(type == "services"){
		//UNTESTED

		//Find the endpointSlice(s) connected to the service. The endpointSlice tells us which object this service targets
		const children = traverse("childObjects", data.endpointslices, obj.metadata.uid, null, "cluster.endpointslices");

        //Add the cytoscape connection from our service to the targeted object, and then add the targeted object to our nodeObject's in case it doesn't already exist.
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

//Function for setting the appropriate shape / icon respective to the object's type.
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

//Copile all the data using the functions we defined above.
async function compileData(options){
	const cluster = await getAllObjects();
	const dataObj = await getData(cluster, ["pods", "services"], ["status.hostIP"]);
	const dataArr = [];
	for (const key in dataObj) {
		dataArr.push(dataObj[key]);
	}
	return dataArr;
}

export {compileData};