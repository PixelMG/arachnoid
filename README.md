# Arachnoid
Arachnoid.js is a lightweight framework for making games for the web!

## Introduction
The goal of Arachnoid.js is to provide a simple, lightweight framework for those who want to get started making games. It's aimed at those who have experience using Xna, Fna, or MonoGame get started with making HTML5 games, as well as those who don't have much, if any experience, get started making games.

It's designed to work with modern browsers, and so far I have no plans to make it compatible with older browsers.

## Basic usage
Simply open up the `index.html` file in your favourite web browser, and you're already up and running! You can explore the demo folder to also give you an idea of how to use this framework.

Out of the box, you don't have to do anything to get your first project up and running. Open up the `index.html` file, and you'll be greeted with a *Cornflower Blue* screen (much the same as XNA)!

The main file you will be working with is the `game1.js` file.

All of your initialization logic will be handled here:
```
Init = () =>
{
  this._spriteBatch = new SpriteBatch(this.GraphicsDevice);
  // todo: add initialization logic here
}
```
There isn't too much to worry about here, and currently it's a nice place to keep the initialization for our viewport (which is the HTML canvas element).

Next, you'll load all the resources you need for your project (*ie* sprites, audio), here:
```
Load = () =>
{
  // todo: load game assets here
}
```

Loading all of your content will be handled by the `Content.Load` method:
```
Content.Load.Sprite("assets/sprites/dave.png");
```
Presently, only loaders for `Sprite` and `Audio` are implemented.

Next, you'll handle all of your update logic here:
```
Update = (gameTime) =>
{
  // todo: add update logic here
  window.requestAnimationFrame(this.Update);
}
```

Input is handled through the `Input` class. For instance, you'll poll for keyboard input like this:
```
let kInput = Input.Keyboard;
if(kInput.Keys["Space"])
{
  console.log("Hey, you pressed a key!");
}
```
At present, only keyboard input has been implemented.

Lastly, you'll handle all of your drawing here:
```
Draw = (gameTime) =>
{
  // todo: add draw code here
  this._spriteBatch.Clear(Color.CornflowerBlue);
  
  window.requestAnimationFrame(this.Draw);
}
```

To draw the sprite you imported in the `Load` method, you'll write a block of code that looks like this:
```
this._spriteBatch.Begin();
this._spriteBatch.Draw(this.sprite, 0, 0, 224, 320);
this._spriteBatch.End();
```

And that's basically it! You've got the basic building blocks of a game.

## Roadmap
- [] Implement gamepad support
- [] Implement touch support
- [] Create basic documentation
- [] Create logo
- [] Implement tilemap support for popular tilemap formats
- [] Add WebGL support

These are the current goals, not listed in any particular order. I'm hoping by the next update that I will have gamepad support implemented, as that is by far the easiest one to implement. I also plan on writing some actual documentation for this framework, so you can better understand how everything works.

WebGL (and eventually WebGPU) is another big one, as currently everything is drawn to the screen via the HTML canvas 2D context. WebGL will allow for more features like shader support, as well as support for 3D. While you can *technically* do 3D on the 2D context, that doesn't tend to be very scalable if you want to develop a larger game.
