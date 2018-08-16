#!/usr/bin/env node

import program from 'commander'
import pkg from '../../package.json'
import install from '../install'
import peer from '../peer'

function init(): void {
  console.log('init')
}

const commanders = [
  {
    command: 'init',
    description: 'init',
    action: init,
  },
  {
    command: 'install <pkg>',
    description: 'install',
    action: install,
  },
]

program
  .version('v' + pkg.version)
  .option('-v, --version', 'display version')
  .option('-Y, --yarn', 'display version')
  .option('-R, --registry', 'display version')
  .option('-P, --peer', 'peer')

commanders.forEach(cli => {
  program
    .command(cli.command)
    .description(cli.description)
    .action(cli.action)
})

program.parse(process.argv)

if (program.peer) {
  peer()
}
