# PXSG soundboard

Another soundboard bot for Discord. But this one is the funniest.

## Usage

There are 4 available commands:
- `!soundname` to play a sound (*example: `!philippe`*).
- `!aide`: display the help menu with all available commands.
- `!sons`: display the list of the available sounds of the app.
- `!nouveau`: display how to add a new sound.

## Development

Install ffmpeg:
```sh
brew install ffmpeg
```

Install dependencies:
```sh
npm install
```

Create a `.env` file at the root of your app with your Discord bot token:
```sh
DISCORD_TOKEN=YOUR_TOKEN_NUMBER
```

Run local server:
```sh
npm run start
```

Launch Discord and login into a voice channel of your server. You can then play with the different commands.

## Deployment

As the bot is deployed on Heroku, you must login to Heroku:
```sh
heroku login
```

Add ffmpeg to Heroku:
```sh
heroku buildpacks:add https://github.com/kitcast/buildpack-ffmpeg.git
```

Push a new version:
```sh
git push heroku master
```

## Add new sounds

To add new sounds, just drop the `.mp3` files into the `/sounds` directory. The command name will be the same as the filename (`toto.mp3` would be played with `!toto`).
