import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (channel:string, message:string) => ipcRenderer.send(channel, message)
})
