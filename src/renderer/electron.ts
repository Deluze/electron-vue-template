/*
   Add all your exposed Electron API's here.
   The purpose of this is to get static analysis in Vue files without additional plug-ins.
 */
import { IpcRenderer } from 'electron'

const ipcRenderer = window.electron.ipcRenderer as IpcRenderer

export {
  ipcRenderer,
}
