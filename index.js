(async () => {
  const { inputFolder } = require('./config')
  const { getFilesInDir, getDirsInDir, getFileMetadata, getDirMetadata, moveToDir } = require('./lib/fileTools')
  const { archive } = require('./lib/archive')
  const fs = require('fs')

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
  console.log('-------\nChecking if any directories in folderImport')
  if (!fs.existsSync(`${inputFolder}/folderImport`)) fs.mkdirSync(`${inputFolder}/folderImport`)
  const dirs = getDirsInDir(`${inputFolder}/folderImport`)
  console.log(`Found ${dirs.length} folders in folderImport`)
  for (const dir of dirs) {
    const dmd = getDirMetadata(dir)
    const filess = getFilesInDir(dir)
    console.log(`Found ${filess.length} files in ${dir}`)
    for (const file of filess) {
      console.log(`Trying to send ${file} to manual archiving`)
      try {
        const md = getFileMetadata(file, dmd)
        await archive(md)
        console.log(`Success for ${file}`)
        moveToDir(file, `${dir}/imported`)
      } catch (error) {
        console.log(`Failed on file ${file}, moved to ${dir}/error  - ${JSON.stringify(error.message, null, 2)} - ${error.stack})`)
        moveToDir(file, `${dir}/error`)
      }
    }
  }
  console.log('Finished, bye bye')
})()
