using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.Business.Cart
{
    public class AddProductToCartRequest
    {
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(25, MinimumLength = 2, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? PersonName { get; set; }

        [Required(ErrorMessage = "Campo requerido")]
        public int ProductQuantity { get; set; }

        [Required(ErrorMessage = "Campo requerido")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Campo requerido")]
        public string? ProductGuid { get; set; }

        [Required(ErrorMessage = "Campo requerido")]
        public decimal ProductPrice { get; set; }
    }
}
