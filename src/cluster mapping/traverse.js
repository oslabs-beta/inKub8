const fs = require("fs");
const cluster = JSON.parse(fs.readFileSync("./cluster.json"));

const uids = {};
function traverse(data, stringLocation, location){
    try {
        if(data == "prometheus-grafana"){
            //console.log('found', location)
        }
    }catch{}
	if(Array.isArray(data) || typeof data == "object"){
		for(const kindex in data){
			if(kindex == "uid"){
				uids[data[kindex]] = null;
			}

            listOwners(data, location);
			if(!isNaN(parseInt(kindex))){
				traverse(data[kindex], stringLocation + `[${kindex}]`, location + `.${kindex}`);
			}else{
				traverse(data[kindex], stringLocation + `.${kindex}`, location + `.${kindex}`);
			}
		}
	}
}

function listOwners(data, location){
    if(location.includes("ownerReferences.0")){
        console.log(location)
    }
}
traverse(cluster, "cluster", "cluster")