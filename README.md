# Webvim
As a vim lover and aspiring react/redux person, I'm creating my flavor of online vim! :P
Maybe a blog where one can navigate through `h, j, k, l`, send commands like `:login -w facebook` and save their posts like: `:w favorites/JS/patterns.md` something like that!
All implemented in a not so perfomatic (as today) react + redux combo.

#### Currently
  - Basic moving, `h, j, k, l`
  - 2 modes `NORMAL` and `INSERT`
  - Split/Close panes

#### Future
  - Save current text modifications on localstorage and maybe in a persistent db
  - Let them login through fb
  - implement NERDTREE dir visualizations, so one can save files, and view them later

## Running locally
``` bash
git clone git@github.com:Sauloxd/webvim.git
cd webvim
npm i
npm start
```

## Contribution
Let's discuss what you'd like to see @ webvim on [issues](https://github.com/Sauloxd/wevvim/issues)!

## Travis
Pushing on master deploys to S3.
To configure travis, generate the key running:
```
travis login --pro
travis encrypt AWS_ACCESS_KEY_ID=ACCESS_KEY_ID --add --com
travis encrypt AWS_SECRET_ACCESS_KEY=AWS_SECURE_KEY --add --com
```

## Lisence
MIT
