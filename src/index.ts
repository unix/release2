import arg from 'arg'
import * as options from './options'
import * as print from './utils/print'
import * as commander from './utils/commander'
import * as events from './utils/events'
import { CHANGE_TYPES } from './constants/configs'

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '--push': Boolean,
  '-h': '--help',
  '-v': '--version',
  '-p': '--push',
})

const type = args._[0]
const suffix = args._[1] || null

;(async() => {
  // options
  let push = false
  if (args['--help']) return options.help()
  if (args['--version']) return options.version()
  if (args['--push']) {
    push = true
    if (!type) return commander.pushAll()
  }
  
  if (!CHANGE_TYPES[type]) return print.mainTips()
  
  // const result = commander.git('git status -z')
  // if (result.toString()) return print.hasUnstagedChanges()
  
  const nextVersion = events.updatePackage(type, suffix) as string
  
  const tagMessage = await events.updateHooks(nextVersion, type)
  
  commander.commitAll(nextVersion, tagMessage, push)
  
})()


