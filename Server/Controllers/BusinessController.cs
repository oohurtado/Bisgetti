using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public partial class BusinessController : ControllerBase
    {
        private readonly BusinessLogicMenu _businessLogicMenu;
        private readonly BusinessLogicCategory _businessLogicCategory;
        private readonly BusinessLogicProduct _businessLogicProduct;
        private readonly BusinessLogicMenuStuff _businessLogicMenuStuff;

        public BusinessController(
            BusinessLogicMenu businessLogicMenu,
            BusinessLogicCategory businessLogicCategory,
            BusinessLogicProduct businessLogicProduct,
            BusinessLogicMenuStuff businessLogicMenuStuff
            )
        {
            _businessLogicMenu = businessLogicMenu;
            _businessLogicCategory = businessLogicCategory;
            _businessLogicProduct = businessLogicProduct;
            _businessLogicMenuStuff = businessLogicMenuStuff;
        }
    }
}
