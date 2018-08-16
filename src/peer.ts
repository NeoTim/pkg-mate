import cp from 'child_process'
import { join } from 'path'
import { readFileSync } from 'fs'

enum Registry {
  npm = 'https://registry.npmjs.org',
  alibaba = 'http://registry.npm.alibaba-inc.com',
  taobao = 'https://registry.npm.taobao.org',
  cnpm = 'http://r.cnpmjs.org',
  nj = 'https://registry.nodejitsu.com',
  rednpm = 'http://registry.mirror.cqupt.edu.cn',
}

function getPeerDepencies() {
  const pkgPath = join(process.cwd(), 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const { peerDependencies = {} } = pkg
  return peerDependencies
}

export default () => {
  const registry = Registry.alibaba
  const peerDependencies = getPeerDepencies()
  const pkgs = Object.keys(peerDependencies).join(' ')
  const command = `yarn add --no-progress --peer --no-lockfile ${pkgs} --registry ${registry}`

  if (!pkgs) {
    console.log('no peerDependencies in package.json')
    return
  }

  console.log('Start to install peerDependencies...')

  cp.exec(command, {}, (error, stdout, stderr) => {
    if (error) {
      throw new Error('install peerDependencies error')
    }

    if (stderr) console.log(stderr)
    if (stdout) console.log(stdout)
  })
}
