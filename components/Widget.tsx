import { useCallback } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'

interface Props {
  pdfBase64: string
  widgetId: string
}

export const MifielWidget = ({ widgetId, pdfBase64 }: Props) => {
  const idContainer = 'sign-widget-container'
  const router = useRouter()

  const initMifielWidget = useCallback(() => {
    window.mifiel.widget({
      widgetId,
      pdf: pdfBase64,
      appendTo: idContainer,
      successBtnText: 'Continuar',
      onSuccess: {
        callToAction: async () => {
          router.push(`/confirmacion`)
        },
      },
      onError: {
        callToAction: () => {
          console.log('Ocurrió un error al firmar el documento')
        },
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetId, pdfBase64])

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIFIEL_APP_SNIPPET_URL}
        strategy="afterInteractive"
        onLoad={initMifielWidget}
      />
      <div id={idContainer} />
    </>
  )
}
