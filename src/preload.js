const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('shit', {
  send: (channel, data) => {
    let validChannels = ['compileData'] // <-- Array of all ipcRenderer Channels used in the client
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    let validChannels = ['compileData'] // <-- Array of all ipcMain Channels used in the electron
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  }
})