import * as core from '@actions/core'
import cpy from 'cpy'
import { exec } from 'child_process'

const sourceGlobs = core.getInput('source').split(',')
const destination = core.getInput('destination')
const options = JSON.parse(core.getInput('options') || '{}')

try {
  await cpy(sourceGlobs, destination, options)
  exec('ls -lah destination', (error, stdout, stderr) => {
    console.log(error)
    console.log(stdout)
    console.log(stderr)
  })
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error.message)
  } else {
    core.setFailed(`Error while copying files: ${error}`)
  }
}
