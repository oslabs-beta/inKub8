
const {getAllObjects} = require('./scrapeCluster.js')
//Timestamp, Name, uid, #  of containers, status: phase, hostIP, podIP, owerReference Kind, ownerReference uid

function traverse(data, uid, returnVal, location = 'cluster'){
  try{
    if(data.metadata.uid === uid){
      const objectType = location.split('.')[1]
      returnVal = {type: objectType, output: data};
    }
  }catch(err){};
	if(Array.isArray(data) || typeof data == "object"){
	  for(const kindex in data){
        let temp = traverse(data[kindex], uid, returnVal, location + `.${kindex}`)
        temp ? returnVal = temp : false
    }
	}
  return returnVal;
}

function getData(data, objectType, requestedData){
  const returnedData = {};
  // iterate over each instance of the given objectType
  for(let i = 0; i < data[objectType].length; i++){
    let currentObj = data[objectType][i];
    let nodeObjects = getObjData(data, currentObj, requestedData, objectType);
    //Add our data into returnedData array in a format accepted by cytograph
    nodeObjects.forEach(object => {
      try{

        returnedData[object.data.id] = object;
      }catch(err){};
    })
  }
  return returnedData;
}

function getObjData(data, obj, requestedData, type) {
  let nodeObjects = [];
  // retrieve data at requested endpoints, add returned data into objectData in format {requestedData value (ex: metadata.name): data}
  const objectData = {};
  if (Array.isArray(requestedData)) {
    requestedData.forEach((el) => {
      let currentLevel = obj;
      el.split('.').forEach( (selector) => {
        currentLevel = currentLevel[selector];
      });
      objectData[el] = currentLevel; 
    });
  }
  

  nodeObjects.push({
    "data": {id: obj.metadata.uid, "name": obj.metadata.name, "creationTimestamp": obj.metadata.creationTimestamp, "moreInfo": objectData, "type": setType(type)},
    "group": "nodes",
  })

  if(obj.metadata.hasOwnProperty("ownerReferences")){
    obj.metadata.ownerReferences.forEach(owner => {
      nodeObjects.push({
        "data": {id: `${obj.metadata.uid}--${owner.uid}`, target: obj.metadata.uid, source: owner.uid},
        "group": "edges"
      });
      let {output, type} = traverse(data, owner.uid);
      nodeObjects = nodeObjects.concat(getObjData(data, output, null, type));
    });
  }

  /*if(type == "services"){
    //UNTESTED

    //Find the endpointSlice connected to the service. The endpointSlice tells us which object this service targets
    const {endpointSlice, type} = traverse(cluster.endpointslices, obj.metadata.uid);
    console.log(endpointSlice);
    //If the endpointSlice has endpoints
    if(endpointSlice.endpoints){
      endpointSlice.endpoints.forEach(endpoint => {
        //Add a connection from our service node to the node targeted by our service
        nodeObjects.push({
          "data": {id: `${obj.metadata.uid}--${endpoint.targetRef.uid}`, target: endpoint.targetRef.uid, source: obj.metadata.uid},
          "group": "edges"
        });
        //Find the targeted node and add it to our nodeObjects in case it's not already there.
        let objectTypeToFind = endpoint.targetRef.kind.toLowerCase() + 's';
        console.log(objectTypeToFind);
        let {output, type} = traverse(cluster[objectTypeToFind], endpoint.targetRef.uid);
        nodeObjects = nodeObjects.concat(getObjData(output, null, type));
      });
    };
  };*/
  return nodeObjects;
}

function setType(objectType){
  switch(objectType){
    case "pods":
      return "ellipse";
      break
    case "deployments":
      return "hexagon";
      break
    case "replicasets":
      return "triangle";
      break
    case "statefulsets":
      return "pentagon";
      break
    case "alertmanagers":
      return "rectangle";
      break
    case "daemonsets":
      return "diamond";
      break
    case "configmaps":
      return "rhomboid";
      break
    case "rulesets":
      return "star";
      break
    default:
      return "vee";
  }
}

//input: a string with words separated by dashes; the maximum number of characters desired on a line
//output: the input string with \n characters added after some dashes so each line of text does not exeed maxLength, if possible
function addLineBreaks(string, maxLength) {

}

async function compileData(options){
	const cluster = await getAllObjects();
	const dataObj = getData(cluster, "pods", ["status.hostIP"]);
	const dataArr = [];
	for (const key in dataObj) {
		dataArr.push(dataObj[key]);
	}   
	return dataArr;
}

module.exports = {compileData};