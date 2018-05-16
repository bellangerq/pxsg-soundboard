module.exports = {
  // Check if command is valid
  isValidCommand: (sounds, command) => {
    return sounds.some(sound => sound.name === command)
    || command == 'aide'
    || command == 'sons'
    || command == 'nouveau'
  },

  // Return the sound path
  getSoundPath: sound => {
    return `./sounds/${sound}.mp3`
  }
}
