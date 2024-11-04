using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.UseCases.Configuration
{
    public class UpdateOrderConfigurationRequest
    {
        [Display(Name = "Propina")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Tip { get; set; }

        [Display(Name = "Envío")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Shipping { get; set; }

        [Display(Name = "Activo")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Active { get; set; }
    }
}
