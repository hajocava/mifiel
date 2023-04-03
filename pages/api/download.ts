import type { NextApiRequest, NextApiResponse } from 'next'
import archiver from 'archiver'
import { downloadFromBucket } from 'utils/files'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const fileName = String(req.query.name as string).replaceAll('.pdf', '')

      // Cargar el archivo PDF original
      const pdfFileBuffer = await downloadFromBucket(`${fileName}_signed.pdf`)

      // Cargar el archivo XML original
      const xmlFileBuffer = await downloadFromBucket(`${fileName}.xml`)

      // Crear el archivo ZIP con los archivos PDF y XML
      const archive = archiver('zip')
      archive.append(pdfFileBuffer, { name: `${fileName}_signed.pdf` })
      archive.append(xmlFileBuffer, { name: `${fileName}.xml` })
      archive.finalize()

      res.status(200).send(archive)
      break
    default:
      res.status(405).json({ error: 'Método no permitido' })
  }
}
