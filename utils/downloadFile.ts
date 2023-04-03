export const downloadFile = (pdfBlob: Blob, fileName: string) => {
  // Crear un enlace temporal para descargar el archivo PDF
  const downloadUrl = URL.createObjectURL(pdfBlob)
  const downloadLink = document.createElement('a')
  downloadLink.href = downloadUrl
  downloadLink.download = fileName
  document.body.appendChild(downloadLink)

  // Simular un clic en el enlace de descarga y eliminar el enlace después de la descarga
  downloadLink.click()
  setTimeout(() => {
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(downloadUrl)
  }, 100)
}
