import arg from 'arg'
import child from 'child_process'
import * as print from './utils/print'
import { CHANGE_TYPES } from './constants/configs'

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '-h': '--help',
})
const type = args._[0]

;(() => {
  if (!CHANGE_TYPES[type]) return print.mainTips()
  
  const result = child.execSync('git status -z')
  console.log(result.toString())
  if (result.toString()) return print.hasUnstagedChanges()
})()


