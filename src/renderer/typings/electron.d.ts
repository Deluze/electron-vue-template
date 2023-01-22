/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (channel:string ,message: string) => void
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
  }
}
