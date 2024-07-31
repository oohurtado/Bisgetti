using PuppeteerSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace PuppeteerStuff
{
    public class PuppeteerUtils
    {
        public async Task<Tuple<IPage, IBrowser>> GetPageAsync(bool devtools, bool headless)
        {
            var launchOptions = new LaunchOptions
            {
                Devtools = devtools,
                Headless = headless,
                Args = new[]
                {
                    "--disable-web-security",
                    "--disable-features=IsolateOrigins,site-per-process",
                    "--no-sandbox,--disable-setuid-sandbox"
                },
            };

            var broserFetcer = new BrowserFetcher();
            await broserFetcer.DownloadAsync();
            var browser = await Puppeteer.LaunchAsync(launchOptions);
            var page = await browser.NewPageAsync();
            page.DefaultNavigationTimeout = 60000;

            return new Tuple<IPage, IBrowser>(page, browser);
        }
    }
}
