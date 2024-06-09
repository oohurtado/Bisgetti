using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.User.Address
{
    public class CreateOrUpdateAddressRequest
    {
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Name { get; set; }

        [Display(Name = "País")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Country { get; set; }

        [Display(Name = "Estado")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? State { get; set; }

        [Display(Name = "Ciudad/Municipio")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? City { get; set; }

        [Display(Name = "Colonia/Suburbio")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Suburb { get; set; } // Colonia / Suburbio

        [Display(Name = "Calle")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Street { get; set; }

        [Display(Name = "Número exterior")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(10, MinimumLength = 1, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? ExteriorNumber { get; set; }

        [Display(Name = "Número interior")]
        [StringLength(10, MinimumLength = 0, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? InteriorNumber { get; set; }

        [Display(Name = "Código postal")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(10, MinimumLength = 1, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? PostalCode { get; set; }

        [Display(Name = "Número telefónico")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? PhoneNumber { get; set; }

        [Display(Name = "Más instrucciones")]
        [StringLength(250, MinimumLength = 0, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? MoreInstructions { get; set; }
    }
}
