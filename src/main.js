const { app, BrowserWindow, session, ipcMain } = require("electron");
const path = require("path");
const {compileData} = require("./clusterMapping/retrieveData.js");
//const isDev = require("electron-is-dev");
const os = require("os");
const pty = require("node-pty");

// if someone is on windows utilize powershell and if not do bash
const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

const createWindow = () => {
	//Add a content security policy and remove x-frame-options so we can load iframes
	session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    
		if(details.responseHeaders["X-Frame-Options"]){
			delete details.responseHeaders["X-Frame-Options"];
		}

		callback({
			responseHeaders: {
				...details.responseHeaders,
				"Content-Security-Policy": ["default-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src https: 'self' 'unsafe-inline'; frame-src *; img-src file: data: http: https:;"]
			}
		});
	});

	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		minHeight: 1000, 
		maxWidth: 2000,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.resolve(MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY)
			//preload: path.resolve(__dirname, "..", "..", "src", "preload.js")
		},
		show: false
	});

	// load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);


	// Open the DevTools.
	mainWindow.maximize();
	mainWindow.show();
	//mainWindow.webContents.openDevTools();
 
	const ptyProcess = pty.spawn(shell, [], {
		name: "xterm-color", 
		cols: 80, 
		rows: 24, 
		cwd: process.env.HOME, 
		env: process.env},
	);
  
	ptyProcess.on("data", function(data){
		mainWindow.webContents.send("terminal.incData", data);
	});  

	ipcMain.on("terminal.toTerm", function(event, data) {
		ptyProcess.write(data);
		// mainWindow.webContents.send('terminal.incData', data);
	});
  
};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

//Gather cluster data
ipcMain.handle("compileData", async (event, arg) => {
	let cluster = await compileData();
	return cluster;
	//return compileData();
});

// app.on('certificate-error', function(event, webContents, url, error, 
//   certificate, callback) {
//       event.preventDefault();
//       callback(true);
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
