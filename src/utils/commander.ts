import { join } from 'path'
import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import * as parse from 'parse-git-config'
import * as print from './print'
import * as spinner from './spinner'

export const git = (command: string): string | void => {
  try {
    return execSync(command)
      .toString()
  } catch (err) {
    if (err.message.includes('Not a git repository')) {
      return print.exit(print.notGitRepository)
    }
    print.error(err)
  }
}

const getOrigin = (config: parse.Config): string => {
  if (config.hasOwnProperty('remote "origin"')) return 'origin'
  const key = Object.keys(config).find(name => /^remote /.test(name))
  const result = key.match(/"(\w+)"/)
  if (!result || !result[1]) {
    print.exit(print.cantParseGitConfig)
  }
  return result[1]
}

const getBranch = (): string | void => {
  const headPath = join(process.cwd(), '.git/HEAD')
  if (!existsSync(headPath)) return print.exit(print.notGitRepository)
  const content = readFileSync(headPath, 'utf-8')
  const result = content.toString().match(/ref: refs\/heads\/([^\n]+)/)
  if (!result || !result[1]) return null
  return result[1]
}

export const commitAll = (version: string, message?: string) => {
  spinner.start('updated. committing...')
  const config = parse.sync()
  const origin = getOrigin(config)
  const branch = getBranch()
  const tagMessage = message || version
  
  try {
    git(`git add -A && git commit -a -m "${version}"`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }

  try {
    spinner.start('committed. tagging...')
    git(`git tag -a ${version} -m "${tagMessage}"`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  
  try {
    spinner.start(`${version} released. pushing to "${origin}/${branch}".`)
    git(`git push ${origin} ${branch} && git push -u ${origin} ${branch} --tags`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  spinner.start(`${version} released. pushed to "${origin}/${branch}".`)
  spinner.succeed()
}

