const {contextBridge, ipcRenderer} = require("electron");

//Expose ipcRenderer to the client
contextBridge.exposeInMainWorld("bridge", {
	send: (channel, data) => {
		const validChannels = ["compileData", "terminal.toTerm"]; //<-- Array of all ipcRenderer Channels used in the client
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	receive: (channel, func) => {
		const validChannels = ["compileData", "terminal.incData"]; //<-- Array of all ipcMain Channels used in the electron
		if (validChannels.includes(channel)) {
			//Deliberately strip event as it includes `sender`
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
	invoke: (channel) => {
		const validChannels = ["compileData"];
		if(validChannels.includes(channel)) {
			return ipcRenderer.invoke(channel);
		}
	},
});