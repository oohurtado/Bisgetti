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
        private readonly BusinessLogicMenuBuilder _businessLogicMenuBuilder;

        public BusinessController(
            BusinessLogicMenu businessLogicMenu,
            BusinessLogicCategory businessLogicCategory,
            BusinessLogicProduct businessLogicProduct,
            BusinessLogicMenuBuilder businessLogicMenuBuilder
            )
        {
            _businessLogicMenu = businessLogicMenu;
            _businessLogicCategory = businessLogicCategory;
            _businessLogicProduct = businessLogicProduct;
            _businessLogicMenuBuilder = businessLogicMenuBuilder;
        }
    }
}
