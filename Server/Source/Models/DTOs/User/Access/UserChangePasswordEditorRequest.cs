using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.User.Access
{
    public class UserChangePasswordRequest
    {
        [Display(Name = "Contraseña actual")]
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string CurrentPassword { get; set; } = null!;

        [Display(Name = "Contraseña nueva")]
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string NewPassword { get; set; } = null!;
    }
}
