const axios = require('axios')
const { p360Url, p360Key } = require('../config')
const fs = require('fs')

const createMetadata = (metadata) => {
  if (!(metadata.filename && metadata.msg && metadata.ext && metadata.origin && metadata.filepath)) throw new Error('Missing required properties in metadata (required: filename, msg, ext, origin, filepath)')
  const res = {
    parameter: {
      Archive: '7',
      Title: metadata.filename,
      DocumentDate: '2019-10-09T06:46:05.952Z',
      Category: 'I',
      Status: 'J',
      AccessCode: '',
      AccessGroup: 'Alle',
      UnregisteredContacts: [
        {
          Role: '5',
          ContactName: metadata.msg
        }
      ],
      JournalDate: '2019-10-09T06:46:05.952Z',
      DispatchedDate: '2019-10-09T06:46:05.952Z',
      Files: [
        {
          Title: metadata.filename,
          Format: metadata.ext,
          Base64Data: Buffer.from(fs.readFileSync(metadata.filepath)).toString('base64')
        }
      ],
      AdditionalFields: [
        {
          Name: 'Committed',
          Value: '-1'
        },
        {
          Name: 'ToOrigin',
          Value: metadata.origin
        }
      ]
    }
  }
  return res
}

const archive = async (metadata) => {
  const payload = createMetadata(metadata)
  const url = `${p360Url}/DocumentService/CreateDocument?authkey=${p360Key}`

  const res = await axios.post(url, payload)
  if (res.data.Successful) {
    return res.data
  } else {
    throw new Error(res.data.ErrorMessage)
  }
}

module.exports = { archive, createMetadata }
