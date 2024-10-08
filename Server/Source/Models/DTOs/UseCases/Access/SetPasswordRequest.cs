﻿using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.UseCases.Access
{
    public class PasswordSetRequest
    {
        [Display(Name = "Correo electrónico")]
        [RegularExpression(@"[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,15}", ErrorMessage = "El formato del correo electrónico no es válido")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string Email { get; set; } = null!;

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string NewPassword { get; set; } = null!;

        [Required]
        public string Token { get; set; } = null!;
    }
}