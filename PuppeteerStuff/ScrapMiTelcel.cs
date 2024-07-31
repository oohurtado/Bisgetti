using PuppeteerSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PuppeteerStuff
{
    public class ScrapMiTelcel
    {
        public async Task InitAsync(string user, string pwd, bool devtools, bool headless)
        {
            var puppeteer = new PuppeteerUtils();
            var pageBrowser = await puppeteer.GetPageAsync(devtools, headless);
            var page = pageBrowser.Item1;
            var browser = pageBrowser.Item2;

            var downloadPath = Path.Combine(Directory.GetCurrentDirectory(), "descargas");
            Directory.CreateDirectory(downloadPath);

            await page.Client.SendAsync("Page.setDownloadBehavior", new
            {
                behavior = "allow",
                downloadPath
            });

            try
            {
                await ScrapAsync(user, pwd, page, browser, downloadPath);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (page != null)
                {
                    await page.CloseAsync();
                    await browser.CloseAsync();
                }
            }
        }

        private async Task ScrapAsync(string user, string pwd, IPage page, IBrowser browser, string downloadPath)
        {
            string url = "https://empresas.mitelcel.com/";

            // vamos a pagina
            await page.GoToAsync(url);

            // esperamos por elemento dentro de pagina
            await page.WaitForSelectorAsync(".MTE-contenido");

            // cookies
            await Task.Delay(100);
            await page.ClickAsync("[id='acepto-cookies']");
            await Task.Delay(100);

            // encuesta
            var buttonEncuesta = "#btn_continue";
            var butEncuesta = await page.QuerySelectorAsync(buttonEncuesta);
            if (butEncuesta != null)
            {
                await butEncuesta.ClickAsync();                
            }


            // esperamos por formulario
            await page.WaitForSelectorAsync("form[id='login-form']");
            
            await page.ClickAsync("input[id=\"user\"]");
            await page.TypeAsync("#user", user);
            await Task.Delay(500);

            // Type the password
            await page.ClickAsync("input[id=\"password\"]");
            await page.TypeAsync("#password", pwd);
            await Task.Delay(500);

            // submit
            await page.ClickAsync("[data-evento='clicLogin']");

            // esperamos a que cargue pagina despues del inicio de sesión
            int i = 0;
            while (i++ < 20)
            {
                // esperamos 3 segundos y preguntamos si ya existe elemento despues del inicio de sesion
                await Task.Delay(1000 * 3);

                var tmp = await page.QuerySelectorAllAsync("div[id='title-container']");
                if (tmp.Count() > 0)
                {
                    i = 0;
                    break;
                }
            }
            if (i > 0)
            {
                throw new Exception(
                    @"
                    La página tardo mucho en cargar y no se encontró el elemento, 
                    o el elemento no existe auqnue si se haya cargado la página por completo (usar otro elemento)
                    ");
            }

            // clic en el menu bar, este abre un drop down
            var menus = await page.QuerySelectorAllAsync("#header-profile > .nav-item .nav-link");
            if (menus.Count() == 1)
            {
                var dropdown = menus.FirstOrDefault();
                await dropdown!.ClickAsync();
                await Task.Delay(500);

                // click en boton cerrar sesion
                {
                    var close = await page.QuerySelectorAllAsync("#header-profile > .nav-item > .dropdown-menu > .dropdown-footer > b-button"); // button
                    var button = close.FirstOrDefault();
                    await button!.ClickAsync();
                }           
        }
    }
}