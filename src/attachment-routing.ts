export type AttachmentReference = {
  name: string
  refText: string
}

export function buildAttachmentPrompt(text: string, attachments: AttachmentReference[]): string {
  return [...attachments.map(item => item.refText.trim()).filter(Boolean), text.trim()].filter(Boolean).join('\n\n')
}

export function attachmentSummary(text: string, attachments: AttachmentReference[]): string {
  const cleanText = text.trim()
  if (cleanText) return cleanText
  return attachments.map(item => `Attached: ${item.name}`).join('\n')
}

export function attachmentId(file: { name: string; size: number; lastModified: number }): string {
  return `${file.name}:${file.size}:${file.lastModified}`
}

export function formatFileSize(size: number): string {
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`
}
