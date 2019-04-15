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

export const getOrigin = (config: parse.Config): string => {
  if (config.hasOwnProperty('remote "origin"')) return 'origin'
  const key = Object.keys(config).find(name => /^remote /.test(name))
  if (!key || !key.match) print.exit(print.notFoundGitRemote)
  
  const result = key.match(/"(\w+)"/)
  if (!result || !result[1]) print.exit(print.cantParseGitConfig)
  return result[1]
}

export const checkGitOrigin = (): void => {
  try {
    const config = parse.sync()
    getOrigin(config)
  } catch (e) {
    print.exit(print.notFoundGitRemote)
  }
}

const getBranch = (): string | void => {
  const headPath = join(process.cwd(), '.git/HEAD')
  if (!existsSync(headPath)) return print.exit(print.notGitRepository)
  const content = readFileSync(headPath, 'utf-8')
  const result = content.toString().match(/ref: refs\/heads\/([^\n]+)/)
  if (!result || !result[1]) return null
  return result[1]
}

export const pushAll = () => {
  const config = parse.sync()
  const origin = getOrigin(config)
  const branch = getBranch()
  try {
    spinner.start(`pushing everything to "${origin}/${branch}".`)
    git(`git push ${origin} ${branch} && git push -u ${origin} ${branch} --tags`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  spinner.succeed(true)
  
  spinner.start(`pushed everything to "${origin}/${branch}".`)
  spinner.succeed()
}

export const commitAll = (version: string, message?: string, push?: boolean) => {
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
  spinner.succeed(true)

  try {
    spinner.start('committed. tagging...')
    git(`git tag -a ${version} -m "${tagMessage}"`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  spinner.succeed(true)
  
  if (!push) {
    spinner.start(`${version} released.`)
    spinner.succeed()
    console.log('use "--push, -p" to push all commits.')
    return process.exit(1)
  }
  
  try {
    spinner.start(`${version} released. pushing to "${origin}/${branch}".`)
    git(`git push ${origin} ${branch} && git push -u ${origin} ${branch} --tags`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  spinner.succeed(true)
  
  spinner.start(`${version} released. pushed to "${origin}/${branch}".`)
  spinner.succeed()
}

