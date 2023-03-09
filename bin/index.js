#! /usr/bin/env node
import { program } from 'commander';
import fs from 'fs-extra'
import path from 'path'
import handleMiniprogramCi from './ci.js'
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
// 根目录
const rootPath = __dirnameNew.slice(0, __dirnameNew.length - 4)
// 获取package.json文件内容
const packageJsonData = JSON.parse(fs.readFileSync(rootPath + '/package.json', 'utf8'))

program
    .command('commit <commitDesc>')
    .action((commitDesc) => {
        handleMiniprogramCi(commitDesc)
    })
//读取版本
program.version(packageJsonData.version, '-v, --version')
program.parse(process.args)