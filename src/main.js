const { app, BrowserWindow, session } = require('electron');
const path = require('path');

const isDev = require('electron-is-dev');

const createWindow = () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    
    if(details.responseHeaders['X-Frame-Options']){
      delete details.responseHeaders['X-Frame-Options'];
    };

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src *; img-src data: http: https:;"]
      }
    })
    console.log('here')
  })
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);


  // Open the DevTools.
  mainWindow.webContents.openDevTools();

};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.on('certificate-error', function(event, webContents, url, error, 
//   certificate, callback) {
//       event.preventDefault();
//       callback(true);
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
