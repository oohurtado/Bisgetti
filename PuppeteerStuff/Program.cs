namespace PuppeteerStuff
{
    internal class Program
    {
        static async Task Main(string[] args)
        {                       
            var scrap = new ScrapMiTelcel();
            await scrap.InitAsync(user: "user", pwd: "pwd", devtools: false, headless: false);
        }
    }
}
