import { Layout } from 'components/Layout'
import { Button } from 'components/LinkButton'
import { downloadFile } from 'utils/downloadFile'

export const downloadDocuments = async (fileName: string) => {
  try {
    const res = await fetch(
      `/api/download?name=${encodeURIComponent(fileName)}`
    )
    const pdfBlob = await res.blob()
    downloadFile(pdfBlob, 'documents.zip')
  } catch (error) {
    console.error('Error al descargar el archivo PDF:', error)
  }
}

export default function confirmacionPage() {
  return (
    <Layout title="Seguro de gastos medicos mayores">
      <div className="container mx-auto flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold sm:text-[3rem] sm:leading-[3.5rem]">
          Gracias por contratar
        </h1>
        <p className="mb-4 text-base font-medium text-slate-500 sm:text-xl">
          Ahora puedes descargar tu contrato firmado.
        </p>
        <div>
          <Button
            onClick={async () => {
              await downloadDocuments('contract.pdf')
            }}
          >
            Descargar documentos
          </Button>
        </div>
      </div>
    </Layout>
  )
}
