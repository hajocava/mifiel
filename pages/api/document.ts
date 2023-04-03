/* eslint-disable react-hooks/rules-of-hooks */
import type { NextApiRequest, NextApiResponse } from 'next'
import { Document } from '@mifiel/api-client'
import { Config } from '@mifiel/api-client-auth'
import xml2js from 'xml2js'
import { mergePdfs } from 'utils/pdfs'
import { downloadFromBucket, uploadToBucket } from 'utils/files'

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
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await addSignatureSheetToOriginalFile(req.body.name, req.body.id)
      await embedPdfInXmlFileTag(req.body.name, req.body.id)
      res.status(200).json({ message: 'Ok' })
      break
    default:
      res.status(405).json({ error: 'Método no permitido' })
  }
}

async function addSignatureSheetToOriginalFile(
  fileName: string,
  documentId: string
) {
  try {
    // Cargar el archivo PDF original
    const originalPdfBytes = await downloadFromBucket(fileName)

    const signSheetPdfBytes = await Document.getFile({
      type: 'file_signed',
      documentId,
    })

    // Convertir el archivo PDF a un buffer
    const signSheetPdfBuffer = Buffer.from(signSheetPdfBytes)

    // Fusionar el archivo PDF original con el archivo PDF de la hoja de firma
    const pdfBytes = await mergePdfs(originalPdfBytes, signSheetPdfBuffer)

    // Guardar el archivo PDF firmado en el servidor
    await uploadToBucket(
      `${fileName.replaceAll('.pdf', '')}_signed.pdf`,
      pdfBytes
    )
  } catch (error) {
    console.error(error)
  }
}

async function embedPdfInXmlFileTag(fileName: string, documentId: string) {
  try {
    // Remover la extensión .pdf del nombre del archivo
    fileName = fileName.replaceAll('.pdf', '')

    // Cargar el archivo PDF original desde el servidor
    const pdfSignBytes = await downloadFromBucket(`${fileName}_signed.pdf`)

    // Convertir el archivo PDF a un buffer y convertirlo a base64
    const pdfSignBase64 = Buffer.from(pdfSignBytes).toString('base64')

    // Obtener el XML de la hoja de firma
    const signSheetXml = await Document.getFile({
      type: 'xml',
      documentId,
    })

    // Convertir el archivo XML a un buffer
    const signSheetXmlBuffer = Buffer.from(signSheetXml)

    const parser = new xml2js.Parser()
    const builder = new xml2js.Builder()

    const parsedXML = await parser.parseStringPromise(signSheetXmlBuffer)

    // Agregar el archivo PDF firmado al XML
    parsedXML.electronicDocument.file[0]['_'] = pdfSignBase64

    // Convertir el XML a un string
    const updatedXMLContent = builder.buildObject(parsedXML)

    // Guardar el archivo XML de la hoja de firma en el servidor
    // await saveFile(updatedXMLContent, `${fileName}.xml`, 'xml')
    await uploadToBucket(`${fileName}.xml`, updatedXMLContent)
  } catch (error) {
    console.error(error)
  }
}
