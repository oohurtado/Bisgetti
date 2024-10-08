﻿using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.UseCases.MyAccount
{
    public class UpdatePersonalDataRequest
    {
        [Display(Name = "Nombre(s)")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? FirstName { get; set; }

        [Display(Name = "Apellido(s)")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? LastName { get; set; }

        [Display(Name = "Numero telefónico")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(10, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? PhoneNumber { get; set; }
    }
}
