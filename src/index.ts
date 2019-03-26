import arg from 'arg'
import * as print from './utils/print'
import * as commander from './utils/commander'
import * as events from './utils/events'
import { CHANGE_TYPES } from './constants/configs'

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '-h': '--help',
})
const type = args._[0]
const suffix = args._[1] || null

;(async() => {
  if (!CHANGE_TYPES[type]) return print.mainTips()
  
  // const result = commander.git('git status -z')
  // if (result.toString()) return print.hasUnstagedChanges()
  
  const nextVersion = events.updatePackage(type, suffix) as string
  
  const tagMessage = await events.updateHooks(nextVersion, type)
  
  commander.commitAll(nextVersion, tagMessage)
  
})()


