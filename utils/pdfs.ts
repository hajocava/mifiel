import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function createPdf(): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { height } = page.getSize()

  page.drawText(`${new Date().getTime()}`, {
    x: 50,
    y: height - 4 * 20,
    size: 30,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  return await pdfDoc.save()
}

export async function mergePdfs(pdf1Bytes: Uint8Array, pdf2Bytes: Uint8Array) {
  try {
    // Cargar los archivos PDF en PDFDocument
    const pdf1Doc = await PDFDocument.load(pdf1Bytes)
    const pdf2Doc = await PDFDocument.load(pdf2Bytes)

    // Crear un nuevo PDFDocument para el resultado
    const mergedPdfDoc = await PDFDocument.create()

    // Copiar las páginas de pdf1Doc y pdf2Doc al nuevo documento
    const pdf1Pages = await mergedPdfDoc.copyPages(
      pdf1Doc,
      pdf1Doc.getPageIndices()
    )
    const pdf2Pages = await mergedPdfDoc.copyPages(
      pdf2Doc,
      pdf2Doc.getPageIndices()
    )

    // Agregar las páginas copiadas al documento final
    for (const page of pdf1Pages) {
      mergedPdfDoc.addPage(page)
    }

    for (const page of pdf2Pages) {
      mergedPdfDoc.addPage(page)
    }

    // Devolver el array de bytes del documento fusionado
    return await mergedPdfDoc.save()
  } catch (error) {
    console.error('Error al fusionar los PDFs:', error)
    throw error
  }
}
