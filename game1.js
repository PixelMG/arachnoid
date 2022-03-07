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
    }

    Update = (gameTime) =>
    {
        // todo: add update logic here
        window.requestAnimationFrame(this.Update);
    }

    Draw = (gameTime) =>
    {
        // todo: add draw code here
        this._spriteBatch.Clear(Color.CornFlowerBlue);

        window.requestAnimationFrame(this.Draw);
    }
}