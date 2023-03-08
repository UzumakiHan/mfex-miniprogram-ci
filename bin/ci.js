import CI from 'miniprogram-ci'
import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import ora from 'ora'
const targetDir = path.join(process.cwd())
// 获取小程序package.json文件内容
const packageJsonData = JSON.parse(fs.readFileSync(targetDir + '/package.json', 'utf8'))
//获取project.config
const projectConfig = JSON.parse(fs.readFileSync(targetDir + '/project.config.json', 'utf8'))
const version = packageJsonData.version
const appid = projectConfig.appid
async function handleUpload(commitDesc,project){
    const spinner = ora('小程序CI构建上传中....')
    spinner.start()
    await CI.upload({
        project,
        version,
        desc: commitDesc,
        setting: {
            es6: true,
            minify:true,
            codeProtect:true
        },
        // onProgressUpdate: console.log,
    })
    spinner.succeed()
    console.log(chalk.green('上传成功'))
    spinner.stop()
}
function handleMiniprogramCi(commitDesc) {
    const project = new CI.Project({
        appid,
        type: 'miniProgram',
        projectPath: targetDir,
        privateKeyPath: `${targetDir}/private.${appid}.key`,
        ignores: [targetDir+'/node_modules/**/*'],
    })
    handleUpload(commitDesc,project)
}

export default handleMiniprogramCi

