// Test get filemetadata
const { getFileMetadata, getDirMetadata } = require('../lib/fileTools')
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

describe('Overriding values with options in "getFileMetadata" work as expected', () => {
  test('when all values are overridden', () => {
    const md = getFileMetadata('./data/TEST---This is the message---this is the origin.txt', { filename: 'Tut tut', msg: 'Halla balla', origin: '50' })
    expect(md.ext).toBe('txt')
    expect(md.filename).toBe('Tut tut')
    expect(md.msg).toBe('Halla balla')
    expect(md.origin).toBe('50')
  })
  test('when only one value is overridden', () => {
    const md = getFileMetadata('./data/TEST---This is the message---this is the origin.txt', { filename: 'Tut tut' })
    expect(md.ext).toBe('txt')
    expect(md.filename).toBe('Tut tut')
    expect(md.msg).toBe('This is the message')
    expect(md.origin).toBe('this is the origin')
  })
})

describe('Dir metadata returns correct metadata when', () => {
  test('no msg or origin is defined', () => {
    const md = getDirMetadata('./data/folderImport/masseDokumenter')
    expect(md.filename).toBe('masseDokumenter')
    expect(md.msg).toBe(defaultMsg)
    expect(md.origin).toBe(p360OriginRecno)
  })
  test('no origin is defined', () => {
    const md = getDirMetadata('./data/folderImport/masseDokumenter---this is the message')
    expect(md.filename).toBe('masseDokumenter')
    expect(md.msg).toBe('this is the message')
    expect(md.origin).toBe(p360OriginRecno)
  })
  test('both msg and origin is defined', () => {
    const md = getDirMetadata('./data/folderImport/masseDokumenter---this is the message---this is the origin')
    expect(md.filename).toBe('masseDokumenter')
    expect(md.msg).toBe('this is the message')
    expect(md.origin).toBe('this is the origin')
  })
})
