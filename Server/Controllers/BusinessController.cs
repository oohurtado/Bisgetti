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
        private readonly BusinessLogicCatalog _businessLogicCatalog;
        private readonly BusinessLogicProduct _businessLogicProduct;

        public BusinessController(
            BusinessLogicMenu businessLogicMenu,
            BusinessLogicCatalog businessLogicCatalog,
            BusinessLogicProduct businessLogicProduct
            )
        {
            _businessLogicMenu = businessLogicMenu;
            _businessLogicCatalog = businessLogicCatalog;
            _businessLogicProduct = businessLogicProduct;
        }
    }
}
