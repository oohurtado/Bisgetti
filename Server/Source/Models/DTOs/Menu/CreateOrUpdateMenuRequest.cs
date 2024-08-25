using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.Menu
{
    public class CreateOrUpdateMenuRequest
    {
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Name { get; set; }

        [Display(Name = "Descripcion")]
        [StringLength(100, MinimumLength = 0, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Description { get; set; }
    }
}
