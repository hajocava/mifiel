import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
})

export async function uploadToBucket(
  filename: string,
  file: Uint8Array | Buffer | string
) {
  const bucket = storage.bucket('mifiel_bucket')
  const blob = bucket.file(filename)
  const blobStream = blob.createWriteStream()

  return new Promise<string>((resolve, reject) => {
    blobStream.on('error', (err) => {
      reject(`Error al subir el archivo ${filename} a google storage: ${err}`)
    })

    blobStream.on('finish', () => {
      resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
    })

    blobStream.end(file)
  })
}

export async function downloadFromBucket(filename: string) {
  const bucket = storage.bucket('mifiel_bucket')
  const blob = bucket.file(filename)

  return new Promise<Buffer>((resolve, reject) => {
    blob.download((err, contents) => {
      if (err) reject(err)
      else resolve(contents)
    })
  })
}
