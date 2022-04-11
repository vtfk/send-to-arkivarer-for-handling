const { expect } = require('@jest/globals')
const { createMetadata } = require('../lib/archive')
const { getFilesInDir, getFileMetadata } = require('../lib/fileTools')

describe('Correct metadata is created for file', () => {
  const files = getFilesInDir('./data')
  files.forEach(file => {
    test(file, () => {
      const md = getFileMetadata(file)
      const amd = createMetadata(md)
      expect(amd.parameter.Title).toBe(md.filename)
      expect(amd.parameter.Files[0].Title).toBe(md.filename)
      expect(amd.parameter.Files[0].Base64Data.length).toBeGreaterThan(0)
      expect(amd.parameter.UnregisteredContacts[0].ContactName).toBe(md.msg)
      expect(amd.parameter.AdditionalFields[1].Value).toBe(md.origin)
      expect(amd.parameter.Files[0].Format).toBe(md.ext)
    })
  })
})
