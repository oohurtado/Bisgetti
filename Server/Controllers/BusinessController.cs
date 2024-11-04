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
        private readonly BusinessLogicCart _businessLogicCart;
        private readonly BusinessLogicOrder _businessLogicOrder;
        private readonly BusinessLogicConfiguration _businessLogicConfiguration;

        public BusinessController(
            BusinessLogicMenu businessLogicMenu,
            BusinessLogicCategory businessLogicCategory,
            BusinessLogicProduct businessLogicProduct,
            BusinessLogicMenuStuff businessLogicMenuStuff,
            BusinessLogicCart businessLogicCart,
            BusinessLogicOrder businessLogicOrder,
            BusinessLogicConfiguration businessLogicConfiguration
            )
        {
            _businessLogicMenu = businessLogicMenu;
            _businessLogicCategory = businessLogicCategory;
            _businessLogicProduct = businessLogicProduct;
            _businessLogicMenuStuff = businessLogicMenuStuff;
            _businessLogicCart = businessLogicCart;
            _businessLogicOrder = businessLogicOrder;
            _businessLogicConfiguration = businessLogicConfiguration;
        }
    }
}
