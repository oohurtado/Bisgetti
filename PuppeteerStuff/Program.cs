namespace PuppeteerStuff
{
    internal class Program
    {
        static async Task Main(string[] args)
        {                       
            var scrap = new ScrapMiTelcel();
            await scrap.InitAsync(user: "franco@pec-am.com", pwd: "122Telcel@Pec#", devtools: false, headless: false);
        }
    }
}
