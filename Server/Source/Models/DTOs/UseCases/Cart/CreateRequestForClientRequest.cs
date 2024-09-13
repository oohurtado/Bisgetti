using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.UseCases.Cart
{
    public class CreateRequestForClientRequest
    {
        [Display(Name = "Método de entrega")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(25, MinimumLength = 2, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? DeliveryMethod { get; set; }

        [Display(Name = "Porcentaje de propina")]
        [Required(ErrorMessage = "Campo requerido")]
        public decimal? TipPercent { get; set; }

        [Display(Name = "Costo de envío")]
        [Required(ErrorMessage = "Campo requerido")]
        public decimal? ShippingCost { get; set; }

        [Display(Name = "Pagando con")]
        [Required(ErrorMessage = "Campo requerido")]
        public decimal? PayingWith { get; set; }

        [Display(Name = "Comentarios")]
        [StringLength(100, MinimumLength = 0, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Comments { get; set; }

        [Display(Name = "Dirección")]
        public int? AddressId { get; set; }

        [Display(Name = "Productos")]
        [Required(ErrorMessage = "Campo requerido")]
        public List<CartElementRequest>? CartElements { get; set; }
    }

    public class CartElementRequest
    {
        public int CartElementId { get; set; }
        public int ProductQuantity { get; set; }
        public decimal ProductPrice { get; set; }
    }
}
