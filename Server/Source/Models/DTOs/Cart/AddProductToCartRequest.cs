using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.Cart
{
    public class AddProductToCartRequest
    {
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? PersonName { get; set; }

        [Required(ErrorMessage = "Campo requerido")]
        public int ProductQuantity { get; set; }

        [Required(ErrorMessage = "Campo requerido")]
        public int ProductId { get; set; }
    }
}
