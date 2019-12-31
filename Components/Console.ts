import * as Config from '../config.json'
import { ConsoleTag } from '@ty/Console'
import chalk from 'chalk'

const log = {
  getTime: () => `[${new Date().toISOString()}]`,
  pid: process.pid,
  executor: (frame: ConsoleTag | string, value: string, name: string, level: string) => {
    const entry = value.split('\n')
    let finVal: string = ''

    if (entry.length > 1) {
      entry.forEach(txt => {
        finVal += `\n${' '.repeat(4)}${txt}`
      })
    } else {
      finVal = value
    }

    console.log(
      `${chalk.red(log.getTime())} ${name}/${log.pid} ${level}: ${chalk.green(`[${frame}]`)} ${chalk.cyan(finVal)}`
    )
  }
}

const botName = Config.bot_name
class ConsoleLocal {
  name: string
  info: (frame: ConsoleTag, value: string) => void
  error: (frame: ConsoleTag, value: string) => void

  constructor (name: string) {
    this.name = name
    this.info = (frame: ConsoleTag | string, value: string) => {
      log.executor(frame, value, this.name, chalk.blue(' INFO'))
    }
    this.error = (frame: ConsoleTag | string, value: string) => {
      log.executor(frame, value, this.name, chalk.blue('ERROR'))
    }
  }
}

export default new ConsoleLocal(botName)