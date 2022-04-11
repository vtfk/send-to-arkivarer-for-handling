require('dotenv').config()

module.exports = {
  inputFolder: process.env.INPUT_FOLDER || 'C:/manualArchive/input',
  p360Url: process.env.P360_URL || 'https://<server>:<port>.com/api',
  p360Key: process.env.P360_KEY || 'superSecret',
  p360OriginRecno: process.env.P360_ORIGIN_RECNO || '200007',
  defaultMsg: process.env.DEFAULT_MSG || 'Arkiveringsrobot greide ikke arkivere automatisk :('
}
