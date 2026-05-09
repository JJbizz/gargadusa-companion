const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference to prevent garbage collection
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: 'Gargadusa Companion',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    backgroundColor: '#121212',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    show: false, // show only after ready-to-show
  });

  mainWindow.loadFile('app.html');

  // Show the window once fully loaded to avoid white flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  buildMenu();
}

function buildMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    // App menu (macOS only)
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about', label: 'About Gargadusa Companion' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),

    {
      label: 'File',
      submenu: [
        {
          label: 'Import Save File…',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              title: 'Import Save File',
              filters: [
                { name: 'Save Files', extensions: ['json', 'sav', 'txt'] },
                { name: 'All Files', extensions: ['*'] },
              ],
              properties: ['openFile'],
            });
            if (!result.canceled && result.filePaths.length > 0) {
              const filePath = result.filePaths[0];
              try {
                const data = fs.readFileSync(filePath, 'utf-8');
                mainWindow.webContents.send('file-opened', { path: filePath, data });
              } catch (err) {
                dialog.showErrorBox('Error reading file', err.message);
              }
            }
          },
        },
        {
          label: 'Export Save File…',
          accelerator: 'CmdOrCtrl+S',
          click: async () => {
            mainWindow.webContents.send('request-export');
          },
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit', label: 'Exit' },
      ],
    },

    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },

    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: 'Developer Tools' },
      ],
    },

    {
      label: 'Help',
      submenu: [
        {
          label: 'About Gargadusa Companion',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Gargadusa Companion',
              icon: path.join(__dirname, 'assets', 'icon.png'),
              message: 'Gargadusa Companion',
              detail:
                `Version: 1.0.0\n` +
                `Guild Synergy Optimizer & Save Editor\n\n` +
                `Built with Electron ${process.versions.electron}\n` +
                `Node.js ${process.versions.node}\n` +
                `Chromium ${process.versions.chrome}`,
              buttons: ['OK'],
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC: open a native folder picker and return the chosen path
ipcMain.handle('pick-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select Save Folder',
    properties: ['openDirectory', 'createDirectory'],
  });
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// IPC: write a file directly to a folder path (used by "Set Save Folder" export)
ipcMain.handle('write-file', async (_event, { folderPath, filename, content }) => {
  try {
    const filePath = path.join(folderPath, filename);
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true, path: filePath };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// IPC: handle save-file export triggered from renderer
ipcMain.handle('save-file-dialog', async (_event, { defaultName, data }) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Export Save File',
    defaultPath: defaultName || 'gargadusa_save.json',
    filters: [
      { name: 'JSON Save Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });

  if (!result.canceled && result.filePath) {
    fs.writeFileSync(result.filePath, data, 'utf-8');
    return { success: true, path: result.filePath };
  }
  return { success: false };
});

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window if dock icon clicked with no windows open
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
