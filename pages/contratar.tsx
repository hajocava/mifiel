import { GetServerSideProps } from 'next'
import { Layout } from 'components/Layout'
import { MifielWidget } from 'components/Widget'
import { createDocument } from './api/create'

interface Props {
  pdfBase64: string
  widgetId: string
}

export default function contratarPage({ pdfBase64, widgetId }: Props) {
  return (
    <Layout title="Credits">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Preparate para firmar</h1>
        <div className="mt-8">
          <MifielWidget pdfBase64={pdfBase64} widgetId={widgetId} />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { pdfBase64, widgetId } = await createDocument()

  return {
    props: {
      pdfBase64,
      widgetId,
    },
  }
}
