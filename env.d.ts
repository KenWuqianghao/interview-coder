/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Remove Supabase environment variables
  readonly VITE_OPEN_AI_API_KEY: string
  // API Keys
  readonly VITE_GEMINI_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Extend the Window interface
interface Window {
  __CREDITS__: number
  __LANGUAGE__: string
  __IS_INITIALIZED__: boolean
  electronAPI: {
    // Remove subscription portal
    updateContentDimensions: (dimensions: {
      width: number
      height: number
    }) => Promise<void>
    clearStore: () => Promise<{ success: boolean; error?: string }>
    getScreenshots: () => Promise<any[]>
    deleteScreenshot: (
      path: string
    ) => Promise<{ success: boolean; error?: string }>
    onScreenshotTaken: (
      callback: (data: { path: string; preview: string }) => void
    ) => () => void
    onResetView: (callback: () => void) => () => void
    onSolutionStart: (callback: () => void) => () => void
    onDebugStart: (callback: () => void) => () => void
    onDebugSuccess: (callback: (data: any) => void) => () => void
    onSolutionError: (callback: (error: string) => void) => () => void
    onProcessingNoScreenshots: (callback: () => void) => () => void
    onProblemExtracted: (callback: (data: any) => void) => () => void
    onSolutionSuccess: (callback: (data: any) => void) => () => void
    onUnauthorized: (callback: () => void) => () => void
    onDebugError: (callback: (error: string) => void) => () => void
    openExternal: (url: string) => void
    toggleMainWindow: () => Promise<{ success: boolean; error?: string }>
    triggerScreenshot: () => Promise<{ success: boolean; error?: string }>
    triggerProcessScreenshots: () => Promise<{
      success: boolean
      error?: string
    }>
    triggerReset: () => Promise<{ success: boolean; error?: string }>
    triggerMoveLeft: () => Promise<{ success: boolean; error?: string }>
    triggerMoveRight: () => Promise<{ success: boolean; error?: string }>
    triggerMoveUp: () => Promise<{ success: boolean; error?: string }>
    triggerMoveDown: () => Promise<{ success: boolean; error?: string }>
    // Remove subscription callbacks
    startUpdate: () => Promise<{ success: boolean; error?: string }>
    installUpdate: () => void
    onUpdateAvailable: (callback: (info: any) => void) => () => void
    decrementCredits: () => Promise<void>
    onCreditsUpdated: (callback: (credits: number) => void) => () => void
    onOutOfCredits: (callback: () => void) => () => void
    getPlatform: () => string
  }
  electron?: {
    ipcRenderer: {
      on: (channel: string, func: (...args: any[]) => void) => void
      removeListener: (channel: string, func: (...args: any[]) => void) => void
    }
  }
}
