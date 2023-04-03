export {}

declare global {
  interface Window {
    mifiel: {
      widget: (config: TConfig) => void
    }
  }
}

type TConfig = {
  pdf?: string
  widgetId: string
  appendTo: string
  successBtnText: string
  onSuccess: {
    callToAction: () => void
  }
  onError: {
    callToAction: () => void
  }
}
