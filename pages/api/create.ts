/* eslint-disable react-hooks/rules-of-hooks */
import type { NextApiRequest, NextApiResponse } from 'next'
import { Config } from '@mifiel/api-client-auth'
import { Document } from '@mifiel/api-client'
import { createPdf } from 'utils/pdfs'
import { uploadToBucket } from 'utils/files'

type Data = {
  ok: boolean
  message: string
  data?: TCreateDocument
}

const isProduction = process.env.MIFIEL_ENVIRONMENT === 'production'

Config.setTokens({
  appId: process.env.MIFIEL_APP_ID,
  appSecret: process.env.MIFIEL_APP_SECRET,
  env: 'sandbox',
})

if (!isProduction) Config.useSandbox()
else Config.useProduction()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      const { pdfBase64, widgetId } = await createDocument()
      res.status(201).json({
        ok: true,
        message: 'Documento creado',
        data: { pdfBase64, widgetId },
      })
      break
    default:
      res.status(405).json({ ok: false, message: 'Método no permitido' })
      break
  }
}

type TCreateDocument = {
  pdfBase64: string
  widgetId: string
}

export async function createDocument(): Promise<TCreateDocument> {
  const fileName = 'contract.pdf'
  const pdfBytes = await createPdf()
  const pdfBase64 = Buffer.from(pdfBytes).toString('base64')

  await uploadToBucket(fileName, pdfBytes)

  const hash = await Document.getHash(pdfBytes)

  const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL

  const createDocument = await Document.create({
    original_hash: hash,
    name: fileName,
    signatories: [
      {
        name: 'Haziel Castillo',
        email: 'hajocava@gmail.com',
      },
    ],
    callback_url: `${domainURL}/api/document`,
    sign_callback_url: `${domainURL}/api/sign`,
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const widgetId = createDocument.signers![0].widget_id as string

  return {
    pdfBase64,
    widgetId,
  }
}
