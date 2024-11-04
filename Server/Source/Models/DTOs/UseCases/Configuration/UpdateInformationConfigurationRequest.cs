using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.UseCases.Configuration
{
    public class UpdateInformationConfigurationRequest
    {
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Name { get; set; }

        [Display(Name = "Dirección")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Address { get; set; }

        [Display(Name = "Teléfono")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Phone { get; set; }

        [Display(Name = "Horario")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? OpeningDaysHours { get; set; }
    }
}
