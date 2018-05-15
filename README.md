# PXSG soundboard

Another soundboard bot for Discord. But this one is the funniest.

## Usage

- `!nomduson` to play a sound (*example: `!philippe`*).

- `!sons`: display the list of the available sounds of the app.

- `!aide`: display the help menu with all available commands

## Development

Just run `npm run start` to launch local app. The bot will login to Discord. Then you can type the different commands.

Adding new sounds:
- Add the `mp3` file into `/sounds`
- Reference it into the `sounds` variable in `index.js`

## To do
- [x] Create sounds array
- [x] Create global function to play sound
- [x] Create `!help` command
- [x] Create `!list` command
- [x] Host on Heroku
- [x] Create `sounds` variable depending on different sounds in `/sounds`
- [x] Only display real people commands (filter bot messages)
- [x] Add error message when command doesn't exist
