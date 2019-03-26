const pkg: any = require('../../package.json')
import { CHANGE_INFOS } from '../constants/configs'

export const mainTips = () => {
  console.log(`release: v${pkg.version}.`)
  console.log('run [release <type>] to release version.')
  console.log(`support types: ${Object.keys(CHANGE_INFOS).join(', ')}.`)
}

export const hasUnstagedChanges = () => {
  console.log('cannot release: You have unstaged changes.')
  console.log('suggest: Please commit or stash them.')
}

export const notGitRepository = () => {
  console.log('cannot release: Directory is not a Git repository.')
}

export const error = (text: string) => {
  console.log('cannot release.')
  console.log(`error: ${text}`)
  process.exit(1)
}

export const exit = (next: Function) => {
  next()
  process.exit(1)
}

export const notFoundPackage = () => {
  console.log('cannot release: [package.json] not found.')
}

export const cantParsePackage = () => {
  console.log('cannot release: couldn\'t parse [package.json].')
}

export const cantWritePackage = () => {
  console.log('cannot release: couldn\'t write to [package.json].')
}

export const notFoundVerionInPackage = () => {
  console.log('cannot release: no "version" field inside [package.json].')
}

export const cantParseGitConfig = () => {
  console.log('cannot release: couldn\'t parse git config.')
  
}


