#!/usr/bin/env node

import program from 'commander'
import pkg from '../../package.json'

function init(): void {
  console.log('init')
}

const commanders = [
  {
    command: 'init',
    description: 'init',
    action: init,
  },
]

program.version('v' + pkg.version).option('-v, --version', 'display version')

commanders.forEach(cli => {
  program
    .command(cli.command)
    .description(cli.description)
    .action(cli.action)
})

program.parse(process.argv)
