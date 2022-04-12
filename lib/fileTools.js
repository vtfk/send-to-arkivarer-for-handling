const fs = require('fs')
const path = require('path')
const { defaultMsg, p360OriginRecno } = require('../config')

const getFilesInDir = dir => {
  if (!fs.existsSync(dir)) throw new Error(`Directory ${dir} does not exist`)
  const res = []
  fs.readdirSync(dir).forEach(file => {
    if (!fs.lstatSync(`${dir}/${file}`).isDirectory()) res.push(`${dir}/${file}`)
  })
  return res
}

const getDirsInDir = dir => {
  if (!fs.existsSync(dir)) throw new Error(`Directory ${dir} does not exist`)
  const res = []
  fs.readdirSync(dir).forEach(file => {
    if (fs.lstatSync(`${dir}/${file}`).isDirectory()) res.push(`${dir}/${file}`)
  })
  return res
}

const moveToDir = (filePath, dir) => {
  if (!filePath || !dir) throw new Error('Missing required parameters "filePath" and/or "dir"')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  fs.renameSync(filePath, `${dir}/${path.basename(filePath)}`)
}

const getFileMetadata = (file, options = {}) => {
  if (!file) throw new Error('Missing required parameter "file"')
  const res = {
    filepath: file,
    filename: options.filename || false,
    msg: options.msg || false,
    ext: false,
    origin: options.origin || false
  }
  res.ext = path.extname(file).replace('.', '')
  if (!res.ext || res.ext.length === 0) throw new Error(`Could not determine file extension of file ${file}, please check the file`)
  const info = path.basename(file).substring(0, path.basename(file).lastIndexOf('.')).split('---')
  if (!res.filename) res.filename = info[0]
  if (info.length > 1) {
    if (!res.msg) res.msg = info[1]
  } else {
    if (!res.msg) res.msg = defaultMsg
  }
  if (info.length > 2) {
    if (!res.origin) res.origin = info[2]
  } else {
    if (!res.origin) res.origin = p360OriginRecno
  }
  if (!(res.filename && res.msg && res.ext && res.origin)) throw new Error('You can blame the author for this error')
  return res
}

const getDirMetadata = dir => {
  if (!dir) throw new Error('Missing required parameter "dir"')
  const res = {
    dirpath: dir,
    filename: false,
    msg: false,
    origin: false
  }
  const info = path.basename(dir).split('---')
  res.filename = info[0]
  if (info.length > 1) {
    res.msg = info[1]
  } else {
    res.msg = defaultMsg
  }
  if (info.length > 2) {
    res.origin = info[2]
  } else {
    res.origin = p360OriginRecno
  }
  if (!(res.filename && res.msg && res.origin)) throw new Error('You can blame the author for this error')
  return res
}

module.exports = { getFilesInDir, getDirsInDir, moveToDir, getFileMetadata, getDirMetadata }
