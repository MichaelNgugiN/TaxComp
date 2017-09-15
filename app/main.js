const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron')

let mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow(
    {width: 400, height: 300}
  );
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});

ipcMain.on('open-window', (event, arg) => {
console.log("Yada Yada " + arg);

event.sender.send('open-window-response','pong')

})
