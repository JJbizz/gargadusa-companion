const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose a safe, minimal API to the renderer (app.html).
 * No direct Node/Electron APIs are exposed — only named methods.
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Called by the renderer to save a file via the native dialog.
   * @param {string} defaultName  - Suggested filename
   * @param {string} data         - String content to write
   * @returns {Promise<{success: boolean, path?: string}>}
   */
  saveFile: (defaultName, data) =>
    ipcRenderer.invoke('save-file-dialog', { defaultName, data }),

  /**
   * Register a listener for when the main process opens a file
   * (via File → Import Save File menu item).
   * @param {function} callback - Receives { path, data }
   */
  onFileOpened: (callback) => {
    ipcRenderer.on('file-opened', (_event, payload) => callback(payload));
  },

  /**
   * Register a listener for when the main process requests an export
   * (via File → Export Save File menu item).
   * The renderer should respond by calling saveFile() with the current data.
   * @param {function} callback
   */
  onRequestExport: (callback) => {
    ipcRenderer.on('request-export', () => callback());
  },

  /**
   * Open a native folder-picker dialog and return the selected path string,
   * or null if the user cancelled.
   * @returns {Promise<string|null>}
   */
  pickFolder: () => ipcRenderer.invoke('pick-folder'),

  /**
   * Write a file directly into a folder that was previously chosen with pickFolder.
   * @param {string} folderPath  - Absolute folder path returned by pickFolder
   * @param {string} filename    - Filename to create / overwrite inside that folder
   * @param {string} content     - UTF-8 text content
   * @returns {Promise<{success: boolean, path?: string, error?: string}>}
   */
  writeFile: (folderPath, filename, content) =>
    ipcRenderer.invoke('write-file', { folderPath, filename, content }),

  /**
   * Remove all listeners for a given channel (cleanup helper).
   * @param {string} channel
   */
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
});
