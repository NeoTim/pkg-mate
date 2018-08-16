import { CommanderStatic } from 'commander'
import cp from 'child_process'

import pkg from '../package.json'

export default (pkgName: string, cmd: CommanderStatic) => {
  console.log('pkgName:', pkgName)
  console.log('pkg:', pkg.peerDependencies)

  const command = 'yarn add --peer --no-lockfile forsigner'
  cp.exec(command, {}, (error, stdout, stderr) => {
    if (error) {
      throw new Error('install fail')
    }
  })
}
