using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.User
{
    public class UserSignupEditorRequest
    {
        [Display(Name = "Correo electrónico")]
        [RegularExpression(@"[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,15}", ErrorMessage = "El formato del correo electrónico no es válido")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string Email { get; set; } = null!;

        [Display(Name = "Contraseña")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string Password { get; set; } = null!;

        [Display(Name = "Nombre(s)")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? FirstName { get; set; }

        [Display(Name = "Apellido(s)")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? LastName { get; set; }
    }
}
