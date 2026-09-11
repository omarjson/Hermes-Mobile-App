import { describe, expect, it } from 'vitest'

import { attachmentSummary, buildAttachmentPrompt, attachmentId, formatFileSize } from './attachment-routing'

describe('attachment routing', () => {
  const attachment = { name: 'notes.pdf', refText: '@file:attachments/notes.pdf' }

  it('sends Hermes file refs before the user text', () => {
    expect(buildAttachmentPrompt('Summarize this.', [attachment])).toBe('@file:attachments/notes.pdf\n\nSummarize this.')
  })

  it('supports attachment-only turns', () => {
    expect(buildAttachmentPrompt('', [attachment])).toBe('@file:attachments/notes.pdf')
    expect(attachmentSummary('', [attachment])).toBe('Attached: notes.pdf')
  })

  it('does not create blank separators for empty refs', () => {
    expect(buildAttachmentPrompt('Read it.', [{ name: 'bad', refText: ' ' }])).toBe('Read it.')
  })

  it('keeps attachment ids stable for the same file', () => {
    const file = { name: 'notes.pdf', size: 1234, lastModified: 1700000000000 }
    expect(attachmentId(file)).toBe(attachmentId({ ...file }))
    expect(attachmentId(file)).not.toBe(attachmentId({ ...file, lastModified: file.lastModified + 1 }))
  })

  it('formats file sizes for attachment chips', () => {
    expect(formatFileSize(512)).toBe('1 KB')
    expect(formatFileSize(50 * 1024 * 1024)).toBe('50.0 MB')
  })
})
