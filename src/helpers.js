const fs = require('fs').promises
const path = require('path')

const isNotValidMessage = (message) => {
  return message.content[0] !== '!'
}

const isNotSoundCommand = (command, sounds) => {
  return !sounds.includes(command)
}

const isHelperCommand = (command) => {
  return ['aide', 'nouveau', 'sons'].includes(command)
}

const getSoundPath = (sound) => {
  return `./sounds/${sound}.mp3`
}

async function buildSoundsList() {
  try {
    const soundsPath = path.join(__dirname, '../sounds')

    const files = await fs.readdir(soundsPath)
    const filteredFiles = files
      .filter((f) => f.split('.')[1] === 'mp3')
      .map((f) => f.split('.')[0])

    return filteredFiles
  } catch (error) {
    console.error(`Unable to scan sounds directory: ${error}`)
  }
}

module.exports = {
  isNotValidMessage,
  isHelperCommand,
  isNotSoundCommand,
  buildSoundsList
}
