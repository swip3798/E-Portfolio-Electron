const electron = require('electron');
const url = require('url');
const path = require('path');


const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({webPreferences: {nodeIntegration: true}});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    }));
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function addRound(){
    mainWindow.webContents.send('round:add');
}

const mainMenuTemplate = [
    {
        label: "File",
        submenu:[
            {
                label: "Add round",
                click(){
                    addRound();
                }
            },
            {
                label: "Quit",
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]