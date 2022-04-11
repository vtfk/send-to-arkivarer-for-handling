// Test get filemetadata
const { getFileMetadata } = require('../lib/fileTools')
const { p360OriginRecno, defaultMsg } = require('../config')

describe('File metadata returns correct metadata when', () => {
  test('input file is a docx file, no msg or origin is defined', () => {
    const md = getFileMetadata('./data/TEST.docx')
    expect(md.ext).toBe('docx')
    expect(md.filename).toBe('TEST')
    expect(md.msg).toBe(defaultMsg)
    expect(md.origin).toBe(p360OriginRecno)
  })
  test('input file is a pdf file, no origin is defined', () => {
    const md = getFileMetadata('./data/TEST---This is the message.pdf')
    expect(md.ext).toBe('pdf')
    expect(md.filename).toBe('TEST')
    expect(md.msg).toBe('This is the message')
    expect(md.origin).toBe(p360OriginRecno)
  })
  test('input file is a txt file, both msg and origin is defined', () => {
    const md = getFileMetadata('./data/TEST---This is the message---this is the origin.txt')
    expect(md.ext).toBe('txt')
    expect(md.filename).toBe('TEST')
    expect(md.msg).toBe('This is the message')
    expect(md.origin).toBe('this is the origin')
  })
})
