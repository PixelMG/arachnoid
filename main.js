const game = new Game1();

game.Start();

window.addEventListener("resize", (e) =>
{
    game.GraphicsDevice.Viewport.width = document.documentElement.clientWidth;
    game.GraphicsDevice.Viewport.height = document.documentElement.clientHeight;
})