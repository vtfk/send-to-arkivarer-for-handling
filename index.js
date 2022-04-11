(async () => {
  const { inputFolder } = require('./config')
  const { getFilesInDir, getFileMetadata, moveToDir } = require('./lib/fileTools')
  const { archive } = require('./lib/archive')

  const files = getFilesInDir(inputFolder)
  console.log(`Found ${files.length} files in input folder`)
  for (const file of files) {
    console.log(`Trying to send ${file} to manual archiving`)
    try {
      const md = getFileMetadata(file)
      await archive(md)
      console.log(`Success for ${file}`)
      moveToDir(file, `${inputFolder}/imported`)
    } catch (error) {
      console.log(`Failed on file ${file}, moved to ${inputFolder}/error  - ${JSON.stringify(error.message, null, 2)} - ${error.stack})`)
      moveToDir(file, `${inputFolder}/error`)
    }
  }
  console.log('Finished, bye bye')
})()
