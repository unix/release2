const pkg: any = require('../../package.json')
import { CHANGE_INFOS } from '../constants/configs'
import chalk from 'chalk'

const prefix = chalk.red('cannot release')

export const mainTips = () => {
  console.log(`run [${chalk.green('release')} ${chalk.yellow('<type>')}] to release version.`)
  console.log(`support types: ${chalk.green(Object.keys(CHANGE_INFOS).join(', '))}.`)
  console.log('')
}

export const hasUnstagedChanges = () => {
  console.log(`${prefix}: You have unstaged changes.`)
  console.log('suggest: Please commit or stash them.')
}

export const notGitRepository = () => {
  console.log(`${prefix}: Directory is not a Git repository.`)
}

export const notFoundGitRemote = () => {
  console.log(`${prefix}: not found Git Remote.`)
  console.log('try run [git remote add <url>] fix it.')
}

export const error = (text: string) => {
  console.log(prefix)
  console.log(`error: ${text}`)
  process.exit(1)
}

export const exit = (next: Function) => {
  next()
  process.exit(1)
}

export const notFoundPackage = () => {
  console.log(`${prefix}: [package.json] not found.`)
}

export const cantParsePackage = () => {
  console.log(`${prefix}: couldn\'t parse [package.json].`)
}

export const cantWritePackage = () => {
  console.log(`${prefix}: couldn\'t write to [package.json].`)
}

export const notFoundVerionInPackage = () => {
  console.log(`${prefix}: no "version" field inside [package.json].`)
}

export const cantParseGitConfig = () => {
  console.log(`${prefix}: couldn\'t parse git config.`)
  
}


