export type UploadedFile = {
  clientName: string
  extname?: string
  fileName: string
  tmpPath?: string
  isValid: boolean
  size: number
  type: string
  subtype: string
  move: (location: string, options?: { name?: string }) => Promise<{ fileName: string }>
}
