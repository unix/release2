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
