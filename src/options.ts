import chalk from 'chalk'
import { CHANGE_INFOS } from './constants/configs'
const pkg = require('../package.json')


export const help = () => {
  Object.keys(CHANGE_INFOS).forEach(name => {
    console.log(`${chalk.cyan(name)} \<command\> -- ${CHANGE_INFOS[name].description}`)
  })
  console.log('')
}

export const version = () => {
  console.log(`v${pkg.version}\n`)
}



