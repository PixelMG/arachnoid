class Game
{
    constructor()
    {
        this.GraphicsDevice =
        {
            Viewport: document.createElement("canvas"),
            Context: null
        }

        this.GraphicsDevice.Context = this.GraphicsDevice.Viewport.getContext("2d");
        this.GraphicsDevice.Viewport.width = document.documentElement.clientWidth;
        this.GraphicsDevice.Viewport.height = document.documentElement.clientHeight;

        document.body.appendChild(this.GraphicsDevice.Viewport);

        this.gameTime = Date.now();
    }

    Start = () =>
    {
        this.Init();
        this.Load();
        this.Tick();
        this.Update();
        this.Draw();
    }

    Init = () => {}

    Load = () => {}

    Tick = () =>
    {
        let now = Date.now();
        let gt = now - this.gameTime;
        this.gameTime = now;
        window.requestAnimationFrame(this.Tick);
    }

    Update = (gameTime) => {}

    Draw = (gameTime) => {}
}

class SpriteBatch
{
    constructor(graphicsDevice)
    {
        this.graphicsDevice = graphicsDevice;
        this.Viewport = graphicsDevice.Viewport;
        this.Context = graphicsDevice.Context;
    }

    Clear = (color) =>
    {
        this.Context.clearRect(0, 0, this.Viewport.width, this.Viewport.height);
        this.Context.fillStyle = color;
        this.Context.fillRect(0, 0, this.Viewport.width, this.Viewport.height);
    }

    Begin = () =>
    {
        this.preCanv = document.createElement("canvas");
        this.preCont = this.preCanv.getContext("2d");

        this.preCanv.width = this.Viewport.width;
        this.preCanv.height = this.Viewport.height;
    }

    Draw = (image, x, y, width, height) =>
    {
        let canv = document.createElement("canvas");
        let cont = canv.getContext("2d");
        
        canv.width = width;
        canv.height = height;
        cont.drawImage(image, x, y, width, height);

        this.preCont.drawImage(canv, x, y, canv.width, canv.height);
    }

    End = () =>
    {
        this.Context.drawImage(this.preCanv, 0, 0, this.Viewport.width, this.Viewport.height);
        
        delete this.preCont;
        delete this.preCanv;
    }
}

const Content =
{
    Load:
    {
        Sprite: (image) =>
        {
            img = new Image();
            img.src = image;
            return img;
        },
        Sound: (audio) =>
        {
            return new Audio(audio);
        }
    }
}

const Graphics =
{
    GraphicsDeviceManager: class
    {
        constructor() {}
    }
}

class KeyboardManager
{
    constructor() {}

    GetState()
    {
        return this;
    }

    IsKeyDown(key)
    {
        if(key == undefined)
            return false;
        return key.isKeyDown;
    }

    IsKeyUp(key)
    {
        return key.isKeyUp;
    }
}
const Keyboard = new KeyboardManager();

// list of keys on the keyboard.
var Keys = {};

// class for managing gamepad state and input
class GamePadManager
{
    constructor()
    {
        this.Buttons =
        {
            A: {},
            B: {},
            X: {},
            Y: {},
            LeftBumber: {},
            RightBumper: {},
            LeftTrigger: {},
            RightTrigger: {},
            View: {},
            Menu: {},
            LeftStick: {},
            RightStick: {},
            DPadUp: {},
            DPadDown: {},
            DPadLeft: {},
            DPadRight: {},
            Home: {},
            map: ["A", "B", "X", "Y", "LeftBumper", "RightBumper", "LeftTrigger", "RightTrigger", "View", "Menu", "LeftStick", "RightStick", "DPadUp", "DPadDown", "DPadLeft", "DPadRight", "Home"]
        }
    }

    PollGamePads()
    {
        let gamepads = navigator.getGamepads();

        for(let key in gamepads)
        {
            PlayerIndex[PlayerIndex.map[key]] = gamepads[key];
        }
        return;
    }

    GetState(index)
    {
        this.PollGamePads();
        this.State = index;
        // console.log(this.count);

        if(index.buttons)
        {
            for(let key in index.buttons)
            {
                let button = index.buttons[key];
                if(this.Buttons.map[key])
                    this.Buttons[this.Buttons.map[key]] = button.pressed
                else if(button.pressed)
                {
                    console.log(key);
                }
            }
        }

        return this;
    }
}
const GamePad = new GamePadManager();

// Just returning true or false for now.
// I may change this later.
const ButtonState = { Pressed: true, Released: false };

var PlayerIndex = { One: { connected: false }, Two: { connected: false }, Three: { connected: false }, Four: { connected: false }, map: ["One", "Two", "Three", "Four"] };

const Color =
{
    CornFlowerBlue: "#6495ed"
}

document.body.style.margin = 0;
document.body.style.maxHeight = document.documentElement.clientHeight + "px";

// unfortunately, a side-effect of using JavaScript
// is the requirement of attaching our event listeners
// to the bottom of our code file.
window.addEventListener("keydown", (e) =>
{
    let key = e.key;
    if(e.key === " ")
    {
        e.preventDefault();
        key = "Space";
    }

    if(Keys[key] == undefined)
        Keys[key] = {};
    
    Keys[key].isKeyDown = true;
    Keys[key].isKeyUp = false;
});

window.addEventListener("keyup", (e) =>
{
    let key = e.key;
    if(e.key === " ")
    {
        e.preventDefault();
        key = "Space";
    }

    if(Keys[key] == undefined)
        Keys[key] = {};
    
    Keys[key].isKeyDown = false;
    Keys[key].isKeyUp = true;
});

window.addEventListener("gamepadconnected", (e) =>
{
    PlayerIndex[PlayerIndex.map[e.gamepad.index]] = e.gamepad;
    console.log(PlayerIndex.One);
});