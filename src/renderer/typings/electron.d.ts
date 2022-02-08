/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  ipcRenderer: Electron.IpcRenderer,
}

declare global {
  interface Window {
    electron: ElectronApi,
  }
}
