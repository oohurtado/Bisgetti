using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.UseCases.Configuration
{
    public class UpdateOrderConfigurationRequest
    {
        [Display(Name = "Propinas")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 1, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Tip { get; set; }

        [Display(Name = "Costo de envío")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 1, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Shipping { get; set; }

        [Display(Name = "Tienda en línea activa")]
        [Required(ErrorMessage = "Campo requerido")]        
        public bool Active { get; set; }
    }
}
