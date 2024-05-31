using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.User.Common
{
    public class UserChangePasswordRequest
    {
        [Display(Name = "Contraseña")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string CurrentPassword { get; set; } = null!;

        [Display(Name = "Contraseña")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string NewPassword { get; set; } = null!;
    }
}
