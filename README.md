# Webvim
As a vim lover and aspiring react/redux person, I'm creating my flavor of online vim! :P
Maybe a blog where one can navigate through `h, j, k, l`, send commands like `:login -w facebook` and save their posts like: `:w favorites/JS/patterns.md` something like that!
All implemented in a not so perfomatic (as today) react + redux combo.

## What's in it?
![vim-actions](https://00e9e64bac05f2d2a86ac292e118b3ecbfe8cdac00bfae985a-apidata.googleusercontent.com/download/storage/v1/b/sauloxd_imgs/o/vim-actions.png?qk=AD5uMEsvv9e9h-eJUSJ7K-hAfPC6Sfejqs58huWCvYRp-07Bw10nm7Ao2ko114fgKGVP-XCOtzadGB9vmaUzadwgfZu35dIm8KSEr9RJa-623RSA067VYUVC_QROzjB8QnzEapXdKOBpYfxxvyGh5TEfCAhjSdmJwEn8sVBrMGgS_wMYll3qwRWwp3AL_jw5wnc9LPXyi3lAgzu4WhhlHFtohcSkUavI8-v27f6BnZZe6x-kmAlwzIjfVHFW7P_hp1LZNruyw0WLloGY2yQfdctY6V5r1OxkcQOuRjXyCntW12psE3IgR4pG4IXZHmS6oCt6_FpVx1HeraOYioZIeeVEzDt_fDttRumrltTVfi3rBDh8gGeS-X5FLfU3422XyblDM6K-w66aaXw-iDmhZqer6VTNLN3vGRAZ6Ik8H51RtAshglm3HKNYiRQcNhyuM8IezCI4kUesBagOQshqJ7ykAA5RhWzDWRcsA0dfz5k9-1Kld2l3YlBj6eRvdfkc_XSLYI9e_Idpzn9kWy4tU7r2Uvr2A2ByVu9ijfF8IQPQd2rip-HIeQHDXIcZdL7_x8RK7FuLObpQnG6q4fS8gLFq041ZRSreXUHBgYmx1mA4wRpj887q_25fD3WITZuLC3dgu9awy86UMERWXpaCxczl3Hx8s-3HtlIkZU5M53uONYkRsjWhdh_h0in5_YPKmUjlSnOEyOHc9cf7vhTFUMn2LXo27kYzXL4NKV85heoKTwQfr4hK2vg)
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

## Lisence
MIT
