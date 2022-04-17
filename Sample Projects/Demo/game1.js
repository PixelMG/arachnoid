class Game1 extends Game
{
    constructor()
    {
        super();
    }

    Init = () =>
    {
        this._spriteBatch = new SpriteBatch(this.GraphicsDevice)
        // todo: add initialization logic here
    }

    Load = () =>
    {
        // todo: load game assets here
        this.sprite = Content.Load.Sprite("assets/sprites/dave.png");
        this.music = Content.Load.Sound("assets/audio/boss_theme.mp3");
        this.audioPlaying = false;
        this.debounce = 0;
    }

    Update = (gameTime) =>
    {
        // todo: add update logic here
        let kInput = Keyboard.GetState();
        if(kInput.IsKeyDown(Keys.Space))
        {
            if(!this.audioPlaying && this.debounce < 1)
            {
                this.music.play();
                this.music.loop = true;
                this.audioPlaying = true;
                this.debounce = 200; // set a debounce timer so we don't fire this command too many times
            }

            if(this.audioPlaying && this.debounce < 1)
            {
                this.music.pause();
                this.audioPlaying = false;
                this.debounce = 200;
            }
        }

        if(this.debounce > 0)
        {
            this.debounce--;
        }

        window.requestAnimationFrame(this.Update);
    }

    Draw = (gameTime) =>
    {
        // todo: add draw code here
        this._spriteBatch.Clear(Color.CornFlowerBlue);

        this._spriteBatch.Begin();
        this._spriteBatch.Draw(this.sprite, 0, 0, 224, 320);
        this._spriteBatch.End();

        window.requestAnimationFrame(this.Draw);
    }
}